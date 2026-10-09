import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faServer,
    faLifeRing,
    faBook,
    faComments,
    faBullhorn,
    faHeartbeat,
    faUser,
    faCogs,
    faSignOutAlt,
    faLayerGroup,
    faBars,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Avatar from '@/components/Avatar';

const LINK_CLASS =
    'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm no-underline text-neutral-400 hover:text-neutral-100 hover:bg-white/5 transition-all duration-150';
const ACTIVE_STYLE = {
    color: '#fff',
    background: 'rgba(145,35,215,0.16)',
    boxShadow: 'inset 2px 0 0 #9123D7',
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            color: '#8888A8',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '1rem 1.25rem 0.35rem',
            fontWeight: 700,
        }}
    >
        {children}
    </div>
);

const SideLink = ({
    to,
    exact,
    icon,
    label,
}: {
    to: string;
    exact?: boolean;
    icon: React.ComponentProps<typeof FontAwesomeIcon>['icon'];
    label: string;
}) => (
    <NavLink to={to} exact={exact} className={LINK_CLASS} activeStyle={ACTIVE_STYLE}>
        <FontAwesomeIcon icon={icon} style={{ width: '1.1rem' }} />
        <span>{label}</span>
    </NavLink>
);

export default () => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const username = useStoreState((state: ApplicationStore) => state.user.data!.username);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    const sidebarBody = (
        <>
            <Link
                to={'/'}
                className={'flex items-center gap-2 px-5 pt-5 pb-4 no-underline'}
                onClick={() => setMobileOpen(false)}
            >
                <img
                    src={'/favicons/strenoxcloud-logo.png'}
                    alt={'StrenoxCloud'}
                    style={{ width: '2rem', height: '2rem', filter: 'drop-shadow(0 0 10px rgba(145,35,215,0.6))' }}
                />
                <span style={{ color: '#9123D7', fontSize: '1.25rem', fontWeight: 700 }}>{name}</span>
            </Link>
            <div className={'px-4 pb-2'}>
                <SearchContainer />
            </div>
            <div className={'flex-1 overflow-y-auto pb-4'} onClick={() => setMobileOpen(false)}>
                <SectionLabel>Overview</SectionLabel>
                <SideLink to={'/'} exact icon={faHome} label={'Command Center'} />
                <SideLink to={'/servers'} exact icon={faServer} label={'Servers'} />
                <SectionLabel>Cloud</SectionLabel>
                <SideLink to={'/tickets'} icon={faLifeRing} label={'Support'} />
                <SideLink to={'/knowledge-base'} icon={faBook} label={'Guides'} />
                <SideLink to={'/discord'} icon={faComments} label={'Discord'} />
                <SideLink to={'/announcements'} icon={faBullhorn} label={'News'} />
                <SideLink to={'/status'} icon={faHeartbeat} label={'Status'} />
                <SectionLabel>Account</SectionLabel>
                <SideLink to={'/account'} icon={faUser} label={'My Account'} />
                {rootAdmin && (
                    <a href={'/admin'} rel={'noreferrer'} className={LINK_CLASS}>
                        <FontAwesomeIcon icon={faCogs} style={{ width: '1.1rem' }} />
                        <span>Admin Panel</span>
                    </a>
                )}
            </div>
            <div
                className={'flex items-center gap-3 px-4 py-3'}
                style={{ borderTop: '1px solid rgba(145,35,215,0.2)' }}
            >
                <span className={'flex items-center w-8 h-8'}>
                    <Avatar.User />
                </span>
                <span className={'flex-1 text-sm text-neutral-200 truncate'}>{username}</span>
                <Tooltip placement={'top'} content={'Sign Out'}>
                    <button
                        onClick={onTriggerLogout}
                        className={'text-neutral-400 hover:text-red-400 transition-colors duration-150'}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </Tooltip>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <div
                className={'hidden md:flex flex-col fixed left-0 top-0 h-screen w-60 z-40'}
                style={{
                    background: 'linear-gradient(180deg, rgba(30,21,53,0.92) 0%, rgba(10,10,15,0.97) 100%)',
                    borderRight: '1px solid rgba(145,35,215,0.25)',
                    backdropFilter: 'blur(16px)',
                }}
            >
                <SpinnerOverlay visible={isLoggingOut} />
                {sidebarBody}
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div
                    className={'md:hidden fixed inset-0 z-40'}
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <div
                className={'md:hidden fixed inset-y-0 left-0 w-64 z-50 flex flex-col transition-transform duration-200'}
                style={{
                    background: 'linear-gradient(180deg, rgba(30,21,53,0.97) 0%, rgba(10,10,15,0.99) 100%)',
                    borderRight: '1px solid rgba(145,35,215,0.3)',
                    boxShadow: '0 0 40px rgba(145,35,215,0.2)',
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                }}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className={'absolute top-4 right-4 text-neutral-400 hover:text-white p-2'}
                    aria-label={'Close menu'}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {sidebarBody}
            </div>

            {/* Mobile top bar */}
            <div
                className={'md:hidden w-full flex items-center px-2 h-14 gap-1 overflow-x-auto'}
                style={{
                    background: 'linear-gradient(180deg, rgba(30,21,53,0.9) 0%, rgba(13,13,18,0.95) 100%)',
                    borderBottom: '1px solid rgba(145,35,215,0.3)',
                }}
            >
                <SpinnerOverlay visible={isLoggingOut} />
                <button
                    onClick={() => setMobileOpen(true)}
                    className={'p-3 text-neutral-200 hover:text-white flex-shrink-0'}
                    aria-label={'Open menu'}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <Link to={'/'} className={'flex items-center gap-2 mr-2 no-underline flex-shrink-0'}>
                    <img
                        src={'/favicons/strenoxcloud-logo.png'}
                        alt={'StrenoxCloud'}
                        style={{ width: '1.6rem', height: '1.6rem' }}
                    />
                    <span style={{ color: '#9123D7', fontWeight: 700 }}>{name}</span>
                </Link>
                <div className={'flex-1'} />
                <NavLink to={'/'} exact className={'p-3 text-neutral-300'} activeStyle={{ color: '#9123D7' }}>
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
                <NavLink to={'/servers'} exact className={'p-3 text-neutral-300'} activeStyle={{ color: '#9123D7' }}>
                    <FontAwesomeIcon icon={faLayerGroup} />
                </NavLink>
                <NavLink to={'/account'} className={'p-3 text-neutral-300'} activeStyle={{ color: '#9123D7' }}>
                    <span className={'flex items-center w-5 h-5'}>
                        <Avatar.User />
                    </span>
                </NavLink>
                <button onClick={onTriggerLogout} className={'p-3 text-neutral-300'}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </div>
        </>
    );
};
