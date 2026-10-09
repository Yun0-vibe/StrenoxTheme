import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faServer, faWrench } from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';
import Spinner from '@/components/elements/Spinner';
import { getNodeStatus, StrenoxNodeStatus } from '@/api/strenox';

const NodeRow = styled.div`
    ${tw`flex items-center gap-4 p-4 rounded-2xl transition-all duration-150 border border-white/10`};
    background: rgba(22, 22, 31, 0.8);

    &:hover {
        border-color: rgba(145, 35, 215, 0.5);
    }
`;

const StatusDot = styled.span<{ up: boolean; maintenance: boolean }>`
    ${tw`w-3 h-3 rounded-full flex-shrink-0`};
    background: ${(props) => (props.maintenance ? '#F59E0B' : props.up ? '#22C55E' : '#EF4444')};
    box-shadow: 0 0 8px ${(props) => (props.maintenance ? '#F59E0B' : props.up ? '#22C55E' : '#EF4444')};
`;

const StatusPill = styled.span<{ maintenance: boolean }>`
    ${tw`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0`};
    background: ${(props) => (props.maintenance ? '#F59E0B20' : '#22C55E20')};
    color: ${(props) => (props.maintenance ? '#F59E0B' : '#22C55E')};
`;

export default function StatusPage() {
    const [nodes, setNodes] = useState<StrenoxNodeStatus[] | null>(null);
    const [checkedAt, setCheckedAt] = useState<Date>(new Date());

    const refresh = () => {
        getNodeStatus()
            .then((data) => {
                setNodes(data);
                setCheckedAt(new Date());
            })
            .catch(() => setNodes([]));
    };

    useEffect(() => {
        refresh();
        const timer = setInterval(refresh, 60000);
        return () => clearInterval(timer);
    }, []);

    const allUp = (nodes ?? []).every((n) => !n.maintenance);

    return (
        <div className={'strenox-page'} css={tw`max-w-4xl mx-auto px-4 py-8`}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2 font-header`}>System Status</h1>
                <p css={tw`text-neutral-400`}>Live status of the StrenoxCloud network</p>
            </div>

            <div
                css={tw`rounded-2xl p-5 mb-6 flex items-center gap-4 border`}
                style={{
                    background: allUp ? 'rgba(34,197,94,0.07)' : 'rgba(245,158,11,0.07)',
                    borderColor: allUp ? '#22C55E' : '#F59E0B',
                }}
            >
                <FontAwesomeIcon
                    icon={allUp ? faCheckCircle : faExclamationCircle}
                    css={[tw`text-2xl`, allUp ? tw`text-green-400` : tw`text-yellow-400`]}
                />
                <div>
                    <div css={tw`font-semibold text-neutral-100`}>
                        {nodes === null
                            ? 'Checking status…'
                            : allUp
                              ? 'All systems operational'
                              : 'Some nodes are under maintenance'}
                    </div>
                    <div css={tw`text-sm text-neutral-400`}>Checked {checkedAt.toLocaleTimeString()} · refreshes every minute</div>
                </div>
            </div>

            <ContentBox title={'Nodes'}>
                {nodes === null ? (
                    <Spinner centered />
                ) : nodes.length === 0 ? (
                    <p css={tw`text-neutral-400 text-sm text-center py-8`}>No nodes are currently listed.</p>
                ) : (
                    <div css={tw`space-y-3`}>
                        {nodes.map((node) => (
                            <NodeRow key={node.name}>
                                <StatusDot up={!node.maintenance} maintenance={node.maintenance} />
                                <FontAwesomeIcon icon={node.maintenance ? faWrench : faServer} css={tw`text-[#9123D7]`} />
                                <div css={tw`flex-1 min-w-0`}>
                                    <div css={tw`text-sm font-semibold text-neutral-100 truncate`}>{node.name}</div>
                                    {node.location && <div css={tw`text-xs text-neutral-400`}>{node.location}</div>}
                                </div>
                                <StatusPill maintenance={node.maintenance}>
                                    {node.maintenance ? 'Maintenance' : 'Operational'}
                                </StatusPill>
                            </NodeRow>
                        ))}
                    </div>
                )}
            </ContentBox>
        </div>
    );
}
