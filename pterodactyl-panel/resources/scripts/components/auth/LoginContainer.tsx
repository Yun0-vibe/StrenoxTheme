import React, { useEffect, useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import login from '@/api/auth/login';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import { useStoreState } from 'easy-peasy';
import { ErrorMessage, Field as FormikField, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import Reaptcha from 'reaptcha';
import useFlash from '@/plugins/useFlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Values {
    username: string;
    password: string;
}

const inputClass =
    'w-full bg-[#101016] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all duration-200 focus:border-[#9123D7]';

const LoginContainer = ({ history }: RouteComponentProps) => {
    const ref = useRef<Reaptcha>(null);
    const [token, setToken] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const { enabled: recaptchaEnabled, siteKey } = useStoreState((state) => state.settings.data!.recaptcha);

    useEffect(() => {
        clearFlashes();
    }, []);

    const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();

        // If there is no token in the state yet, request the token and then abort this submit request
        // since it will be re-submitted when the recaptcha data is returned by the component.
        if (recaptchaEnabled && !token) {
            ref.current!.execute().catch((error) => {
                console.error(error);

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });

            return;
        }

        login({ ...values, recaptchaData: token })
            .then((response) => {
                if (response.complete) {
                    // @ts-expect-error this is valid
                    window.location = response.intended || '/';
                    return;
                }

                history.replace('/auth/login/checkpoint', { token: response.confirmationToken });
            })
            .catch((error) => {
                console.error(error);

                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={{ username: '', password: '' }}
            validationSchema={object().shape({
                username: string().required('A username or email must be provided.'),
                password: string().required('Please enter your account password.'),
            })}
        >
            {({ isSubmitting, setSubmitting, submitForm }) => (
                <LoginFormContainer title={'Login to your account'} eyebrow={'Welcome back'}>
                    <div css={tw`mb-5`}>
                        <label css={tw`block text-xs font-bold tracking-[0.15em] text-neutral-400 mb-2`}>
                            USERNAME OR EMAIL
                        </label>
                        <div css={tw`relative`}>
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                css={tw`absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none`}
                            />
                            <FormikField
                                name={'username'}
                                type={'text'}
                                placeholder={'you@example.com'}
                                disabled={isSubmitting}
                                className={inputClass}
                            />
                        </div>
                        <ErrorMessage
                            name={'username'}
                            component={'div'}
                            css={tw`text-xs text-red-400 mt-1.5`}
                        />
                    </div>
                    <div css={tw`mb-6`}>
                        <div css={tw`flex items-center justify-between mb-2`}>
                            <label css={tw`block text-xs font-bold tracking-[0.15em] text-neutral-400`}>
                                PASSWORD
                            </label>
                            <Link
                                to={'/auth/password'}
                                css={tw`text-xs font-semibold text-[#A855F7] hover:text-neutral-100 no-underline transition-colors duration-150`}
                            >
                                FORGOT PASSWORD?
                            </Link>
                        </div>
                        <div css={tw`relative`}>
                            <FontAwesomeIcon
                                icon={faLock}
                                css={tw`absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none`}
                            />
                            <FormikField
                                name={'password'}
                                type={showPassword ? 'text' : 'password'}
                                placeholder={'••••••••••'}
                                disabled={isSubmitting}
                                className={inputClass + ' pr-11'}
                            />
                            <button
                                type={'button'}
                                onClick={() => setShowPassword((s) => !s)}
                                css={tw`absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 transition-colors duration-150`}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} css={tw`text-sm`} />
                            </button>
                        </div>
                        <ErrorMessage
                            name={'password'}
                            component={'div'}
                            css={tw`text-xs text-red-400 mt-1.5`}
                        />
                    </div>
                    <div css={tw`mb-2`}>
                        <Button
                            type={'submit'}
                            size={'xlarge'}
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            css={tw`w-full`}
                        >
                            Login
                        </Button>
                    </div>
                    {recaptchaEnabled && (
                        <Reaptcha
                            ref={ref}
                            size={'invisible'}
                            sitekey={siteKey || '_invalid_key'}
                            onVerify={(response) => {
                                setToken(response);
                                submitForm();
                            }}
                            onExpire={() => {
                                setSubmitting(false);
                                setToken('');
                            }}
                        />
                    )}
                    <div css={tw`mt-5 flex items-center gap-3`}>
                        <div css={tw`flex-1 h-px`} style={{ background: 'rgba(255,255,255,0.08)' }} />
                        <span css={tw`text-[0.65rem] font-bold tracking-[0.25em] text-neutral-500`}>
                            SECURE LOGIN
                        </span>
                        <div css={tw`flex-1 h-px`} style={{ background: 'rgba(255,255,255,0.08)' }} />
                    </div>
                </LoginFormContainer>
            )}
        </Formik>
    );
};

export default LoginContainer;
