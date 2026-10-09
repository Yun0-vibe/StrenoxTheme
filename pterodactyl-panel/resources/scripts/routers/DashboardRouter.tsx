import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import HomePage from '@/components/addons/HomePage';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import { useLocation } from 'react-router';
import Spinner from '@/components/elements/Spinner';
import routes from '@/routers/routes';

const linkClass = 'strenox-subnav-link';

export default () => {
    const location = useLocation();
    const isAccount = location.pathname.startsWith('/account');
    const isCloud = routes.strenox.some((route) => route.path === location.pathname);

    return (
        <>
            <NavigationBar />
            {isAccount && (
                <SubNavigation>
                    <div>
                        <span css={{ color: '#8888A8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingRight: '0.5rem' }}>
                            Account
                        </span>
                        {routes.account
                            .filter((route) => !!route.name)
                            .map(({ path, name, exact = false }) => (
                                <NavLink
                                    key={path}
                                    to={`/account/${path}`.replace('//', '/')}
                                    exact={exact}
                                    className={linkClass}
                                >
                                    {name}
                                </NavLink>
                            ))}
                    </div>
                </SubNavigation>
            )}
            {isCloud && (
                <SubNavigation>
                    <div>
                        <span css={{ color: '#8888A8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', paddingRight: '0.5rem' }}>
                            Cloud
                        </span>
                        {routes.strenox
                            .filter((route) => !!route.name)
                            .map(({ path, name }) => (
                                <NavLink key={path} to={path} exact className={linkClass}>
                                    {name}
                                </NavLink>
                            ))}
                    </div>
                </SubNavigation>
            )}
            <TransitionRouter>
                <React.Suspense fallback={<Spinner centered />}>
                    <Switch location={location}>
                        <Route path={'/'} exact>
                            <HomePage />
                        </Route>
                        <Route path={'/servers'} exact>
                            <DashboardContainer />
                        </Route>
                        {routes.account.map(({ path, component: Component }) => (
                            <Route key={path} path={`/account/${path}`.replace('//', '/')} exact>
                                <Component />
                            </Route>
                        ))}
                        {routes.strenox.map(({ path, component: Component }) => (
                            <Route key={path} path={path} exact>
                                <Component />
                            </Route>
                        ))}
                        <Route path={'*'}>
                            <NotFound />
                        </Route>
                    </Switch>
                </React.Suspense>
            </TransitionRouter>
        </>
    );
};
