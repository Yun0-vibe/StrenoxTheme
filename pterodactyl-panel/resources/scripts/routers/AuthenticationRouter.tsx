import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginContainer from '@/components/auth/LoginContainer';
import ForgotPasswordContainer from '@/components/auth/ForgotPasswordContainer';
import ResetPasswordContainer from '@/components/auth/ResetPasswordContainer';
import LoginCheckpointContainer from '@/components/auth/LoginCheckpointContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import { useHistory, useLocation } from 'react-router';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faBolt } from '@fortawesome/free-solid-svg-icons';

const MarketingPanel = () => (
    <div css={tw`hidden lg:flex flex-col justify-center pr-4`}>
        <div
            css={tw`inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] mb-6`}
            style={{
                background: 'rgba(145,35,215,0.12)',
                border: '1px solid rgba(145,35,215,0.4)',
                color: '#C084FC',
            }}
        >
            <span
                css={tw`w-2 h-2 rounded-full inline-block`}
                style={{ background: '#22C55E', boxShadow: '0 0 8px #22C55E' }}
            />
            READY TO LOGIN
        </div>
        <div css={tw`flex items-center gap-3 mb-6`}>
            <img
                src={'/favicons/strenoxcloud-logo.png'}
                alt={'StrenoxCloud'}
                className={'strenox-float'}
                css={tw`w-14 h-14`}
                style={{ filter: 'drop-shadow(0 0 20px rgba(145,35,215,0.6))' }}
            />
            <div css={tw`text-2xl font-bold tracking-wide`}>
                <span css={tw`text-neutral-100`}>Strenox</span>
                <span css={tw`text-[#9123D7]`}>Cloud</span>
            </div>
        </div>
        <h1 css={tw`text-5xl font-black italic leading-[1.05] tracking-tight mb-5`}>
            <span css={tw`text-neutral-100`}>WELCOME TO</span>
            <br />
            <span
                css={tw`bg-clip-text text-transparent bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED]`}
            >
                STRENOXCLOUD
            </span>
        </h1>
        <p css={tw`text-neutral-400 mb-8 max-w-md leading-relaxed`}>
            Log in to access your command center, deploy game servers, and manage your worlds.
        </p>
        <div css={tw`grid grid-cols-2 gap-4 max-w-md`}>
            {[
                { icon: faShieldAlt, label: 'SECURITY', value: 'DDoS Protection' },
                { icon: faBolt, label: 'PERFORMANCE', value: 'NVMe Storage' },
            ].map((f) => (
                <div
                    key={f.label}
                    css={tw`rounded-2xl p-4 border border-white/10`}
                    style={{ background: 'rgba(22,22,31,0.7)' }}
                >
                    <FontAwesomeIcon icon={f.icon} css={tw`text-[#A855F7] mb-2`} />
                    <div css={tw`text-[0.65rem] font-bold tracking-[0.15em] text-neutral-500 mb-1`}>
                        {f.label}
                    </div>
                    <div css={tw`text-sm font-semibold text-neutral-200`}>{f.value}</div>
                </div>
            ))}
        </div>
    </div>
);

export default () => {
    const history = useHistory();
    const location = useLocation();
    const { path } = useRouteMatch();

    return (
        <div className={'min-h-screen flex items-center justify-center px-4 py-10 strenox-auth-bg'}>
            <div
                className={'strenox-orb'}
                style={{
                    width: '480px',
                    height: '480px',
                    top: '-160px',
                    left: '-120px',
                    background: 'radial-gradient(circle, rgba(145,35,215,0.5) 0%, transparent 70%)',
                }}
            />
            <div
                className={'strenox-orb'}
                style={{
                    width: '520px',
                    height: '520px',
                    top: '10%',
                    right: '-180px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
                    animationDelay: '-5s',
                }}
            />
            <div
                className={'strenox-orb'}
                style={{
                    width: '600px',
                    height: '600px',
                    bottom: '-260px',
                    left: '30%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)',
                    animationDelay: '-9s',
                }}
            />
            <div className={'strenox-auth-content w-full max-w-5xl'}>
                <div css={tw`lg:hidden flex flex-col items-center mb-6`}>
                    <img
                        src={'/favicons/strenoxcloud-logo.png'}
                        alt={'StrenoxCloud'}
                        className={'strenox-float'}
                        css={tw`w-14 h-14 mb-2`}
                        style={{ filter: 'drop-shadow(0 0 18px rgba(145,35,215,0.6))' }}
                    />
                    <div css={tw`text-xl font-bold tracking-wide`}>
                        <span css={tw`text-neutral-100`}>Strenox</span>
                        <span css={tw`text-[#9123D7]`}>Cloud</span>
                    </div>
                </div>
                <div css={tw`grid lg:grid-cols-2 gap-10 items-center`}>
                    <MarketingPanel />
                    <div css={tw`w-full max-w-md mx-auto lg:mx-0`}>
                        <Switch location={location}>
                            <Route path={`${path}/login`} component={LoginContainer} exact />
                            <Route path={`${path}/login/checkpoint`} component={LoginCheckpointContainer} />
                            <Route path={`${path}/password`} component={ForgotPasswordContainer} exact />
                            <Route path={`${path}/password/reset/:token`} component={ResetPasswordContainer} />
                            <Route path={`${path}/checkpoint`} />
                            <Route path={'*'}>
                                <NotFound onBack={() => history.push('/auth/login')} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};
