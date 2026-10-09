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
    faChevronDown,
    faCog,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';

const CategoryGrid = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`};
`;

const CategoryCard = styled.button<{ active: boolean }>`
    ${tw`rounded-2xl p-5 cursor-pointer transition-all duration-200 text-left border`};
    background: ${(props) =>
        props.active
            ? 'rgba(145,35,215,0.14)'
            : 'linear-gradient(135deg, rgba(30,21,53,0.6) 0%, rgba(22,22,31,0.9) 100%)'};
    border-color: ${(props) => (props.active ? '#9123D7' : 'rgba(145,35,215,0.22)')};
    box-shadow: ${(props) => (props.active ? '0 0 24px rgba(145,35,215,0.2)' : '0 0 16px rgba(145,35,215,0.08)')};

    &:hover {
        border-color: #9123d7;
        box-shadow: 0 0 26px rgba(145, 35, 215, 0.22);
        transform: translateY(-2px);
    }
`;

const SearchInput = styled.input`
    ${tw`w-full rounded-xl px-4 py-3 pl-11 text-sm transition-all duration-200`};
    background: #16161f;
    border: 1px solid #2a2a3a;
    color: #e2e2f0;

    &:focus {
        outline: none;
        border-color: #9123d7;
        box-shadow: 0 0 0 3px rgba(145, 35, 215, 0.15);
    }

    &::placeholder {
        color: #8888a8;
    }
`;

const ArticleRow = styled.div`
    ${tw`rounded-xl transition-all duration-150 overflow-hidden`};
    background: #16161f;
    border: 1px solid #2a2a3a;

    &:hover {
        border-color: #9123d7;
    }
`;

const ArticleHeader = styled.button`
    ${tw`w-full flex items-center gap-3 p-4 cursor-pointer text-left`};
    background: transparent;
    border: none;
`;

interface Article {
    title: string;
    category: string;
    answer: string;
}

const CATEGORIES = [
    { key: 'getting-started', icon: faServer, title: 'Getting Started', desc: 'Create and manage your first server' },
    { key: 'security', icon: faShieldAlt, title: 'Security', desc: 'Account security, 2FA, best practices' },
    { key: 'billing', icon: faCreditCard, title: 'Billing & Store', desc: 'Payments, invoices, purchasing' },
    { key: 'config', icon: faCog, title: 'Server Configuration', desc: 'Startup parameters and variables' },
    { key: 'faq', icon: faQuestionCircle, title: 'FAQ', desc: 'Frequently asked questions' },
    { key: 'advanced', icon: faBook, title: 'Advanced Guides', desc: 'In-depth tutorials for power users' },
];

const ARTICLES: Article[] = [
    {
        title: 'How do I create my first server?',
        category: 'getting-started',
        answer: 'Open the Store page, pick a plan that fits your game, and complete checkout. Your server is provisioned automatically and appears on your dashboard within a minute, ready to start from the console.',
    },
    {
        title: 'How do I install a modpack on my server?',
        category: 'getting-started',
        answer: 'Go to your server, open Files, and upload your modpack files. Then update the Startup variables (such as the server jar or version field) to match, and restart. Take a backup first from the Backups page.',
    },
    {
        title: 'How do I enable two-factor authentication?',
        category: 'security',
        answer: 'Open Account Settings, find the two-factor section, scan the QR code with an authenticator app, and save your recovery tokens somewhere safe. You will need a code on every login after that.',
    },
    {
        title: 'Someone else needs access. What should I do?',
        category: 'security',
        answer: 'Never share your password. Instead open your server, go to Users, and invite them as a subuser with only the permissions they need. You can remove them at any time.',
    },
    {
        title: 'How do top-ups and credits work?',
        category: 'billing',
        answer: 'Open the Store and use Top Up Credits to place a credit order. Staff approve it, the credits land on your account, and plan purchases draw from that balance automatically.',
    },
    {
        title: 'Where do I see my past payments?',
        category: 'billing',
        answer: 'Every purchase and top-up is listed with its status under Order History at the bottom of the Store page.',
    },
    {
        title: 'How do startup variables work?',
        category: 'config',
        answer: 'Each server type (egg) exposes variables like version, memory flags, or world name on the Startup page. Edit a value, save, and restart the server for it to take effect.',
    },
    {
        title: 'Setting up a custom domain or port',
        category: 'config',
        answer: 'Find your server address under the Network page (IP plus port). Point a DNS SRV record at it from your domain provider so players can join with a clean address.',
    },
    {
        title: 'How do backups and restores work?',
        category: 'faq',
        answer: 'Open Backups on your server and create one before big changes. Restoring replaces all current files, so download anything important first.',
    },
    {
        title: 'Connecting via SFTP',
        category: 'advanced',
        answer: 'Open Settings on your server to find your SFTP credentials. Connect with any SFTP client on the shown port to manage files directly, including large uploads the web uploader cannot handle.',
    },
    {
        title: 'Understanding resource limits',
        category: 'advanced',
        answer: 'CPU, memory, and disk limits are shown live on your dashboard rows and console graphs. Hitting a limit slows or stops the server, which is your cue to upgrade to a bigger plan in the Store.',
    },
];

