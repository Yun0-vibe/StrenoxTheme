import * as React from 'react';
import { useState } from 'react';
import ContentBox from '@/components/elements/ContentBox';
import UpdatePasswordForm from '@/components/dashboard/forms/UpdatePasswordForm';
import UpdateEmailAddressForm from '@/components/dashboard/forms/UpdateEmailAddressForm';
import ConfigureTwoFactorForm from '@/components/dashboard/forms/ConfigureTwoFactorForm';
import PageContentBlock from '@/components/elements/PageContentBlock';
import tw from 'twin.macro';
import { breakpoint } from '@/theme';
import styled from 'styled-components/macro';
import MessageBox from '@/components/MessageBox';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faKey,
    faTerminal,
    faClock,
    faLifeRing,
    faShieldAlt,
    faUser,
    faCamera,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import Avatar from '@/components/Avatar';
import DiscordWidget from '@/components/addons/DiscordWidget';
import { getAvatarUrl, uploadAvatar, deleteAvatar, getStrenoxTickets } from '@/api/strenox';
import getServers from '@/api/getServers';

const Container = styled.div`
    ${tw`flex flex-wrap`};

    & > div {
        ${tw`w-full`};

        ${breakpoint('sm')`
      width: calc(50% - 1rem);
    `}

        ${breakpoint('md')`
      ${tw`w-auto flex-1`};
    `}
    }
`;

const ProfileBanner = styled.div`
    ${tw`relative overflow-hidden rounded-2xl border border-white/10 mb-[-2.5rem]`};
    height: 9rem;
    background:
        radial-gradient(ellipse 60% 120% at 85% 0%, rgba(145, 35, 215, 0.45), transparent),
        radial-gradient(ellipse 50% 100% at 10% 100%, rgba(59, 130, 246, 0.2), transparent),
        linear-gradient(135deg, #1e1535 0%, #0d0d12 100%);
`;

const ProfileCard = styled.div`
    ${tw`rounded-2xl p-6 pt-0 mb-8 border border-white/10 relative`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.85) 0%, rgba(22, 22, 31, 0.94) 100%);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45), 0 0 26px rgba(145, 35, 215, 0.12);
`;

const StatChip = styled.div`
    ${tw`flex flex-col items-center px-5 py-2 rounded-xl`};
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    min-width: 5.5rem;
`;

const Badge = styled.span<{ $tone: 'purple' | 'green' | 'neutral' }>`
    ${tw`inline-block px-2.5 py-1 rounded-full text-xs font-semibold`};
    ${(props) =>
        props.$tone === 'purple'
            ? tw`text-[#C084FC]`
            : props.$tone === 'green'
            ? tw`text-green-400`
            : tw`text-neutral-400`};
    background: ${(props) =>
        props.$tone === 'purple'
            ? 'rgba(145,35,215,0.15)'
            : props.$tone === 'green'
            ? 'rgba(34,197,94,0.12)'
            : 'rgba(255,255,255,0.06)'};
    border: 1px solid
        ${(props) =>
            props.$tone === 'purple'
                ? 'rgba(145,35,215,0.4)'
                : props.$tone === 'green'
                ? 'rgba(34,197,94,0.3)'
                : 'rgba(255,255,255,0.1)'};
