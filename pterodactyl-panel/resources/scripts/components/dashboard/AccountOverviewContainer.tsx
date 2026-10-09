import * as React from 'react';
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
    faComments,
    faLifeRing,
    faShieldAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import Avatar from '@/components/Avatar';

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

const ProfileHero = styled.div`
    ${tw`rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden border border-white/10`};
    background:
        radial-gradient(ellipse 60% 120% at 90% 0%, rgba(145, 35, 215, 0.3), transparent),
        linear-gradient(135deg, rgba(30, 21, 53, 0.9) 0%, rgba(13, 13, 18, 0.95) 100%);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
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

    const tiles = [
        { icon: faKey, label: 'API Keys', to: '/account/api' },
        { icon: faTerminal, label: 'SSH Keys', to: '/account/ssh' },
        { icon: faClock, label: 'Activity', to: '/account/activity' },
        { icon: faComments, label: 'Discord', to: '/discord' },
        { icon: faLifeRing, label: 'Support', to: '/tickets' },
    ];

    return (
        <PageContentBlock title={'Account Overview'}>
            {state?.twoFactorRedirect && (
                <MessageBox title={'2-Factor Required'} type={'error'}>
                    Your account must have two-factor authentication enabled in order to continue.
                </MessageBox>
            )}

            <ProfileHero css={tw`mt-10`}>
                <div
                    css={tw`w-20 h-20 rounded-full overflow-hidden flex-shrink-0`}
                    style={{ border: '3px solid rgba(145,35,215,0.6)', boxShadow: '0 0 24px rgba(145,35,215,0.4)' }}
                >
                    <Avatar.User size={80} />
                </div>
                <div css={tw`flex-1 text-center sm:text-left min-w-0`}>
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
            </ProfileHero>

            <div css={tw`grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10`}>
                {tiles.map((t) => (
                    <QuickTile key={t.label} to={t.to}>
                        <FontAwesomeIcon icon={t.icon} css={tw`text-lg text-[#A855F7] mb-1`} />
                        <div css={tw`text-xs font-medium`}>{t.label}</div>
                    </QuickTile>
                ))}
            </div>
            <Container css={[tw`lg:grid lg:grid-cols-3 mb-10`, state?.twoFactorRedirect ? tw`mt-4` : tw`mt-10`]}>
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
