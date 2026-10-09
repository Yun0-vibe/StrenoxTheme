import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tw from 'twin.macro';
import isEqual from 'react-fast-compare';

interface Props {
    icon?: IconProp;
    title: string | React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const TitledGreyBox = ({ icon, title, children, className }: Props) => (
    <div
        css={tw`rounded-2xl shadow-md border border-white/10 overflow-hidden`}
        className={className}
        style={{
            background: 'linear-gradient(135deg, rgba(30,21,53,0.7) 0%, rgba(22,22,31,0.9) 100%)',
        }}
    >
        <div
            css={tw`rounded-t p-3 border-b`}
            style={{
                background: 'linear-gradient(90deg, rgba(145,35,215,0.22) 0%, rgba(22,22,31,0.6) 100%)',
                borderColor: 'rgba(145,35,215,0.3)',
            }}
        >
            {typeof title === 'string' ? (
                <p css={tw`text-sm uppercase text-neutral-100 font-semibold`}>
                    {icon && <FontAwesomeIcon icon={icon} css={tw`mr-2 text-[#A855F7]`} />}
                    {title}
                </p>
            ) : (
                title
            )}
        </div>
        <div css={tw`p-3`}>{children}</div>
    </div>
);

export default memo(TitledGreyBox, isEqual);
