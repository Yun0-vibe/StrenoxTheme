import React, { useEffect, useState } from 'react';
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
    faUnlink,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';
import Spinner from '@/components/elements/Spinner';
import { getDiscordStatus, updateDiscordPrefs, unlinkDiscord, StrenoxDiscordStatus } from '@/api/strenox';

const DiscordCard = styled.div`
    ${tw`rounded-2xl p-6 border`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.85) 0%, rgba(22, 22, 31, 0.94) 100%);
    border-color: rgba(145, 35, 215, 0.35);
    box-shadow: 0 0 30px rgba(145, 35, 215, 0.16), 0 8px 40px rgba(0, 0, 0, 0.45);
`;

const StatItem = styled.div`
    ${tw`flex items-center gap-3 p-3 rounded-xl`};
    background: #16161f;
    border: 1px solid #2a2a3a;
`;

const ConnectButton = styled.a`
    ${tw`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 flex items-center gap-2 no-underline text-white`};
    background: #5865f2;
    border: none;

    &:hover {
        background: #4752c4;
        box-shadow: 0 0 20px rgba(88, 101, 242, 0.35);
        transform: translateY(-1px);
        color: white;
    }
`;

const SyncRow = styled.div`
    ${tw`flex items-center justify-between gap-3 p-3 rounded-xl`};
    background: #16161f;
    border: 1px solid #2a2a3a;
`;

const ToggleSwitch = styled.button<{ active: boolean }>`
    ${tw`w-10 h-5 rounded-full relative transition-all duration-200 flex-shrink-0`};
    background: ${(props) => (props.active ? '#9123D7' : '#2A2A3A')};
    border: none;

    &::after {
        content: '';
        ${tw`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200`};
        left: ${(props) => (props.active ? '22px' : '2px')};
    }
`;

const Notice = styled.div`
    ${tw`rounded-xl p-4 text-sm mb-6 border`};
`;

