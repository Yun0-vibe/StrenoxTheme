import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faShoppingCart,
    faBolt,
    faWallet,
    faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';
import Spinner from '@/components/elements/Spinner';
import { createStrenoxOrder, getStrenoxOrders, StrenoxOrder } from '@/api/strenox';

const StoreGrid = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`};
`;

const PlanCard = styled.div<{ featured?: boolean }>`
    ${tw`rounded-2xl p-6 transition-all duration-200 relative border border-white/10`};
    background: ${(props) =>
        props.featured
            ? 'linear-gradient(135deg, rgba(30,21,53,0.9) 0%, rgba(22,22,31,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(26,26,37,0.85) 0%, rgba(22,22,31,0.9) 100%)'};
    border-color: ${(props) => (props.featured ? 'rgba(145,35,215,0.6)' : 'rgba(255,255,255,0.09)')};
    backdrop-filter: blur(12px);

    &:hover {
        box-shadow: 0 0 30px rgba(145, 35, 215, 0.25);
        transform: translateY(-4px);
    }
`;

const FeaturedBadge = styled.div`
    ${tw`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`};
    background: linear-gradient(135deg, #9123d7 0%, #7c3aed 100%);
    color: white;
    box-shadow: 0 4px 14px rgba(145, 35, 215, 0.5);
`;

const PurchaseButton = styled.button<{ featured?: boolean }>`
    ${tw`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200`};
    background: ${(props) =>
        props.featured ? 'linear-gradient(135deg, #9123d7 0%, #7c3aed 100%)' : '#16161F'};
    border: 1px solid ${(props) => (props.featured ? '#9123d7' : '#2A2A3A')};
    color: white;

    &:hover:not(:disabled) {
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.35);
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
    }
`;

const TabButton = styled.button<{ active: boolean }>`
    ${tw`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150`};
    background: ${(props) => (props.active ? '#9123D7' : '#16161F')};
    color: ${(props) => (props.active ? 'white' : '#8888A8')};
    border: 1px solid ${(props) => (props.active ? '#9123D7' : '#2A2A3A')};
`;

const OrderRow = styled.div`
    ${tw`flex items-center gap-3 p-3 rounded-xl`};
    background: #16161f;
    border: 1px solid #2a2a3a;
`;

const StatusPill = styled.span<{ status: string }>`
    ${tw`px-2 py-0.5 rounded text-xs font-semibold`};
    background: ${(props) =>
        props.status === 'completed' ? '#22C55E20' : props.status === 'cancelled' ? '#EF444420' : '#F59E0B20'};
    color: ${(props) =>
        props.status === 'completed' ? '#22C55E' : props.status === 'cancelled' ? '#EF4444' : '#F59E0B'};
`;

const TopUpButton = styled.button`
    ${tw`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200`};
    background: linear-gradient(135deg, #9123d7 0%, #7c3aed 100%);
    color: white;
    border: none;

    &:hover:not(:disabled) {
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.4);
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
    }
`;

const AmountSelect = styled.select`
    ${tw`rounded-xl px-4 py-2.5 text-sm`};
    background: #16161f;
    border: 1px solid #2a2a3a;
    color: #e2e2f0;

    &:focus {
        outline: none;
        border-color: #9123d7;
    }
`;

interface Plan {
    key: string;
    name: string;
    desc: string;
    price: string;
    featured: boolean;
    categories: string[];
    features: string[];
}

