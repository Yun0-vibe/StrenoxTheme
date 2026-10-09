import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginContainer from '@/components/auth/LoginContainer';
import ForgotPasswordContainer from '@/components/auth/ForgotPasswordContainer';
import ResetPasswordContainer from '@/components/auth/ResetPasswordContainer';
import LoginCheckpointContainer from '@/components/auth/LoginCheckpointContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import { useHistory, useLocation } from 'react-router';
import tw from 'twin.macro';

export default () => {
    const history = useHistory();
    const location = useLocation();
    const { path } = useRouteMatch();

    return (
        <div className={'min-h-screen pt-8 xl:pt-24 strenox-auth-bg'}>
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
            <div className={'strenox-auth-content'}>
            <div css={tw`flex flex-col items-center mb-8`}>
                <img
                    src={'/favicons/strenoxcloud-logo.png'}
                    alt={'StrenoxCloud'}
                    css={tw`w-16 h-16 mb-3`}
                    style={{ filter: 'drop-shadow(0 0 18px rgba(145,35,215,0.6))' }}
                />
                <h1 css={tw`text-2xl font-bold text-neutral-100 tracking-wide`}>
                    Strenox<span css={tw`text-[#9123D7]`}>Cloud</span>
                </h1>
                <p css={tw`text-sm text-neutral-400 mt-1`}>Game server hosting, reimagined.</p>
            </div>
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
    );
};
