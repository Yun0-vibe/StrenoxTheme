import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Translate from '@/components/elements/Translate';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { ActivityLog } from '@definitions/user';
import ActivityLogMetaButton from '@/components/elements/activity/ActivityLogMetaButton';
import { FolderOpenIcon, TerminalIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import style from './style.module.css';
import Avatar from '@/components/Avatar';
import useLocationHash from '@/plugins/useLocationHash';
import { getObjectKeys, isObject } from '@/lib/objects';

interface Props {
    activity: ActivityLog;
    children?: React.ReactNode;
}

function wrapProperties(value: unknown): any {
    if (value === null || typeof value === 'string' || typeof value === 'number') {
        return `<strong>${String(value)}</strong>`;
    }

    if (isObject(value)) {
        return getObjectKeys(value).reduce((obj, key) => {
            if (key === 'count' || (typeof key === 'string' && key.endsWith('_count'))) {
                return { ...obj, [key]: value[key] };
            }
            return { ...obj, [key]: wrapProperties(value[key]) };
        }, {} as Record<string, unknown>);
    }

    if (Array.isArray(value)) {
        return value.map(wrapProperties);
    }

    return value;
}

export default ({ activity, children }: Props) => {
    const { pathTo } = useLocationHash();
    const actor = activity.relationships.actor;
    const properties = wrapProperties(activity.properties);

    return (
        <div className={'strenox-timeline-row group'}>
            <div className={'strenox-timeline-rail'}>
                <div className={'strenox-timeline-avatar'}>
                    <Avatar name={actor?.uuid || 'system'} />
                </div>
            </div>
            <div className={'strenox-timeline-body'}>
                <div className={'strenox-timeline-head'}>
                    <Tooltip placement={'top'} content={actor?.email || 'System User'}>
                        <span className={'strenox-timeline-actor'}>{actor?.username || 'System'}</span>
                    </Tooltip>
                    <Link
                        to={`#${pathTo({ event: activity.event })}`}
                        className={'strenox-timeline-event'}
                    >
                        {activity.event}
                    </Link>
                    <div className={classNames(style.icons, 'group-hover:text-gray-300')}>
                        {activity.isApi && (
                            <Tooltip placement={'top'} content={'Using API Key'}>
                                <TerminalIcon />
                            </Tooltip>
                        )}
                        {activity.event.startsWith('server:sftp.') && (
                            <Tooltip placement={'top'} content={'Using SFTP'}>
                                <FolderOpenIcon />
                            </Tooltip>
                        )}
                        {children}
                    </div>
                </div>
                <p className={style.description}>
                    <Translate ns={'activity'} values={properties} i18nKey={activity.event.replace(':', '.')} />
                </p>
                <div className={'strenox-timeline-meta'}>
                    {activity.ip && (
                        <span>
                            {activity.ip}
                            <span className={'strenox-timeline-sep'}>·</span>
                        </span>
                    )}
                    <Tooltip placement={'right'} content={format(activity.timestamp, 'MMM do, yyyy H:mm:ss')}>
                        <span>{formatDistanceToNowStrict(activity.timestamp, { addSuffix: true })}</span>
                    </Tooltip>
                    {activity.hasAdditionalMetadata && <ActivityLogMetaButton meta={activity.properties} />}
                </div>
            </div>
        </div>
    );
};
