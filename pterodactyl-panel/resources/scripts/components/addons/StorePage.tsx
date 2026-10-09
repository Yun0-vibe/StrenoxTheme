import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faShoppingCart,
    faBolt,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';
import { createStrenoxOrder } from '@/api/strenox';

const StoreGrid = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`};
`;

const PlanCard = styled.div<{ featured?: boolean }>`
    ${tw`rounded-xl p-6 transition-all duration-200 relative`};
    background: ${(props) =>
        props.featured
            ? 'linear-gradient(135deg, #1A1A25 0%, #1E1535 100%)'
            : '#1A1A25'};
    border: 1px solid ${(props) => (props.featured ? '#9123D7' : '#2A2A3A')};

    &:hover {
        box-shadow: 0 0 30px rgba(145, 35, 215, 0.2);
        transform: translateY(-4px);
    }
`;

const FeaturedBadge = styled.div`
    ${tw`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold`};
    background: linear-gradient(135deg, #9123D7 0%, #7C3AED 100%);
    color: white;
`;

const PlanName = styled.h3`
    ${tw`text-xl font-bold text-neutral-100 mb-1`};
`;

const PlanDesc = styled.p`
    ${tw`text-sm text-neutral-400 mb-4`};
`;

const PlanPrice = styled.div`
    ${tw`mb-4`};
`;

const PriceAmount = styled.span`
    ${tw`text-3xl font-bold text-neutral-100`};
`;

const PricePeriod = styled.span`
    ${tw`text-neutral-400 text-sm`};
`;

const FeatureList = styled.ul`
    ${tw`space-y-2 mb-6`};
`;

const FeatureItem = styled.li`
    ${tw`flex items-center gap-2 text-sm text-neutral-300`};
`;

const FeatureIcon = styled.span`
    color: #9123D7;
`;

const PurchaseButton = styled.button<{ featured?: boolean }>`
    ${tw`w-full rounded-lg py-3 text-sm font-semibold transition-all duration-200`};
    background: ${(props) =>
        props.featured
            ? 'linear-gradient(135deg, #9123D7 0%, #7C3AED 100%)'
            : '#16161F'};
    border: 1px solid ${(props) => (props.featured ? '#9123D7' : '#2A2A3A')};
    color: white;

    &:hover {
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.3);
        transform: translateY(-1px);
    }
`;

const plans = [
    {
        name: 'Droplet',
        desc: 'Perfect for small servers',
        price: '5.00',
        featured: false,
        features: [
            '2 GB RAM',
            '20 GB NVMe SSD',
            '1 CPU Core',
            '1 TB Bandwidth',
            'DDoS Protection',
        ],
    },
    {
        name: 'Cloud',
        desc: 'Most popular for communities',
        price: '12.00',
        featured: true,
        features: [
            '4 GB RAM',
            '50 GB NVMe SSD',
            '2 CPU Cores',
            '3 TB Bandwidth',
            'DDoS Protection',
            'Free Backups',
            'Priority Support',
        ],
    },
    {
        name: 'Enterprise',
        desc: 'For large networks',
        price: '29.00',
        featured: false,
        features: [
            '8 GB RAM',
            '100 GB NVMe SSD',
            '4 CPU Cores',
            'Unlimited Bandwidth',
            'DDoS Protection',
            'Free Backups',
            'Priority Support',
            'Custom Domain',
        ],
    },
];

export default function StorePage() {
    const [cart, setCart] = useState<string[]>([]);
    const [ordering, setOrdering] = useState<string | null>(null);
    const [credits] = useState('0.00');

    const addToCart = (planName: string) => {
        const key = planName.toLowerCase();
        setOrdering(planName);
        createStrenoxOrder(key)
            .then(() => setCart((prev) => [...prev, planName]))
            .catch(() => setCart((prev) => [...prev, planName]))
            .finally(() => setOrdering(null));
    };

    return (
        <div className={'strenox-page'} css={tw`max-w-6xl mx-auto px-4 py-8`}>
            <div
                css={tw`rounded-xl p-5 mb-8 flex items-center justify-between flex-wrap gap-4`}
                style={{
                    background: 'linear-gradient(135deg, rgba(145,35,215,0.12) 0%, rgba(124,58,237,0.06) 100%)',
                    border: '1px solid #9123D7',
                }}
            >
                <div>
                    <div css={tw`text-sm text-neutral-400`}>Account Credits</div>
                    <div css={tw`text-3xl font-bold text-neutral-100`}>${credits}</div>
                </div>
                <button
                    css={tw`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200`}
                    style={{ background: '#9123D7', color: 'white', border: 'none' }}
                >
                    Top Up Credits
                </button>
            </div>
            <div css={tw`mb-8 flex items-center justify-between`}>
                <div>
                    <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>
                        Server Store
                    </h1>
                    <p css={tw`text-neutral-400`}>
                        Choose the perfect plan for your needs
                    </p>
                </div>
                <div
                    css={tw`flex items-center gap-2 px-4 py-2 rounded-lg`}
                    style={{ background: '#1A1A25', border: '1px solid #2A2A3A' }}
                >
                    <FontAwesomeIcon icon={faShoppingCart} css={tw`text-neutral-300`} />
                    <span css={tw`text-neutral-200 text-sm`}>{cart.length} items</span>
                </div>
            </div>

            <div css={tw`flex gap-2 mb-8 flex-wrap`}>
                {['All Plans', 'Game Servers', 'VPS', 'Databases'].map((tab, i) => (
                    <button
                        key={i}
                        css={tw`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150`}
                        style={{
                            background: i === 0 ? '#9123D7' : '#16161F',
                            color: i === 0 ? 'white' : '#8888A8',
                            border: `1px solid ${i === 0 ? '#9123D7' : '#2A2A3A'}`,
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <StoreGrid>
                {plans.map((plan, i) => (
                    <PlanCard key={i} featured={plan.featured}>
                        {plan.featured && <FeaturedBadge>MOST POPULAR</FeaturedBadge>}
                        <PlanName>{plan.name}</PlanName>
                        <PlanDesc>{plan.desc}</PlanDesc>
                        <PlanPrice>
                            <PriceAmount>${plan.price}</PriceAmount>
                            <PricePeriod>/month</PricePeriod>
                        </PlanPrice>
                        <FeatureList>
                            {plan.features.map((feature, j) => (
                                <FeatureItem key={j}>
                                    <FeatureIcon>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </FeatureIcon>
                                    {feature}
                                </FeatureItem>
                            ))}
                        </FeatureList>
                        <PurchaseButton
                            featured={plan.featured}
                            onClick={() => addToCart(plan.name)}
                            disabled={ordering !== null}
                        >
                            <FontAwesomeIcon icon={faBolt} css={tw`mr-2`} />
                            {ordering === plan.name ? 'Processing...' : 'Add to Cart'}
                        </PurchaseButton>
                    </PlanCard>
                ))}
            </StoreGrid>
        </div>
    );
}