`;

const QuickTile = styled(Link)`
    ${tw`rounded-2xl p-4 text-center no-underline transition-all duration-200 border border-white/10`};
    background: rgba(22, 22, 31, 0.8);
    color: #e2e2f0 !important;

    &:hover {
        background: linear-gradient(135deg, #9123d7 0%, #7c3aed 100%);
        border-color: #9123d7;
        color: white !important;
        box-shadow: 0 0 22px rgba(145, 35, 215, 0.4);
        transform: translateY(-2px);
    }
`;

export default () => {
    const { state } = useLocation<undefined | { twoFactorRedirect?: boolean }>();
    const user = useStoreState((state: ApplicationStore) => state.user.data!);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [myServers, setMyServers] = useState(0);
    const [myTickets, setMyTickets] = useState(0);
    const fileRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        getAvatarUrl()
            .then(setAvatarUrl)
            .catch(() => undefined);
        getServers({ page: 1 })
            .then((res) => setMyServers(res.pagination.total))
            .catch(() => undefined);
        getStrenoxTickets()
            .then((tickets) => setMyTickets(tickets.length))
            .catch(() => undefined);
    }, []);

    const onFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        uploadAvatar(file)
            .then(setAvatarUrl)
            .catch(() => undefined)
            .finally(() => {
                setUploading(false);
                if (fileRef.current) fileRef.current.value = '';
            });
    };

    const removeAvatar = () => {
        setUploading(true);
        deleteAvatar()
            .then(() => setAvatarUrl(null))
            .catch(() => undefined)
            .finally(() => setUploading(false));
    };

    const tiles = [
        { icon: faKey, label: 'API Keys', to: '/account/api' },
        { icon: faTerminal, label: 'SSH Keys', to: '/account/ssh' },
        { icon: faClock, label: 'Activity', to: '/account/activity' },
        { icon: faLifeRing, label: 'Support', to: '/tickets' },
    ];

    return (
        <PageContentBlock title={'Account Overview'}>
            {state?.twoFactorRedirect && (
                <MessageBox title={'2-Factor Required'} type={'error'}>
                    Your account must have two-factor authentication enabled in order to continue.
                </MessageBox>
            )}

            <ProfileBanner css={tw`mt-10`}>
                <img
                    src={'/favicons/strenoxcloud-logo.png'}
                    alt={''}
                    css={tw`absolute -right-6 -bottom-10 w-48 h-48 opacity-20 pointer-events-none`}
                />
            </ProfileBanner>
            <ProfileCard>
                <div css={tw`flex flex-col sm:flex-row sm:items-end gap-4`}>
                    <div css={tw`flex-shrink-0 -mt-10 flex flex-col items-center gap-2`}>
                        <div
                            css={tw`w-24 h-24 rounded-3xl overflow-hidden`}
                            style={{ border: '3px solid rgba(145,35,215,0.6)', boxShadow: '0 0 28px rgba(145,35,215,0.45)', background: '#16161F' }}
                        >
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={'Profile'} css={tw`w-full h-full object-cover`} />
                            ) : (
                                <Avatar.User size={96} />
                            )}
                        </div>
                        <input
                            ref={fileRef}
                            type={'file'}
                            accept={'image/jpeg,image/png,image/webp,image/gif'}
                            css={tw`hidden`}
                            onChange={onFilePicked}
                        />
                        <div css={tw`flex gap-2`}>
                            <button
                                onClick={() => fileRef.current?.click()}
                                disabled={uploading}
                                css={tw`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150`}
                                style={{ background: '#9123D720', color: '#A855F7', border: '1px solid #9123D7' }}
                            >
                                <FontAwesomeIcon icon={faCamera} />
                                {uploading ? '…' : avatarUrl ? 'Change' : 'Upload'}
                            </button>
                            {avatarUrl && (
                                <button
                                    onClick={removeAvatar}
                                    disabled={uploading}
                                    css={tw`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150`}
                                    style={{ background: '#EF444420', color: '#EF4444', border: '1px solid #EF4444' }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            )}
                        </div>
                    </div>
                    <div css={tw`flex-1 text-center sm:text-left min-w-0 pt-1`}>
                        <div css={tw`text-2xl font-bold text-neutral-100 flex items-center justify-center sm:justify-start gap-2`}>
                            <FontAwesomeIcon icon={faUser} css={tw`text-[#A855F7] text-lg`} />
                            {user.username}
                        </div>
                        <div css={tw`text-sm text-neutral-400 mt-1 truncate`}>{user.email}</div>
                        <div css={tw`flex gap-2 mt-3 justify-center sm:justify-start flex-wrap`}>
                            <Badge $tone={user.rootAdmin ? 'purple' : 'neutral'}>
                                {user.rootAdmin ? 'Administrator' : 'Member'}
                            </Badge>
                            <Badge $tone={user.useTotp ? 'green' : 'neutral'}>
                                <FontAwesomeIcon icon={faShieldAlt} css={tw`mr-1`} />
                                2FA {user.useTotp ? 'On' : 'Off'}
                            </Badge>
                            <Badge $tone={'neutral'}>
                                Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                            </Badge>
                        </div>
                    </div>
                    <div css={tw`flex sm:flex-col gap-2 justify-center`}>
                        <StatChip>
                            <span css={tw`text-xl font-bold text-neutral-100`}>{myServers}</span>
                            <span css={tw`text-[0.65rem] uppercase tracking-wider text-neutral-400`}>Servers</span>
                        </StatChip>
                        <StatChip>
                            <span css={tw`text-xl font-bold text-neutral-100`}>{myTickets}</span>
                            <span css={tw`text-[0.65rem] uppercase tracking-wider text-neutral-400`}>Tickets</span>
                        </StatChip>
                    </div>
                </div>
            </ProfileCard>

            <div css={tw`grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10`}>
                {tiles.map((t) => (
                    <QuickTile key={t.label} to={t.to}>
                        <FontAwesomeIcon icon={t.icon} css={tw`text-lg text-[#A855F7] mb-1`} />
                        <div css={tw`text-xs font-medium`}>{t.label}</div>
                    </QuickTile>
                ))}
            </div>
            <DiscordWidget />
            <Container css={[tw`lg:grid lg:grid-cols-3 mb-10 mt-10`, state?.twoFactorRedirect ? tw`mt-4` : tw`mt-10`]}>
                <ContentBox title={'Update Password'} showFlashes={'account:password'}>
                    <UpdatePasswordForm />
                </ContentBox>
                <ContentBox css={tw`mt-8 sm:mt-0 sm:ml-8`} title={'Update Email Address'} showFlashes={'account:email'}>
                    <UpdateEmailAddressForm />
                </ContentBox>
                <ContentBox css={tw`md:ml-8 mt-8 md:mt-0`} title={'Two-Step Verification'}>
                    <ConfigureTwoFactorForm />
                </ContentBox>
            </Container>
        </PageContentBlock>
    );
};
