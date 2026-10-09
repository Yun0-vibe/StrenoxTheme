import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
    eyebrow?: string;
};

const Card = styled.div`
    ${tw`relative overflow-hidden rounded-3xl p-8 border border-white/10 backdrop-blur-xl`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.88) 0%, rgba(13, 13, 18, 0.94) 100%);
    box-shadow: 0 12px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(145, 35, 215, 0.16);
`;

export default forwardRef<HTMLFormElement, Props>(({ title, eyebrow, ...props }, ref) => (
    <>
        {(eyebrow || title) && (
            <div css={tw`text-center mb-7`}>
                {eyebrow && (
                    <div
                        css={tw`text-xs font-bold tracking-[0.3em] text-[#A855F7] mb-3`}
                    >
                        {eyebrow}
                    </div>
                )}
                {title && (
                    <h2 css={tw`text-3xl font-extrabold italic text-neutral-100 tracking-normal leading-snug overflow-visible pb-1`}>{title}</h2>
                )}
            </div>
        )}
        <FlashMessageRender css={tw`mb-4`} />
        <Card>
            <div
                css={tw`absolute top-0 left-8 right-8 h-[3px] rounded-full`}
                style={{
                    background:
                        'linear-gradient(90deg, transparent, #9123D7 20%, #A855F7 50%, #7C3AED 80%, transparent)',
                }}
            />
            <Form {...props} ref={ref}>
                {props.children}
            </Form>
        </Card>
    </>
));