export default function DiscordWidget() {
    const [status, setStatus] = useState<StrenoxDiscordStatus | null>(null);
    const [failed, setFailed] = useState(false);
    const [copied, setCopied] = useState(false);
    const [saving, setSaving] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const linkedFlash = params.get('linked') === '1';
    const errorFlash = params.get('error');

    useEffect(() => {
        getDiscordStatus()
            .then(setStatus)
            .catch(() => setFailed(true));
    }, []);

    const copyInvite = () => {
        if (!status?.invite_url) return;
        navigator.clipboard.writeText(status.invite_url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const toggleNotifications = () => {
        if (!status || saving) return;
        const next = !status.notifications;
        setSaving(true);
        updateDiscordPrefs({ notifications: next })
            .then((prefs) => setStatus((prev) => (prev ? { ...prev, ...prefs } : prev)))
            .catch(() => undefined)
            .finally(() => setSaving(false));
    };

    const unlink = () => {
        if (saving) return;
        setSaving(true);
        unlinkDiscord()
            .then(() => setStatus((prev) => (prev ? { ...prev, linked: false, username: null, avatar_url: null } : prev)))
            .catch(() => undefined)
            .finally(() => setSaving(false));
    };

    return (
        <div className={'strenox-page'} css={tw`max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10`}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2 font-header`}>Discord Integration</h1>
                <p css={tw`text-neutral-400`}>
                    Link your StrenoxCloud account with Discord for notifications and role sync
                </p>
            </div>

            {linkedFlash && (
                <Notice style={{ background: 'rgba(34,197,94,0.08)', borderColor: '#22C55E', color: '#22C55E' }}>
                    <FontAwesomeIcon icon={faCheck} css={tw`mr-2`} />
                    Discord account linked successfully.
                </Notice>
            )}
            {errorFlash && (
                <Notice style={{ background: 'rgba(239,68,68,0.08)', borderColor: '#EF4444', color: '#EF4444' }}>
                    Could not link Discord ({errorFlash}). Please try again or ask an administrator.
                </Notice>
            )}

            {status === null && !failed && <Spinner centered />}
            {failed && (
                <ContentBox title={'Unavailable'}>
                    <p css={tw`text-neutral-400 text-sm text-center py-6`}>
                        Could not load Discord integration. Please refresh the page.
                    </p>
                </ContentBox>
            )}

            {status !== null && (
                <DiscordCard>
                    <div css={tw`flex items-center justify-between mb-6 flex-wrap gap-4`}>
                        <div css={tw`flex items-center gap-4`}>
                            <div
                                css={tw`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0`}
                                style={{ background: '#5865F2' }}
                            >
                                {status.linked && status.avatar_url ? (
                                    <img src={status.avatar_url} alt={'Discord avatar'} css={tw`w-full h-full`} />
                                ) : (
                                    <FontAwesomeIcon icon={faComments} css={tw`text-white text-2xl`} />
                                )}
                            </div>
                            <div>
                                <h3 css={tw`text-lg font-semibold text-neutral-100`}>StrenoxCloud Discord</h3>
                                <p css={tw`text-sm text-neutral-400`}>
                                    {status.linked ? `Connected as @${status.username ?? 'user'}` : 'Not connected'}
                                </p>
                            </div>
                        </div>
                        <div>
                            {status.linked ? (
                                <div css={tw`flex flex-col items-end gap-2`}>
                                    <div
                                        css={tw`flex items-center gap-2 px-3 py-1 rounded-full text-sm`}
                                        style={{ background: '#22C55E20', color: '#22C55E' }}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                        Connected
                                    </div>
                                    <button
                                        onClick={unlink}
                                        disabled={saving}
                                        css={tw`text-xs text-neutral-500 hover:text-red-400 transition-colors duration-150 flex items-center gap-1`}
                                    >
                                        <FontAwesomeIcon icon={faUnlink} />
                                        Disconnect
                                    </button>
                                </div>
                            ) : status.oauth_configured ? (
                                <ConnectButton href={'/auth/discord'}>
                                    <FontAwesomeIcon icon={faLink} />
                                    Connect with Discord
                                </ConnectButton>
                            ) : (
                                <p css={tw`text-xs text-neutral-500 max-w-[220px] text-right`}>
                                    Discord login is not configured yet. Ask an administrator to set it up.
                                </p>
                            )}
                        </div>
                    </div>

                    <div css={tw`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6`}>
                        <StatItem>
                            <FontAwesomeIcon icon={faUsers} css={tw`text-[#5865F2]`} />
                            <div>
                                <div css={tw`text-xs text-neutral-400`}>Community Members</div>
                                <div css={tw`text-lg font-bold text-neutral-100`}>
                                    {status.member_count !== null ? status.member_count.toLocaleString() : '—'}
                                </div>
                            </div>
                        </StatItem>
                        <StatItem>
                            <FontAwesomeIcon icon={faServer} css={tw`text-[#9123D7]`} />
                            <div>
                                <div css={tw`text-xs text-neutral-400`}>Link Status</div>
                                <div css={tw`text-lg font-bold text-neutral-100`}>
                                    {status.linked ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                        </StatItem>
                    </div>

                    <ContentBox title={'Integration Settings'}>
                        <div css={tw`space-y-4`}>
                            <SyncRow>
                                <div css={tw`flex items-center gap-3`}>
                                    <FontAwesomeIcon icon={faServer} css={tw`text-neutral-300`} />
                                    <div>
                                        <div css={tw`text-sm font-medium text-neutral-100`}>Server Notifications</div>
                                        <div css={tw`text-xs text-neutral-400`}>
                                            Receive server alerts in your Discord DMs
                                        </div>
                                    </div>
                                </div>
                                <ToggleSwitch active={status.notifications} onClick={toggleNotifications} />
                            </SyncRow>

                            <SyncRow>
                                <div css={tw`flex items-center gap-3 min-w-0`}>
                                    <FontAwesomeIcon icon={faComments} css={tw`text-[#5865F2] flex-shrink-0`} />
                                    <div css={tw`min-w-0`}>
                                        <div css={tw`text-sm font-medium text-neutral-100`}>Discord Invite</div>
                                        <div css={tw`text-xs text-neutral-400 truncate`}>
                                            {status.invite_url ?? 'No invite link configured yet.'}
                                        </div>
                                    </div>
                                </div>
                                {status.invite_url && (
                                    <button
                                        onClick={copyInvite}
                                        css={tw`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex-shrink-0`}
                                        style={{
                                            background: copied ? '#22C55E20' : '#9123D720',
                                            color: copied ? '#22C55E' : '#9123D7',
                                            border: `1px solid ${copied ? '#22C55E' : '#9123D7'}`,
                                        }}
                                    >
                                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} css={tw`mr-1`} />
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                )}
                            </SyncRow>
                        </div>
                    </ContentBox>
                </DiscordCard>
            )}
        </div>
    );
}
