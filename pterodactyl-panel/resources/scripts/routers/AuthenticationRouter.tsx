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
        <div
            className={'min-h-screen pt-8 xl:pt-24'}
            style={{
                background:
                    'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(145,35,215,0.18), transparent), #0D0D12',
            }}
        >
            <div css={tw`flex flex-col items-center mb-8`}>
                <img src={'/favicons/strenoxcloud.svg'} css={tw`w-16 h-16 mb-3`} alt={'StrenoxCloud'} />
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
    );
};