export default function KnowledgeBase() {
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState<string | null>(null);
    const [openArticle, setOpenArticle] = useState<string | null>(null);

    const visible = ARTICLES.filter((a) => {
        if (activeCat && a.category !== activeCat) return false;
        if (search.trim() && !a.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
        return true;
    });

    return (
        <div className={'strenox-page'} css={tw`max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10`}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>Knowledge Base</h1>
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
                    {CATEGORIES.map((cat) => (
                        <CategoryCard
                            key={cat.key}
                            active={activeCat === cat.key}
                            onClick={() => {
                                setActiveCat((prev) => (prev === cat.key ? null : cat.key));
                                setOpenArticle(null);
                            }}
                        >
                            <div
                                css={tw`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white`}
                                style={{ background: 'linear-gradient(135deg, #9123D7 0%, #7C3AED 100%)' }}
                            >
                                <FontAwesomeIcon icon={cat.icon} />
                            </div>
                            <h3 css={tw`text-lg font-semibold text-neutral-100 mb-1`}>{cat.title}</h3>
                            <p css={tw`text-sm text-neutral-400`}>{cat.desc}</p>
                        </CategoryCard>
                    ))}
                </CategoryGrid>
            </ContentBox>

            <div css={tw`mt-8`}>
                <ContentBox
                    title={
                        activeCat
                            ? CATEGORIES.find((c) => c.key === activeCat)?.title ?? 'Articles'
                            : search.trim()
                              ? `Results for "${search.trim()}"`
                              : 'Popular Articles'
                    }
                >
                    {(activeCat || search.trim()) && (
                        <button
                            onClick={() => {
                                setActiveCat(null);
                                setSearch('');
                                setOpenArticle(null);
                            }}
                            css={tw`mb-4 flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-all duration-150`}
                            style={{ background: '#9123D720', color: '#A855F7', border: '1px solid #9123D7' }}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                            Clear filters
                        </button>
                    )}
                    {visible.length === 0 && (
                        <p css={tw`text-neutral-400 text-sm text-center py-6`}>
                            No articles match. Try a different search.
                        </p>
                    )}
                    <div css={tw`space-y-3`}>
                        {visible.map((article) => {
                            const open = openArticle === article.title;
                            return (
                                <ArticleRow key={article.title}>
                                    <ArticleHeader
                                        onClick={() => setOpenArticle(open ? null : article.title)}
                                    >
                                        <FontAwesomeIcon icon={faBook} css={tw`text-neutral-400`} />
                                        <span css={tw`text-sm text-neutral-200 flex-1`}>{article.title}</span>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            css={tw`text-neutral-500 text-xs transition-transform duration-200`}
                                            style={open ? { transform: 'rotate(180deg)' } : undefined}
                                        />
                                    </ArticleHeader>
                                    {open && (
                                        <p css={tw`text-sm text-neutral-300 leading-relaxed px-4 pb-4 pl-11`}>
                                            {article.answer}
                                        </p>
                                    )}
                                </ArticleRow>
                            );
                        })}
                    </div>
                </ContentBox>
            </div>
        </div>
    );
}
