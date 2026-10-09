import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faServer,
    faLifeRing,
    faBullhorn,
    faBook,
    faComments,
    faHeartbeat,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import ContentBox from '@/components/elements/ContentBox';
import Spinner from '@/components/elements/Spinner';
import ServerRow from '@/components/dashboard/ServerRow';
import getServers from '@/api/getServers';
import { Server } from '@/api/server/getServer';
import { getStrenoxTickets, getStrenoxAnnouncements } from '@/api/strenox';

const Header = styled.div`
    ${tw`rounded-2xl px-6 py-5 mb-6 flex items-center gap-4 relative overflow-hidden`};
    background:
        radial-gradient(ellipse 60% 120% at 90% 0%, rgba(145, 35, 215, 0.3), transparent),
        linear-gradient(135deg, rgba(30, 21, 53, 0.9) 0%, rgba(13, 13, 18, 0.95) 100%);
    border: 1px solid rgba(145, 35, 215, 0.3);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(145, 35, 215, 0.12);
`;

const StatGrid = styled.div`
    ${tw`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6`};
`;

const StatCard = styled(Link)`
    ${tw`rounded-2xl p-4 flex items-center gap-4 no-underline transition-all duration-200`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.75) 0%, rgba(22, 22, 31, 0.9) 100%);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(145, 35, 215, 0.28);
    box-shadow: 0 0 20px rgba(145, 35, 215, 0.1);

    &:hover {
        border-color: rgba(145, 35, 215, 0.65);
        box-shadow: 0 0 30px rgba(145, 35, 215, 0.25);
        transform: translateY(-2px);
    }
`;

const StatIcon = styled.div`
    ${tw`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white`};
    background: linear-gradient(135deg, #9123d7 0%, #7c3aed 100%);
    box-shadow: 0 4px 16px rgba(145, 35, 215, 0.4);
`;

const ActionDock = styled.div`
    ${tw`grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6`};
`;

const ActionTile = styled(Link)`
    ${tw`block rounded-2xl px-3 py-4 text-center no-underline transition-all duration-200`};
    background: rgba(22, 22, 31, 0.8);
    border: 1px solid rgba(145, 35, 215, 0.22);
    box-shadow: 0 0 16px rgba(145, 35, 215, 0.08);
    color: #e2e2f0 !important;

    &:hover {
        background: linear-gradient(135deg, #9123d7 0%, #7c3aed 100%);
        border-color: #9123d7;
        color: white !important;
        box-shadow: 0 0 28px rgba(145, 35, 215, 0.45);
        transform: translateY(-2px);
    }
`;

