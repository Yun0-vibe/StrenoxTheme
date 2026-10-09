import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faQuestionCircle,
    faServer,
    faShieldAlt,
    faCreditCard,
    faSearch,
    faChevronRight,
    faCog,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';

const CategoryGrid = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`};
`;

const CategoryCard = styled.div`
    ${tw`rounded-lg p-5 cursor-pointer transition-all duration-200`};
    background: #1A1A25;
    border: 1px solid #2A2A3A;

    &:hover {
        border-color: #9123D7;
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.15);
        transform: translateY(-2px);
    }
`;

const CategoryIcon = styled.div`
    ${tw`w-10 h-10 rounded-lg flex items-center justify-center mb-3`};
    background: linear-gradient(135deg, #9123D7 0%, #7C3AED 100%);
    color: white;
`;

const CategoryTitle = styled.h3`
    ${tw`text-lg font-semibold text-neutral-100 mb-1`};
`;

const CategoryDesc = styled.p`
    ${tw`text-sm text-neutral-400`};
`;

const SearchInput = styled.input`
    ${tw`w-full rounded-lg px-4 py-3 pl-11 text-sm transition-all duration-200`};
    background: #16161F;
    border: 1px solid #2A2A3A;
    color: #E2E2F0;

    &:focus {
        outline: none;
        border-color: #9123D7;
        box-shadow: 0 0 0 3px rgba(145, 35, 215, 0.15);
    }

    &::placeholder {
        color: #8888A8;
    }
`;

const ArticleRow = styled.div`
    ${tw`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150`};

    &:hover {
        background: #1A1A25;

        & > .article-title {
            color: #9123D7;
        }
    }
`;

const ArticleTitle = styled.span`
    ${tw`text-sm text-neutral-200 transition-colors duration-150 flex-1`};
`;

const categories = [
    {
        icon: faServer,
        title: 'Getting Started',
        desc: 'Learn how to create and manage your first server',
    },
    {
        icon: faShieldAlt,
        title: 'Security',
        desc: 'Account security, 2FA, and best practices',
    },
    {
        icon: faCreditCard,
        title: 'Billing & Store',
        desc: 'Payment methods, invoices, and purchasing',
    },
    {
        icon: faCog,
        title: 'Server Configuration',
        desc: 'Startup parameters, environment variables, and more',
    },
    {
        icon: faQuestionCircle,
        title: 'FAQ',
        desc: 'Frequently asked questions and answers',
    },
    {
        icon: faBook,
        title: 'Advanced Guides',
        desc: 'In-depth tutorials for power users',
    },
];

const popularArticles = [
    'How to install a modpack on my server',
    'Setting up a custom domain',
    'Configuring backups and restore',
    'Understanding resource limits',
    'Connecting via SFTP',
];

export default function KnowledgeBase() {
    const [search, setSearch] = useState('');

    return (
        <div className={'strenox-page'} css={tw`max-w-6xl mx-auto px-4 py-8`}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>
                    Knowledge Base
                </h1>
                <p css={tw`text-neutral-400`}>
                    Find answers to common questions and learn how to use StrenoxCloud
                </p>
            </div>

            <div css={tw`mb-8 relative`}>
                <FontAwesomeIcon
                    icon={faSearch}
                    css={tw`absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400`}
                />
                <SearchInput
                    type="text"
                    placeholder="Search for articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <ContentBox title={'Categories'}>
                <CategoryGrid>
                    {categories.map((cat, i) => (
                        <CategoryCard key={i}>
                            <CategoryIcon>
                                <FontAwesomeIcon icon={cat.icon} />
                            </CategoryIcon>
                            <CategoryTitle>{cat.title}</CategoryTitle>
                            <CategoryDesc>{cat.desc}</CategoryDesc>
                        </CategoryCard>
                    ))}
                </CategoryGrid>
            </ContentBox>

            <div css={tw`mt-8`}>
                <ContentBox title={'Popular Articles'}>
                    <div css={tw`divide-y divide-neutral-800`}>
                        {popularArticles.map((article, i) => (
                            <ArticleRow key={i}>
                                <FontAwesomeIcon
                                    icon={faBook}
                                    css={tw`text-neutral-400`}
                                />
                                <ArticleTitle className="article-title">
                                    {article}
                                </ArticleTitle>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    css={tw`text-neutral-500 text-xs`}
                                />
                            </ArticleRow>
                        ))}
                    </div>
                </ContentBox>
            </div>
        </div>
    );
}
