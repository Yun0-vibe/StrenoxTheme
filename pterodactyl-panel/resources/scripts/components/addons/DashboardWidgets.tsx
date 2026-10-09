import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faServer,
    faMicrochip,
    faMemory,
    faHdd,
    faPlus,
    faStore,
    faLifeRing,
    faComments,
    faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';

const Hero = styled.div`
    ${tw`rounded-2xl p-6 mb-6 flex items-center gap-5 relative overflow-hidden border border-white/10`};
    background:
        radial-gradient(ellipse 60% 120% at 90% 10%, rgba(145, 35, 215, 0.35), transparent),
        radial-gradient(ellipse 50% 100% at 10% 90%, rgba(59, 130, 246, 0.18), transparent),
        linear-gradient(135deg, rgba(30, 21, 53, 0.9) 0%, rgba(13, 13, 18, 0.95) 100%);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
`;

const HeroLogo = styled.img`
    ${tw`w-16 h-16 md:w-20 md:h-20 flex-shrink-0`};
    filter: drop-shadow(0 0 22px rgba(145, 35, 215, 0.6));
`;

const WidgetGrid = styled.div`
    ${tw`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6`};
`;

const WidgetCard = styled.div`
    ${tw`rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 relative overflow-hidden border border-white/10`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.75) 0%, rgba(22, 22, 31, 0.9) 100%);
    backdrop-filter: blur(12px);

    &::before {
        content: '';
        ${tw`absolute top-0 left-0 right-0 h-[2px]`};
        background: linear-gradient(90deg, transparent, #9123D7, transparent);
        opacity: 0.7;
    }

    &:hover {
        border-color: rgba(145, 35, 215, 0.6);
        box-shadow: 0 0 28px rgba(145, 35, 215, 0.22);
        transform: translateY(-3px);
    }
`;

const WidgetIcon = styled.div`
    ${tw`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0`};
    background: linear-gradient(135deg, #9123D7 0%, #7C3AED 100%);
    color: white;
    box-shadow: 0 4px 16px rgba(145, 35, 215, 0.4);
`;

const ActionGrid = styled.div`
    ${tw`grid grid-cols-2 lg:grid-cols-4 gap-4`};
`;

const QuickAction = styled(Link)`
    ${tw`rounded-2xl px-4 py-4 text-sm font-medium transition-all duration-200 border border-white/10 flex items-center justify-center gap-2 no-underline`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.7) 0%, rgba(22, 22, 31, 0.9) 100%);
    color: #e2e2f0 !important;
    backdrop-filter: blur(12px);

    &:hover {
        background: linear-gradient(135deg, #9123d7 0%, #7c3aed 100%);
        border-color: #9123d7;
        color: white !important;
        box-shadow: 0 0 24px rgba(145, 35, 215, 0.4);
        transform: translateY(-2px);
    }
`;

const SectionTitle = styled.h2`
    ${tw`text-xl font-semibold mb-4 flex items-center gap-2`};
    color: #e2e2f0;
`;

export default function DashboardWidgets() {
    const username = useStoreState((state: ApplicationStore) => state.user.data!.username);

    const stats = [
        { icon: faServer, label: 'Total Servers', value: '0' },
        { icon: faMicrochip, label: 'CPU Usage', value: '0%' },
        { icon: faMemory, label: 'Memory', value: '0 GB' },
        { icon: faHdd, label: 'Disk Space', value: '0 GB' },
    ];

    const actions = [
        { icon: faPlus, label: 'Create Server', to: '/store' },
        { icon: faStore, label: 'View Store', to: '/store' },
        { icon: faLifeRing, label: 'Open Ticket', to: '/tickets' },
        { icon: faComments, label: 'Discord', to: '/discord' },
    ];

    return (
        <div className={'strenox-page'}>
            <Hero>
                <HeroLogo
                    src={'/favicons/strenoxcloud-logo.png'}
                    alt={'StrenoxCloud'}
                    className={'strenox-float'}
                />
                <div>
                    <div css={tw`text-2xl font-bold text-neutral-100`}>
                        Welcome back, {username}
                    </div>
                    <div css={tw`text-sm text-neutral-400 mt-1 flex items-center gap-2`}>
                        <FontAwesomeIcon icon={faBolt} css={tw`text-[#9123D7]`} />
                        Your cloud is running smooth. Manage everything below.
                    </div>
                </div>
            </Hero>

            <SectionTitle>Server Overview</SectionTitle>
            <WidgetGrid>
                {stats.map((stat) => (
                    <WidgetCard key={stat.label}>
                        <WidgetIcon>
                            <FontAwesomeIcon icon={stat.icon} />
                        </WidgetIcon>
                        <div>
                            <div css={tw`text-xs text-neutral-400 mb-1`}>{stat.label}</div>
                            <div css={tw`text-2xl font-bold text-neutral-100`}>{stat.value}</div>
                        </div>
                    </WidgetCard>
                ))}
            </WidgetGrid>

            <SectionTitle>Quick Actions</SectionTitle>
            <ActionGrid css={tw`mb-2`}>
                {actions.map((action) => (
                    <QuickAction key={action.label} to={action.to}>
                        <FontAwesomeIcon icon={action.icon} css={tw`text-[#A855F7]`} />
                        {action.label}
                    </QuickAction>
                ))}
            </ActionGrid>
        </div>
    );
}
