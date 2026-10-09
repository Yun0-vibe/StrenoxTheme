import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStore,
    faLifeRing,
    faBook,
    faComments,
    faBullhorn,
    faHeartbeat,
    faRocket,
    faServer,
    faArrowRight,
    faBolt,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';
import Spinner from '@/components/elements/Spinner';
import ServerRow from '@/components/dashboard/ServerRow';
import getServers from '@/api/getServers';
import { Server } from '@/api/server/getServer';
import { getStrenoxAnnouncements, StrenoxAnnouncement } from '@/api/strenox';

const Hero = styled.div`
    ${tw`rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden border border-white/10 text-center`};
    background:
        radial-gradient(ellipse 70% 90% at 50% 110%, rgba(145, 35, 215, 0.35), transparent),
        radial-gradient(ellipse 50% 60% at 85% 0%, rgba(124, 58, 237, 0.25), transparent),
        radial-gradient(ellipse 50% 60% at 15% 0%, rgba(59, 130, 246, 0.15), transparent),
        linear-gradient(180deg, rgba(30, 21, 53, 0.9) 0%, rgba(7, 7, 13, 0.95) 100%);
    box-shadow: 0 12px 60px rgba(0, 0, 0, 0.5);
`;

const CTAButton = styled(Link)<{ primary?: boolean }>`
    ${tw`inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-semibold no-underline transition-all duration-200`};
    background: ${(props) =>
        props.primary ? 'linear-gradient(135deg, #9123d7 0%, #7c3aed 100%)' : 'rgba(255,255,255,0.06)'};
    color: ${(props) => (props.primary ? 'white' : '#e2e2f0')} !important;
    border: 1px solid ${(props) => (props.primary ? '#9123d7' : 'rgba(255,255,255,0.12)')};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${(props) =>
            props.primary
                ? '0 8px 30px rgba(145,35,215,0.5)'
                : '0 8px 24px rgba(0,0,0,0.4)'};
    }
`;

const FeatureGrid = styled.div`
    ${tw`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8`};
`;

const FeatureCard = styled(Link)`
    ${tw`rounded-2xl p-5 no-underline transition-all duration-200 border border-white/10 block`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.7) 0%, rgba(22, 22, 31, 0.9) 100%);
    backdrop-filter: blur(12px);

    &:hover {
        border-color: rgba(145, 35, 215, 0.6);
        box-shadow: 0 0 28px rgba(145, 35, 215, 0.2);
        transform: translateY(-3px);
    }
`;

const StatStrip = styled.div`
    ${tw`grid grid-cols-3 gap-4 mb-8`};
`;

const StatCell = styled.div`
    ${tw`rounded-2xl py-4 text-center border border-white/10`};
    background: rgba(22, 22, 31, 0.7);
    backdrop-filter: blur(10px);
`;

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const FEATURES = [
    { icon: faStore, title: 'Store', desc: 'Deploy game servers in seconds', to: '/store' },
    { icon: faLifeRing, title: 'Support', desc: 'Tickets with real humans', to: '/tickets' },
    { icon: faBook, title: 'Guides', desc: 'Knowledge base & tutorials', to: '/knowledge-base' },
    { icon: faComments, title: 'Discord', desc: 'Community & notifications', to: '/discord' },
    { icon: faBullhorn, title: 'News', desc: 'Announcements & updates', to: '/announcements' },
    { icon: faHeartbeat, title: 'Status', desc: 'Live network health', to: '/status' },
];

