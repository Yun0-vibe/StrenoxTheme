import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faServer,
    faMicrochip,
    faMemory,
    faHdd,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';

const WidgetGrid = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6`};
`;

const WidgetCard = styled.div`
    ${tw`rounded-lg p-4 flex items-center gap-4 transition-all duration-200`};
    background: linear-gradient(135deg, #1A1A25 0%, #16161F 100%);
    border: 1px solid #2A2A3A;

    &:hover {
        border-color: #9123D7;
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.15);
        transform: translateY(-2px);
    }
`;

const WidgetIcon = styled.div`
    ${tw`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`};
    background: linear-gradient(135deg, #9123D7 0%, #7C3AED 100%);
    color: white;
`;

const WidgetLabel = styled.div`
    ${tw`text-sm text-neutral-400 mb-1`};
`;

const WidgetValue = styled.div`
    ${tw`text-2xl font-bold text-neutral-100`};
`;

const QuickAction = styled.button`
    ${tw`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 border`};
    background: #1A1A25;
    border-color: #2A2A3A;
    color: #E2E2F0;

    &:hover {
        background: #9123D7;
        border-color: #9123D7;
        color: white;
        box-shadow: 0 0 15px rgba(145, 35, 215, 0.3);
    }
`;

interface Stats {
    servers: number;
    running: number;
    cpu: string;
    memory: string;
    disk: string;
    users: number;
    uptime: string;
}

export default function DashboardWidgets() {
    // In production, fetch from API
    const stats: Stats = {
        servers: 0,
        running: 0,
        cpu: '0%',
        memory: '0 GB',
        disk: '0 GB',
        users: 0,
        uptime: '0d 0h',
    };

    return (
        <>
            <ContentBox title={'Server Overview'}>
                <WidgetGrid>
                    <WidgetCard>
                        <WidgetIcon>
                            <FontAwesomeIcon icon={faServer} />
                        </WidgetIcon>
                        <div>
                            <WidgetLabel>Total Servers</WidgetLabel>
                            <WidgetValue>{stats.servers}</WidgetValue>
                        </div>
                    </WidgetCard>

                    <WidgetCard>
                        <WidgetIcon>
                            <FontAwesomeIcon icon={faMicrochip} />
                        </WidgetIcon>
                        <div>
                            <WidgetLabel>CPU Usage</WidgetLabel>
                            <WidgetValue>{stats.cpu}</WidgetValue>
                        </div>
                    </WidgetCard>

                    <WidgetCard>
                        <WidgetIcon>
                            <FontAwesomeIcon icon={faMemory} />
                        </WidgetIcon>
                        <div>
                            <WidgetLabel>Memory</WidgetLabel>
                            <WidgetValue>{stats.memory}</WidgetValue>
                        </div>
                    </WidgetCard>

                    <WidgetCard>
                        <WidgetIcon>
                            <FontAwesomeIcon icon={faHdd} />
                        </WidgetIcon>
                        <div>
                            <WidgetLabel>Disk Space</WidgetLabel>
                            <WidgetValue>{stats.disk}</WidgetValue>
                        </div>
                    </WidgetCard>
                </WidgetGrid>
            </ContentBox>

            <ContentBox title={'Quick Actions'}>
                <div css={tw`flex flex-wrap gap-3`}>
                    <QuickAction>Create Server</QuickAction>
                    <QuickAction>View Store</QuickAction>
                    <QuickAction>Open Ticket</QuickAction>
                    <QuickAction>Discord Bot</QuickAction>
                </div>
            </ContentBox>
        </>
    );
}