const ActionIconBox = styled.div`
    ${tw`mx-auto mb-2 flex items-center justify-center rounded-xl`};
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(145, 35, 215, 0.15);
    border: 1px solid rgba(145, 35, 215, 0.3);
    font-size: 1.05rem;
    color: #a855f7;
`;

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function HomePage() {
    const username = useStoreState((state: ApplicationStore) => state.user.data!.username);
    const [servers, setServers] = useState<Server[] | null>(null);
    const [total, setTotal] = useState(0);
    const [openTickets, setOpenTickets] = useState(0);
    const [newsCount, setNewsCount] = useState(0);

    useEffect(() => {
        getServers({ page: 1 })
            .then((res) => {
                setServers(res.items.slice(0, 5));
                setTotal(res.pagination.total);
            })
            .catch(() => setServers([]));

        getStrenoxTickets()
            .then((tickets) => setOpenTickets(tickets.filter((t) => t.status === 'open').length))
            .catch(() => undefined);

        getStrenoxAnnouncements()
            .then((news) => setNewsCount(news.length))
            .catch(() => undefined);
    }, []);

    const stats = [
        { icon: faServer, label: 'Servers', value: servers === null ? '…' : String(total), to: '/servers' },
        { icon: faLifeRing, label: 'Open Tickets', value: String(openTickets), to: '/tickets' },
        { icon: faBullhorn, label: 'Announcements', value: String(newsCount), to: '/announcements' },
    ];

    const actions = [
        { icon: faServer, label: 'Servers', to: '/servers' },
        { icon: faLifeRing, label: 'Tickets', to: '/tickets' },
        { icon: faBook, label: 'Guides', to: '/knowledge-base' },
        { icon: faComments, label: 'Discord', to: '/discord' },
        { icon: faHeartbeat, label: 'Status', to: '/status' },
    ];

    const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className={'strenox-page'} css={tw`max-w-6xl mx-auto px-4 py-8`}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Header>
                    <img
                        src={'/favicons/strenoxcloud-logo.png'}
                        alt={'StrenoxCloud'}
                        css={tw`w-12 h-12 flex-shrink-0`}
                        style={{ filter: 'drop-shadow(0 0 16px rgba(145,35,215,0.6))' }}
                    />
                    <div css={tw`flex-1 min-w-0`}>
                        <div css={tw`text-xl font-bold text-neutral-100 font-header`}>Command Center</div>
                        <div css={tw`text-sm text-neutral-400`}>
                            {today} · Signed in as {username}
                        </div>
                    </div>
                    <Link
                        to={'/tickets'}
                        css={tw`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline transition-all duration-200 flex-shrink-0`}
                        style={{ background: 'linear-gradient(135deg, #9123D7 0%, #7C3AED 100%)' }}
                    >
                        <FontAwesomeIcon icon={faLifeRing} />
                        Get Support
                    </Link>
                </Header>
            </motion.div>

            <motion.div variants={container} initial={'hidden'} animate={'show'}>
                <StatGrid>
                    {stats.map((s) => (
                        <motion.div key={s.label} variants={item}>
                            <StatCard to={s.to}>
                                <StatIcon>
                                    <FontAwesomeIcon icon={s.icon} />
                                </StatIcon>
                                <div>
                                    <div css={tw`text-2xl font-bold text-neutral-100 leading-none`}>{s.value}</div>
                                    <div css={tw`text-xs text-neutral-400 mt-1`}>{s.label}</div>
                                </div>
                            </StatCard>
                        </motion.div>
                    ))}
                </StatGrid>

                <ActionDock>
                    {actions.map((a) => (
                        <motion.div key={a.label} variants={item}>
                            <ActionTile to={a.to}>
                                <ActionIconBox>
                                    <FontAwesomeIcon icon={a.icon} />
                                </ActionIconBox>
                                <div css={tw`text-xs font-medium`}>{a.label}</div>
                            </ActionTile>
                        </motion.div>
                    ))}
                </ActionDock>
            </motion.div>

            <ContentBox title={'Servers'}>
                {servers === null ? (
                    <Spinner centered />
                ) : servers.length === 0 ? (
                    <div css={tw`text-center py-6`}>
                        <p css={tw`text-neutral-400 text-sm mb-4`}>No servers yet. Contact an administrator to get one.</p>
                        <Link
                            to={'/knowledge-base'}
                            css={tw`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline`}
                            style={{ background: 'linear-gradient(135deg, #9123D7 0%, #7C3AED 100%)' }}
                        >
                            <FontAwesomeIcon icon={faBook} />
                            Read the Guides
                        </Link>
                    </div>
                ) : (
                    <div css={tw`space-y-2`}>
                        {servers.map((server, i) => (
                            <ServerRow key={server.uuid} server={server} css={i > 0 ? tw`mt-2` : undefined} />
                        ))}
                        {total > servers.length && (
                            <Link
                                to={'/servers'}
                                css={tw`flex items-center justify-center gap-2 text-sm text-[#A855F7] hover:text-neutral-100 no-underline py-3 transition-colors duration-150`}
                            >
                                View all {total} servers <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        )}
                    </div>
                )}
            </ContentBox>
        </div>
    );
}
