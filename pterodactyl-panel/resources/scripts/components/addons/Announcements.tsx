import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faTag,
    faExclamationCircle,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';
import Spinner from '@/components/elements/Spinner';
import { getStrenoxAnnouncements, StrenoxAnnouncement } from '@/api/strenox';

const AnnouncementCard = styled.div<{ priority: 'info' | 'warning' | 'critical' }>`
    ${tw`rounded-2xl p-5 transition-all duration-200`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.7) 0%, rgba(22, 22, 31, 0.9) 100%);
    border: 1px solid rgba(145, 35, 215, 0.25);
    border-left: 3px solid ${(props) => {
        switch (props.priority) {
            case 'critical':
                return '#EF4444';
            case 'warning':
                return '#F59E0B';
            default:
                return '#9123D7';
        }
    }};
    box-shadow: 0 0 20px rgba(145, 35, 215, 0.1);

    &:hover {
        border-color: #9123d7;
        box-shadow: 0 0 28px rgba(145, 35, 215, 0.22);
        transform: translateY(-2px);
    }
`;

const PriorityBadge = styled.span<{ priority: 'info' | 'warning' | 'critical' }>`
    ${tw`px-2 py-0.5 rounded text-xs font-semibold`};
    background: ${(props) => {
        switch (props.priority) {
            case 'critical':
                return '#EF444420';
            case 'warning':
                return '#F59E0B20';
            default:
                return '#9123D720';
        }
    }};
    color: ${(props) => {
        switch (props.priority) {
            case 'critical':
                return '#EF4444';
            case 'warning':
                return '#F59E0B';
            default:
                return '#9123D7';
        }
    }};
`;

const FilterButton = styled.button<{ active: boolean }>`
    ${tw`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150`};
    background: ${(props) => (props.active ? '#9123D7' : '#16161F')};
    color: ${(props) => (props.active ? 'white' : '#8888A8')};
    border: 1px solid ${(props) => (props.active ? '#9123D7' : '#2A2A3A')};
`;

const FALLBACK_ANNOUNCEMENTS: StrenoxAnnouncement[] = [    {
        id: 1,
        title: 'New VPS Location: Frankfurt',
        content:
            'We are excited to announce our new VPS location in Frankfurt, Germany. Deploy servers closer to your European users with ultra-low latency.',
        date: '2026-10-08',
        priority: 'info' as const,
        tag: 'Infrastructure',
    },
    {
        id: 2,
        title: 'Scheduled Maintenance - Oct 15',
        content:
            'Our team will be performing scheduled maintenance on October 15th from 2:00 AM to 4:00 AM UTC. Brief service interruptions may occur.',
        date: '2026-10-06',
        priority: 'warning' as const,
        tag: 'Maintenance',
    },
    {
        id: 3,
        title: 'DDoS Protection Upgrade',
        content:
            'All servers now include enhanced DDoS protection at no additional cost. Our new mitigation system handles attacks up to 1 Tbps.',
        date: '2026-10-01',
        priority: 'info' as const,
        tag: 'Security',
    },
    {
        id: 4,
        title: 'API Rate Limit Changes',
        content:
            'Starting November 1st, API rate limits will be adjusted for all plans. Please review the updated limits in our documentation.',
        date: '2026-09-28',
        priority: 'warning' as const,
        tag: 'API',
    },
    {
        id: 5,
        title: 'Critical: Node US-East-2 Offline',
        content:
            'We are currently investigating connectivity issues with our US-East-2 node. Some servers may experience brief disconnections.',
        date: '2026-09-25',
        priority: 'critical' as const,
        tag: 'Incident',
    },
];

const priorityIcon = {
    info: faInfoCircle,
    warning: faExclamationCircle,
    critical: faExclamationCircle,
};

export default function Announcements() {
    const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'critical'>('all');
    const [items, setItems] = useState<StrenoxAnnouncement[] | null>(null);

    useEffect(() => {
        getStrenoxAnnouncements()
            .then((data) => setItems(data.length > 0 ? data : FALLBACK_ANNOUNCEMENTS))
            .catch(() => setItems(FALLBACK_ANNOUNCEMENTS));
    }, []);

    const filtered =
        filter === 'all' || items === null
            ? items
            : items.filter((a) => a.priority === filter);

    return (
        <div className={'strenox-page'} css={tw`max-w-4xl mx-auto px-4 py-8`}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>Announcements</h1>
                <p css={tw`text-neutral-400`}>
                    Stay up to date with the latest news and updates from StrenoxCloud
                </p>
            </div>

            <div css={tw`flex gap-2 mb-6 flex-wrap`}>
                {(['all', 'info', 'warning', 'critical'] as const).map((f) => (
                    <FilterButton
                        key={f}
                        active={filter === f}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </FilterButton>
                ))}
            </div>

            <div css={tw`space-y-4`}>
                {filtered === null ? (
                    <Spinner centered />
                ) : (
                    filtered.map((announcement) => (
                    <AnnouncementCard key={announcement.id} priority={announcement.priority}>
                        <div css={tw`flex items-start justify-between mb-3`}>
                            <div css={tw`flex items-center gap-3`}>
                                <FontAwesomeIcon
                                    icon={priorityIcon[announcement.priority]}
                                    css={[
                                        announcement.priority === 'critical' && tw`text-red-400`,
                                        announcement.priority === 'warning' && tw`text-yellow-400`,
                                        announcement.priority === 'info' && tw`text-[#9123D7]`,
                                    ]}
                                />
                                <h3 css={tw`text-lg font-semibold text-neutral-100`}>
                                    {announcement.title}
                                </h3>
                            </div>
                            <PriorityBadge priority={announcement.priority}>
                                {announcement.priority}
                            </PriorityBadge>
                        </div>

                        <p css={tw`text-sm text-neutral-300 mb-4 leading-relaxed`}>
                            {announcement.content}
                        </p>

                        <div css={tw`flex items-center gap-4 text-xs text-neutral-400`}>
                            <span css={tw`flex items-center gap-1`}>
                                <FontAwesomeIcon icon={faClock} />
                                {announcement.date}
                            </span>
                            <span css={tw`flex items-center gap-1`}>
                                <FontAwesomeIcon icon={faTag} />
                                {announcement.tag}
                            </span>
                        </div>
                    </AnnouncementCard>
                    ))
                )}
            </div>

            {filtered !== null && filtered.length === 0 && (
                <ContentBox title={'No announcements'}>
                    <p css={tw`text-neutral-400 text-center py-8`}>
                        No announcements match your current filter.
                    </p>
                </ContentBox>
            )}
        </div>
    );
}
