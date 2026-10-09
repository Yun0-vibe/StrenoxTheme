import React, { memo, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet, faHdd, faMemory, faMicrochip, faServer } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Server } from '@/api/server/getServer';
import getServerResourceUsage, { ServerPowerState, ServerStats } from '@/api/server/getServerResourceUsage';
import { bytesToString, ip, mbToBytes } from '@/lib/formatters';
import tw from 'twin.macro';
import GreyRowBox from '@/components/elements/GreyRowBox';
import Spinner from '@/components/elements/Spinner';
import styled from 'styled-components/macro';
import isEqual from 'react-fast-compare';

// Determines if the current value is in an alarm threshold so we can show it in red rather
// than the more faded default style.
const isAlarmState = (current: number, limit: number): boolean => limit > 0 && current / (limit * 1024 * 1024) >= 0.9;

const Icon = memo(
    styled(FontAwesomeIcon)<{ $alarm: boolean }>`
        ${(props) => (props.$alarm ? tw`text-red-400` : tw`text-neutral-500`)};
    `,
    isEqual
);

const IconDescription = styled.p<{ $alarm: boolean }>`
    ${tw`text-sm ml-2`};
    ${(props) => (props.$alarm ? tw`text-white` : tw`text-neutral-400`)};
`;

const StatusIndicatorBox = styled(GreyRowBox)<{ $status: ServerPowerState | undefined }>`
    ${tw`grid grid-cols-12 gap-4 relative`};
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
        border-color: #9123D7 !important;
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.15);
        transform: translateY(-1px);
    }

    & .icon {
        color: #9123D7;
    }

    & .status-bar {
        ${tw`w-2 bg-red-500 absolute right-0 z-20 rounded-full m-1 opacity-50 transition-all duration-150`};
        height: calc(100% - 0.5rem);

        ${({ $status }) =>
            !$status || $status === 'offline'
                ? tw`bg-red-500`
                : $status === 'running'
                ? tw`bg-green-500`
                : tw`bg-yellow-500`};
    }

    &:hover .status-bar {
        ${tw`opacity-75`};
    }
`;

const StatusPill = styled.span<{ $tone: 'green' | 'red' | 'yellow' | 'neutral' }>`
    ${tw`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ml-2 align-middle whitespace-nowrap`};
    ${(props) =>
        props.$tone === 'green'
            ? tw`bg-green-500/15 text-green-400`
            : props.$tone === 'red'
            ? tw`bg-red-500/15 text-red-400`
            : props.$tone === 'yellow'
            ? tw`bg-yellow-500/15 text-yellow-400`
            : tw`bg-neutral-500/15 text-neutral-400`};
`;

const UsageBar = ({ label, pct, text }: { label: string; pct: number; text: string }) => (
    <div css={tw`flex-1 min-w-0`}>
        <div css={tw`flex justify-between text-xs text-neutral-400 mb-1`}>
            <span>{label}</span>
            <span>{text}</span>
        </div>
        <div css={tw`h-1.5 rounded-full overflow-hidden`} style={{ background: '#2A2A3A' }}>
            <div
                css={tw`h-full rounded-full transition-all duration-500`}
                style={{
                    width: `${Math.max(0, Math.min(100, pct))}%`,
                    background:
                        pct >= 90
                            ? 'linear-gradient(90deg, #EF4444, #F59E0B)'
                            : 'linear-gradient(90deg, #9123D7, #22C55E)',
                }}
            />
        </div>
    </div>
);

type Timer = ReturnType<typeof setInterval>;