const PLANS: Plan[] = [
    {
        key: 'droplet',
        name: 'Droplet',
        desc: 'Perfect for small servers',
        price: '5.00',
        featured: false,
        categories: ['Game Servers'],
        features: ['2 GB RAM', '20 GB NVMe SSD', '1 CPU Core', '1 TB Bandwidth', 'DDoS Protection'],
    },
    {
        key: 'cloud',
        name: 'Cloud',
        desc: 'Most popular for communities',
        price: '12.00',
        featured: true,
        categories: ['Game Servers', 'VPS'],
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
        key: 'enterprise',
        name: 'Enterprise',
        desc: 'For large networks',
        price: '29.00',
        featured: false,
        categories: ['VPS', 'Databases'],
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

const TABS = ['All Plans', 'Game Servers', 'VPS', 'Databases'];

export default function StorePage() {
    const [cart, setCart] = useState<string[]>([]);
    const [ordering, setOrdering] = useState<string | null>(null);
    const [tab, setTab] = useState('All Plans');
    const [orders, setOrders] = useState<StrenoxOrder[] | null>(null);
    const [topUpAmount, setTopUpAmount] = useState('10');
    const [topUpMsg, setTopUpMsg] = useState('');

    const refreshOrders = () => {
        getStrenoxOrders()
            .then(setOrders)
            .catch(() => setOrders([]));
    };

    useEffect(() => {
        refreshOrders();
    }, []);

    const addToCart = (plan: Plan) => {
        setOrdering(plan.name);
        createStrenoxOrder(plan.key)
            .then(() => {
                setCart((prev) => [...prev, plan.name]);
                refreshOrders();
            })
            .catch(() => undefined)
            .finally(() => setOrdering(null));
    };

    const topUp = () => {
        setOrdering('topup');
        setTopUpMsg('');
        createStrenoxOrder(`topup_${topUpAmount}`)
            .then(() => {
                setTopUpMsg(`Top-up order for $${topUpAmount} created. Credits apply after staff approval.`);
                refreshOrders();
            })
            .catch(() => setTopUpMsg('Could not create top-up order. Please try again.'))
            .finally(() => setOrdering(null));
    };

    const visiblePlans = tab === 'All Plans' ? PLANS : PLANS.filter((p) => p.categories.includes(tab));

    const completedCredits = (orders ?? [])
        .filter((o) => o.plan.startsWith('Credit Top-Up') && o.status === 'completed')
        .reduce((sum, o) => sum + parseFloat(o.amount), 0)
        .toFixed(2);

    const pendingCount = (orders ?? []).filter((o) => o.status === 'pending').length;

    return (
        <div className={'strenox-page'} css={tw`max-w-6xl mx-auto px-4 py-8`}>
            <div css={tw`mb-8 flex items-center justify-between flex-wrap gap-4`}>
                <div>
                    <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>Server Store</h1>
                    <p css={tw`text-neutral-400`}>Choose the perfect plan for your needs</p>
                </div>
                <div
                    css={tw`flex items-center gap-2 px-4 py-2 rounded-xl`}
                    style={{ background: '#1A1A25', border: '1px solid #2A2A3A' }}
                >
                    <FontAwesomeIcon icon={faShoppingCart} css={tw`text-neutral-300`} />
                    <span css={tw`text-neutral-200 text-sm`}>{cart.length} items</span>
                </div>
            </div>

            <div
                css={tw`rounded-2xl p-5 mb-8 flex items-center justify-between flex-wrap gap-4 border border-white/10`}
                style={{
                    background:
                        'linear-gradient(135deg, rgba(145,35,215,0.14) 0%, rgba(124,58,237,0.06) 100%)',
                }}
            >
                <div css={tw`flex items-center gap-4`}>
                    <FontAwesomeIcon icon={faWallet} css={tw`text-2xl text-[#A855F7]`} />
                    <div>
                        <div css={tw`text-sm text-neutral-400`}>Account Credits</div>
                        <div css={tw`text-3xl font-bold text-neutral-100`}>${completedCredits}</div>
                        {pendingCount > 0 && (
                            <div css={tw`text-xs text-yellow-400 mt-1`}>
                                {pendingCount} order{pendingCount === 1 ? '' : 's'} awaiting approval
                            </div>
                        )}
                    </div>
                </div>
                <div css={tw`flex items-center gap-2`}>
                    <AmountSelect value={topUpAmount} onChange={(e) => setTopUpAmount(e.target.value)}>
                        <option value={'5'}>$5</option>
                        <option value={'10'}>$10</option>
                        <option value={'25'}>$25</option>
                    </AmountSelect>
                    <TopUpButton onClick={topUp} disabled={ordering !== null}>
                        {ordering === 'topup' ? 'Processing...' : 'Top Up Credits'}
                    </TopUpButton>
                </div>
            </div>
            {topUpMsg && (
                <p css={tw`text-sm text-neutral-300 mb-6 px-1`}>
                    <FontAwesomeIcon icon={faCheck} css={tw`text-green-400 mr-2`} />
                    {topUpMsg}
                </p>
            )}

            <div css={tw`flex gap-2 mb-8 flex-wrap`}>
                {TABS.map((t) => (
                    <TabButton key={t} active={tab === t} onClick={() => setTab(t)}>
                        {t}
                    </TabButton>
                ))}
            </div>

            <StoreGrid>
                {visiblePlans.map((plan) => (
                    <PlanCard key={plan.key} featured={plan.featured}>
                        {plan.featured && <FeaturedBadge>MOST POPULAR</FeaturedBadge>}
                        <h3 css={tw`text-xl font-bold text-neutral-100 mb-1`}>{plan.name}</h3>
                        <p css={tw`text-sm text-neutral-400 mb-4`}>{plan.desc}</p>
                        <div css={tw`mb-4`}>
                            <span css={tw`text-3xl font-bold text-neutral-100`}>${plan.price}</span>
                            <span css={tw`text-neutral-400 text-sm`}>/month</span>
                        </div>
                        <ul css={tw`space-y-2 mb-6`}>
                            {plan.features.map((feature) => (
                                <li key={feature} css={tw`flex items-center gap-2 text-sm text-neutral-300`}>
                                    <FontAwesomeIcon icon={faCheck} css={tw`text-[#9123D7]`} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <PurchaseButton
                            featured={plan.featured}
                            onClick={() => addToCart(plan)}
                            disabled={ordering !== null}
                        >
                            <FontAwesomeIcon icon={faBolt} css={tw`mr-2`} />
                            {ordering === plan.name ? 'Processing...' : 'Add to Cart'}
                        </PurchaseButton>
                    </PlanCard>
                ))}
            </StoreGrid>

            <div css={tw`mt-10`}>
                <ContentBox
                    title={'Order History'}
                    showLoadingOverlay={orders === null}
                >
                    {orders !== null && orders.length === 0 && (
                        <p css={tw`text-neutral-400 text-sm text-center py-6`}>
                            No orders yet. Your purchases will appear here.
                        </p>
                    )}
                    {orders !== null && orders.length > 0 && (
                        <div css={tw`space-y-2`}>
                            {orders.map((order) => (
                                <OrderRow key={order.id}>
                                    <FontAwesomeIcon icon={faReceipt} css={tw`text-[#9123D7]`} />
                                    <div css={tw`flex-1 min-w-0`}>
                                        <div css={tw`text-sm font-medium text-neutral-100`}>
                                            #{order.id} — {order.plan}
                                        </div>
                                        <div css={tw`text-xs text-neutral-400`}>
                                            ${order.amount} · {order.date}
                                        </div>
                                    </div>
                                    <StatusPill status={order.status}>{order.status}</StatusPill>
                                </OrderRow>
                            ))}
                        </div>
                    )}
                </ContentBox>
            </div>

            {orders === null && (
                <div css={tw`flex justify-center mt-6`}>
                    <Spinner centered />
                </div>
            )}
        </div>
    );
}
