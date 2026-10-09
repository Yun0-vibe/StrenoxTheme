import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <Container>
        {title && (
            <h2
                css={tw`text-3xl text-center font-semibold py-4 bg-clip-text text-transparent bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED]`}
            >
                {title}
            </h2>
        )}
        <FlashMessageRender css={tw`mb-2 px-1`} />
        <Form {...props} ref={ref}>
            <div
                css={tw`md:flex w-full rounded-2xl p-6 md:pl-0 mx-1 border border-white/10 backdrop-blur-xl shadow-[0_8px_60px_rgba(145,35,215,0.28)] relative overflow-hidden`}
                style={{
                    background:
                        'linear-gradient(135deg, rgba(30,21,53,0.88) 0%, rgba(22,22,31,0.92) 100%)',
                }}
            >
                <div
                    css={tw`absolute top-0 left-0 right-0 h-[3px]`}
                    style={{
                        background:
                            'linear-gradient(90deg, transparent, #9123D7 20%, #A855F7 50%, #7C3AED 80%, transparent)',
                    }}
                />
                <div css={tw`flex-none select-none mb-6 md:mb-0 self-center`}>
                    <img
                        src={'/favicons/strenoxcloud-logo.png'}
                        alt={'StrenoxCloud'}
                        className={'strenox-float'}
                        css={tw`block w-32 md:w-48 mx-auto`}
                        style={{ filter: 'drop-shadow(0 0 24px rgba(145,35,215,0.55))' }}
                    />
                </div>
                <div css={tw`flex-1`}>{props.children}</div>
            </div>
        </Form>
    </Container>
));