export default function HomePage() {
    const [servers, setServers] = useState<Server[] | null>(null);
    const [total, setTotal] = useState(0);
    const [news, setNews] = useState<StrenoxAnnouncement[]>([]);

    useEffect(() => {
        getServers({ page: 1 })
            .then((res) => {
                setServers(res.items.slice(0, 3));
                setTotal(res.pagination.total);
            })
            .catch(() => setServers([]));

        getStrenoxAnnouncements()
            .then((data) => setNews(data.slice(0, 3)))
            .catch(() => setNews([]));
    }, []);

    return (
        <div className={'strenox-page'} css={tw`max-w-6xl mx-auto px-4 py-8`}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Hero>
                    <motion.img
                        src={'/favicons/strenoxcloud-logo.png'}
                        alt={'StrenoxCloud'}
                        className={'strenox-float'}
                        css={tw`w-20 h-20 md:w-24 md:h-24 mx-auto mb-5`}
                        style={{ filter: 'drop-shadow(0 0 28px rgba(145,35,215,0.65))' }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <h1 css={tw`text-4xl md:text-5xl font-bold mb-3`}>
                        <span css={tw`text-neutral-100`}>Game servers, </span>
                        <span
                            css={tw`bg-clip-text text-transparent bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED]`}
                        >
                            elevated.
                        </span>
                    </h1>
                    <p css={tw`text-neutral-400 mb-7 max-w-xl mx-auto`}>
                        Deploy, manage, and scale your worlds on the StrenoxCloud network —
                        liquid fast, always online.
                    </p>
                    <div css={tw`flex gap-3 justify-center flex-wrap`}>
                        <CTAButton primary to={'/store'}>
                            <FontAwesomeIcon icon={faRocket} />
                            Deploy a Server
                        </CTAButton>
                        <CTAButton to={'/status'}>
                            <FontAwesomeIcon icon={faHeartbeat} />
                            Network Status
                        </CTAButton>
                    </div>
                </Hero>
            </motion.div>

            <motion.div variants={container} initial={'hidden'} animate={'show'}>
                <StatStrip>
                    {[
                        { icon: faServer, value: servers === null ? '…' : String(total), label: 'Your Servers' },
                        { icon: faBolt, value: '99.9%', label: 'Network Uptime' },
                        { icon: faComments, value: '24/7', label: 'Human Support' },
                    ].map((s) => (
                        <motion.div key={s.label} variants={item}>
                            <StatCell>
                                <FontAwesomeIcon icon={s.icon} css={tw`text-[#A855F7] mb-1`} />
                                <div css={tw`text-2xl font-bold text-neutral-100`}>{s.value}</div>
                                <div css={tw`text-xs text-neutral-400`}>{s.label}</div>
                            </StatCell>
                        </motion.div>
                    ))}
                </StatStrip>

                <FeatureGrid>
                    {FEATURES.map((f) => (
                        <motion.div key={f.title} variants={item}>
                            <FeatureCard to={f.to}>
                                <FontAwesomeIcon icon={f.icon} css={tw`text-xl text-[#A855F7] mb-3`} />
                                <div css={tw`font-semibold text-neutral-100 mb-1`}>{f.title}</div>
                                <div css={tw`text-sm text-neutral-400`}>{f.desc}</div>
                            </FeatureCard>
                        </motion.div>
                    ))}
                </FeatureGrid>
            </motion.div>

            <div css={tw`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                <ContentBox title={'My Servers'}>
                    {servers === null ? (
                        <Spinner centered />
                    ) : servers.length === 0 ? (
                        <div css={tw`text-center py-6`}>
                            <p css={tw`text-neutral-400 text-sm mb-4`}>No servers yet. Launch your first world.</p>
                            <CTAButton primary to={'/store'}>
                                <FontAwesomeIcon icon={faRocket} />
                                Deploy Now
                            </CTAButton>
                        </div>
                    ) : (
                        <div css={tw`space-y-2`}>
                            {servers.map((server, i) => (
                                <ServerRow key={server.uuid} server={server} css={i > 0 ? tw`mt-2` : undefined} />
                            ))}
                            <Link
                                to={'/servers'}
                                css={tw`flex items-center justify-center gap-2 text-sm text-[#A855F7] hover:text-neutral-100 no-underline py-3 transition-colors duration-150`}
                            >
                                View all servers <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    )}
                </ContentBox>

                <ContentBox title={'Latest News'}>
                    {news.length === 0 ? (
                        <p css={tw`text-neutral-400 text-sm text-center py-6`}>
                            No announcements right now. All quiet on the cloud front.
                        </p>
                    ) : (
                        <div css={tw`space-y-3`}>
                            {news.map((a) => (
                                <div
                                    key={a.id}
                                    css={tw`p-3 rounded-xl`}
                                    style={{ background: '#16161F', border: '1px solid #2A2A3A' }}
                                >
                                    <div css={tw`text-sm font-semibold text-neutral-100 mb-1`}>{a.title}</div>
                                    <div css={tw`text-xs text-neutral-400 line-clamp-2`}>{a.content}</div>
                                </div>
                            ))}
                            <Link
                                to={'/announcements'}
                                css={tw`flex items-center justify-center gap-2 text-sm text-[#A855F7] hover:text-neutral-100 no-underline py-2 transition-colors duration-150`}
                            >
                                All announcements <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    )}
                </ContentBox>
            </div>
        </div>
    );
}
