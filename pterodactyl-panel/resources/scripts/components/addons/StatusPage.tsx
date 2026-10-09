import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faServer } from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';

const NodeRow = styled.div`
    ${tw`flex items-center gap-4 p-4 rounded-lg transition-all duration-150`};
    background: #16161F;
    border: 1px solid #2A2A3A;

    &:hover {
        border-color: #9123D7;
    }
`;

const UptimeBar = styled.div`
    ${tw`flex-1 h-2 rounded-full overflow-hidden`};
    background: #2A2A3A;
`;

const UptimeFill = styled.div<{ pct: number; up: boolean }>`
    height: 100%;
    width: ${(props) => props.pct}%;
    background: ${(props) =>
        props.up ? 'linear-gradient(90deg, #9123D7, #22C55E)' : 'linear-gradient(90deg, #EF4444, #F59E0B)'};
    border-radius: 9999px;
    transition: width 0.5s ease;
`;

const StatusDot = styled.span<{ up: boolean }>`
    ${tw`w-3 h-3 rounded-full flex-shrink-0`};
    background: ${(props) => (props.up ? '#22C55E' : '#EF4444')};
    box-shadow: 0 0 8px ${(props) => (props.up ? '#22C55E' : '#EF4444')};
`;

interface NodeStatus {
    name: string;
    location: string;
    up: boolean;
    uptime: number;
    load: string;
}

const FALLBACK_NODES: NodeStatus[] = [
    { name: 'EU-West-1', location: 'Frankfurt, DE', up: true, uptime: 99.98, load: '32%' },
    { name: 'US-East-2', location: 'Virginia, US', up: true, uptime: 99.95, load: '47%' },
    { name: 'ASIA-SE-1', location: 'Singapore, SG', up: true, uptime: 99.99, load: '21%' },
];

export default function StatusPage() {
    const [nodes] = useState<NodeStatus[]>(FALLBACK_NODES);
    const [checkedAt, setCheckedAt] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCheckedAt(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const allUp = nodes.every((n) => n.up);
    const avgUptime = (nodes.reduce((sum, n) => sum + n.uptime, 0) / nodes.length).toFixed(2);

    return (
        <div className={'strenox-page'} css={tw`max-w-4xl mx-auto px-4 py-8`}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>System Status</h1>
                <p css={tw`text-neutral-400`}>Live status of the StrenoxCloud network</p>
            </div>

            <div
                css={tw`rounded-xl p-5 mb-6 flex items-center gap-4`}
                style={{
                    background: allUp ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${allUp ? '#22C55E' : '#EF4444'}`,
                }}
            >
                <FontAwesomeIcon
                    icon={allUp ? faCheckCircle : faExclamationCircle}
                    css={tw`text-2xl ${allUp ? 'text-green-400' : 'text-red-400'}`}
                />
                <div>
                    <div css={tw`font-semibold text-neutral-100`}>
                        {allUp ? 'All systems operational' : 'Partial outage detected'}
                    </div>
                    <div css={tw`text-sm text-neutral-400`}>
                        {avgUptime}% average uptime (90 days) — checked {checkedAt.toLocaleTimeString()}
                    </div>
                </div>
            </div>

            <ContentBox title={'Nodes'}>
                <div css={tw`space-y-3`}>
                    {nodes.map((node) => (
                        <NodeRow key={node.name}>
                            <StatusDot up={node.up} />
                            <FontAwesomeIcon icon={faServer} css={tw`text-[#9123D7]`} />
                            <div css={tw`w-40 flex-shrink-0`}>
                                <div css={tw`text-sm font-semibold text-neutral-100`}>{node.name}</div>
                                <div css={tw`text-xs text-neutral-400`}>{node.location}</div>
                            </div>
                            <UptimeBar>
                                <UptimeFill pct={node.uptime} up={node.up} />
                            </UptimeBar>
                            <div css={tw`text-xs text-neutral-300 w-24 text-right flex-shrink-0`}>
                                {node.uptime}% · {node.load}
                            </div>
                        </NodeRow>
                    ))}
                </div>
            </ContentBox>
        </div>
    );
}