export default ({ server, className }: { server: Server; className?: string }) => {
    const interval = useRef<Timer>(null) as React.MutableRefObject<Timer>;
    const [isSuspended, setIsSuspended] = useState(server.status === 'suspended');
    const [stats, setStats] = useState<ServerStats | null>(null);

    const getStats = () =>
        getServerResourceUsage(server.uuid)
            .then((data) => setStats(data))
            .catch((error) => console.error(error));

    useEffect(() => {
        setIsSuspended(stats?.isSuspended || server.status === 'suspended');
    }, [stats?.isSuspended, server.status]);

    useEffect(() => {
        // Don't waste a HTTP request if there is nothing important to show to the user because
        // the server is suspended.
        if (isSuspended || server.isNodeUnderMaintenance) return;

        getStats().then(() => {
            interval.current = setInterval(() => getStats(), 30000);
        });

        return () => {
            interval.current && clearInterval(interval.current);
        };
    }, [isSuspended, server.isNodeUnderMaintenance]);

    const alarms = { cpu: false, memory: false, disk: false };
    if (stats) {
        alarms.cpu = server.limits.cpu === 0 ? false : stats.cpuUsagePercent >= server.limits.cpu * 0.9;
        alarms.memory = isAlarmState(stats.memoryUsageInBytes, server.limits.memory);
        alarms.disk = server.limits.disk === 0 ? false : isAlarmState(stats.diskUsageInBytes, server.limits.disk);
    }

    const diskLimit = server.limits.disk !== 0 ? bytesToString(mbToBytes(server.limits.disk)) : 'Unlimited';
    const memoryLimit = server.limits.memory !== 0 ? bytesToString(mbToBytes(server.limits.memory)) : 'Unlimited';
    const cpuLimit = server.limits.cpu !== 0 ? server.limits.cpu + ' %' : 'Unlimited';

    const statusTone = isSuspended || stats?.status === 'offline' ? 'red' : stats?.status === 'running' ? 'green' : stats ? 'yellow' : 'neutral';
    const statusLabel = isSuspended
        ? 'Suspended'
        : !stats
        ? 'Loading'
        : stats.status === 'running'
        ? 'Running'
        : stats.status === 'offline'
        ? 'Offline'
        : 'Starting';

    const cpuPct = stats
        ? server.limits.cpu !== 0
            ? (stats.cpuUsagePercent / server.limits.cpu) * 100
            : stats.cpuUsagePercent
        : 0;
    const memPct =
        stats && server.limits.memory !== 0
            ? (stats.memoryUsageInBytes / mbToBytes(server.limits.memory)) * 100
            : 0;
    const diskPct =
        stats && server.limits.disk !== 0
            ? (stats.diskUsageInBytes / mbToBytes(server.limits.disk)) * 100
            : 0;

    return (
        <StatusIndicatorBox as={Link} to={`/server/${server.id}`} className={className} $status={stats?.status}>
            <div css={tw`flex items-center col-span-12 sm:col-span-5 lg:col-span-6`}>
                <div className={'icon mr-4'}>
                    <FontAwesomeIcon icon={faServer} />
                </div>
                <div>
                    <p css={tw`text-lg break-words`}>
                        {server.name}
                        <StatusPill $tone={statusTone}>{statusLabel}</StatusPill>
                    </p>
                    {!!server.description && (
                        <p css={tw`text-sm text-neutral-300 break-words line-clamp-2`}>{server.description}</p>
                    )}
                </div>
            </div>
            <div css={tw`flex-1 ml-4 lg:block lg:col-span-2 hidden`}>
                <div css={tw`flex justify-center`}>
                    <FontAwesomeIcon icon={faEthernet} css={tw`text-neutral-500`} />
                    <p css={tw`text-sm text-neutral-400 ml-2`}>
                        {server.allocations
                            .filter((alloc) => alloc.isDefault)
                            .map((allocation) => (
                                <React.Fragment key={allocation.ip + allocation.port.toString()}>
                                    {allocation.alias || ip(allocation.ip)}:{allocation.port}
                                </React.Fragment>
                            ))}
                    </p>
                </div>
            </div>
            <div css={tw`hidden col-span-7 lg:col-span-4 sm:flex items-baseline justify-center`}>
                {!stats || isSuspended || server.isNodeUnderMaintenance ? (
                    isSuspended ? (
                        <div css={tw`flex-1 text-center`}>
                            <span css={tw`bg-red-500 rounded px-2 py-1 text-red-100 text-xs`}>
                                {server.status === 'suspended' ? 'Suspended' : 'Connection Error'}
                            </span>
                        </div>
                    ) : server.isNodeUnderMaintenance ? (
                        <div css={tw`flex-1 text-center`}>
                            <span css={tw`bg-yellow-500 rounded px-2 py-1 text-yellow-100 text-xs`}>
                                Under Maintenance
                            </span>
                        </div>
                    ) : server.isTransferring || server.status ? (
                        <div css={tw`flex-1 text-center`}>
                            <span css={tw`bg-neutral-500 rounded px-2 py-1 text-neutral-100 text-xs`}>
                                {server.isTransferring
                                    ? 'Transferring'
                                    : server.status === 'installing'
                                    ? 'Installing'
                                    : server.status === 'restoring_backup'
                                    ? 'Restoring Backup'
                                    : 'Unavailable'}
                            </span>
                        </div>
                    ) : (
                        <Spinner size={'small'} />
                    )
                ) : (
                    <React.Fragment>
                        <div css={tw`flex-1 ml-4 sm:block hidden`}>
                            <div css={tw`flex justify-center`}>
                                <Icon icon={faMicrochip} $alarm={alarms.cpu} />
                                <IconDescription $alarm={alarms.cpu}>
                                    {stats.cpuUsagePercent.toFixed(2)} %
                                </IconDescription>
                            </div>
                            <p css={tw`text-xs text-neutral-600 text-center mt-1`}>of {cpuLimit}</p>
                        </div>
                        <div css={tw`flex-1 ml-4 sm:block hidden`}>
                            <div css={tw`flex justify-center`}>
                                <Icon icon={faMemory} $alarm={alarms.memory} />
                                <IconDescription $alarm={alarms.memory}>
                                    {bytesToString(stats.memoryUsageInBytes)}
                                </IconDescription>
                            </div>
                            <p css={tw`text-xs text-neutral-600 text-center mt-1`}>of {memoryLimit}</p>
                        </div>
                        <div css={tw`flex-1 ml-4 sm:block hidden`}>
                            <div css={tw`flex justify-center`}>
                                <Icon icon={faHdd} $alarm={alarms.disk} />
                                <IconDescription $alarm={alarms.disk}>
                                    {bytesToString(stats.diskUsageInBytes)}
                                </IconDescription>
                            </div>
                            <p css={tw`text-xs text-neutral-600 text-center mt-1`}>of {diskLimit}</p>
                        </div>
                    </React.Fragment>
                )}
            </div>
            {stats && !isSuspended && !server.isNodeUnderMaintenance && (
                <div css={tw`col-span-12 flex flex-col sm:flex-row gap-3 mt-1`}>
                    <UsageBar label={'CPU'} pct={cpuPct} text={`${stats.cpuUsagePercent.toFixed(1)}%`} />
                    <UsageBar label={'Memory'} pct={memPct} text={bytesToString(stats.memoryUsageInBytes)} />
                    <UsageBar label={'Disk'} pct={diskPct} text={bytesToString(stats.diskUsageInBytes)} />
                </div>
            )}
            <div className={'status-bar'} />
        </StatusIndicatorBox>
    );
};
