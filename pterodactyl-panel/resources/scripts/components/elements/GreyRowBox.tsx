import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-2xl no-underline text-neutral-200 items-center p-4 border border-white/10 transition-all duration-200 overflow-hidden`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.6) 0%, rgba(22, 22, 31, 0.85) 100%);

    ${(props) =>
        props.$hoverable !== false &&
        `
        &:hover {
            border-color: rgba(145, 35, 215, 0.6);
            box-shadow: 0 0 20px rgba(145, 35, 215, 0.18);
            transform: translateY(-1px);
        }
    `};

    & .icon {
        ${tw`rounded-xl w-16 flex items-center justify-center text-white p-3`};
        background: linear-gradient(135deg, #9123d7 0%, #7c3aed 100%);
        box-shadow: 0 4px 14px rgba(145, 35, 215, 0.4);
    }
`;
