import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faServer,
    faLink,
    faCheck,
    faCopy,
    faComments,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';

const DiscordCard = styled.div`
    ${tw`rounded-xl p-6`};
    background: linear-gradient(135deg, #1A1A25 0%, #1E1535 100%);
    border: 1px solid #2A2A3A;

    &:hover {
        border-color: #9123D7;
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.15);
    }
`;

const StatItem = styled.div`
    ${tw`flex items-center gap-3 p-3 rounded-lg`};
    background: #16161F;
    border: 1px solid #2A2A3A;
`;

const ConnectButton = styled.button`
    ${tw`rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 flex items-center gap-2`};
    background: #5865F2;
    color: white;
    border: none;

    &:hover {
        background: #4752C4;
        box-shadow: 0 0 20px rgba(88, 101, 242, 0.3);
        transform: translateY(-1px);
    }
`;

const SyncRow = styled.div`
    ${tw`flex items-center justify-between p-3 rounded-lg`};
    background: #16161F;
    border: 1px solid #2A2A3A;
`;

const ToggleSwitch = styled.button<{ active: boolean }>`
    ${tw`w-10 h-5 rounded-full relative transition-all duration-200`};
    background: ${(props) => (props.active ? '#9123D7' : '#2A2A3A')};
    border: none;

    &::after {
        content: '';
        ${tw`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200`};
        left: ${(props) => (props.active ? '22px' : '2px')};
    }
`;

export default function DiscordWidget() {
    const [connected, setConnected] = useState(false);
    const [roleSync, setRoleSync] = useState(true);
    const [notifs, setNotifs] = useState(true);
    const [copied, setCopied] = useState(false);

    const inviteUrl = 'https://discord.gg/strenoxcloud';

    const copyInvite = () => {
        navigator.clipboard.writeText(inviteUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className={'strenox-page'} css={tw`max-w-4xl mx-auto px-4 py-8`}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>
                    Discord Integration
                </h1>
                <p css={tw`text-neutral-400`}>
                    Connect your StrenoxCloud account with Discord for notifications and role sync
                </p>
            </div>

            <DiscordCard css={tw`mb-6`}>
                <div css={tw`flex items-center justify-between mb-6`}>
                    <div css={tw`flex items-center gap-4`}>
                        <div
                            css={tw`w-14 h-14 rounded-xl flex items-center justify-center`}
                            style={{ background: '#5865F2' }}
                        >
                            <FontAwesomeIcon
                                icon={faComments}
                                css={tw`text-white text-2xl`}
                            />
                        </div>
                        <div>
                            <h3 css={tw`text-lg font-semibold text-neutral-100`}>
                                StrenoxCloud Discord
                            </h3>
                            <p css={tw`text-sm text-neutral-400`}>
                                {connected ? 'Connected as @user' : 'Not connected'}
                            </p>
                        </div>
                    </div>
                    <div>
                        {connected ? (
                            <div
                                css={tw`flex items-center gap-2 px-3 py-1 rounded-full text-sm`}
                                style={{ background: '#22C55E20', color: '#22C55E' }}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                Connected
                            </div>
                        ) : (
                            <ConnectButton onClick={() => setConnected(true)}>
                                <FontAwesomeIcon icon={faLink} />
                                Connect Account
                            </ConnectButton>
                        )}
                    </div>
                </div>

                <div css={tw`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6`}>
                    <StatItem>
                        <FontAwesomeIcon icon={faUsers} css={tw`text-[#5865F2]`} />
                        <div>
                            <div css={tw`text-xs text-neutral-400`}>Members</div>
                            <div css={tw`text-lg font-bold text-neutral-100`}>1,234</div>
                        </div>
                    </StatItem>
                    <StatItem>
                        <FontAwesomeIcon icon={faServer} css={tw`text-[#9123D7]`} />
                        <div>
                            <div css={tw`text-xs text-neutral-400`}>Linked Servers</div>
                            <div css={tw`text-lg font-bold text-neutral-100`}>5</div>
                        </div>
                    </StatItem>
                    <StatItem>
                        <FontAwesomeIcon icon={faUsers} css={tw`text-[#22C55E]`} />
                        <div>
                            <div css={tw`text-xs text-neutral-400`}>Roles Synced</div>
                            <div css={tw`text-lg font-bold text-neutral-100`}>3</div>
                        </div>
                    </StatItem>
                </div>

                <ContentBox title={'Integration Settings'}>
                    <div css={tw`space-y-4`}>
                        <SyncRow>
                            <div css={tw`flex items-center gap-3`}>
                                <FontAwesomeIcon icon={faUsers} css={tw`text-neutral-300`} />
                                <div>
                                    <div css={tw`text-sm font-medium text-neutral-100`}>
                                        Role Synchronization
                                    </div>
                                    <div css={tw`text-xs text-neutral-400`}>
                                        Automatically sync Discord roles with panel permissions
                                    </div>
                                </div>
                            </div>
                            <ToggleSwitch
                                active={roleSync}
                                onClick={() => setRoleSync(!roleSync)}
                            />
                        </SyncRow>

                        <SyncRow>
                            <div css={tw`flex items-center gap-3`}>
                                <FontAwesomeIcon icon={faServer} css={tw`text-neutral-300`} />
                                <div>
                                    <div css={tw`text-sm font-medium text-neutral-100`}>
                                        Server Notifications
                                    </div>
                                    <div css={tw`text-xs text-neutral-400`}>
                                        Receive server alerts in your Discord DMs
                                    </div>
                                </div>
                            </div>
                            <ToggleSwitch
                                active={notifs}
                                onClick={() => setNotifs(!notifs)}
                            />
                        </SyncRow>

                        <SyncRow>
                            <div css={tw`flex items-center gap-3`}>
                                <FontAwesomeIcon icon={faComments} css={tw`text-[#5865F2]`} />
                                <div css={tw`flex-1`}>
                                    <div css={tw`text-sm font-medium text-neutral-100`}>
                                        Discord Invite
                                    </div>
                                    <div css={tw`text-xs text-neutral-400`}>{inviteUrl}</div>
                                </div>
                            </div>
                            <button
                                onClick={copyInvite}
                                css={tw`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150`}
                                style={{
                                    background: copied ? '#22C55E20' : '#9123D720',
                                    color: copied ? '#22C55E' : '#9123D7',
                                    border: `1px solid ${copied ? '#22C55E' : '#9123D7'}`,
                                }}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} css={tw`mr-1`} />
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </SyncRow>
                    </div>
                </ContentBox>
            </DiscordCard>
        </div>
    );
}
