import http from '@/api/http';

export interface StrenoxAnnouncement {
    id: number;
    title: string;
    content: string;
    priority: 'info' | 'warning' | 'critical';
    tag: string | null;
    date: string;
}

export interface StrenoxTicket {
    id: number;
    subject: string;
    status: 'open' | 'answered' | 'closed';
    priority: 'low' | 'medium' | 'high';
    date: string;
}

export interface StrenoxTicketMessage {
    id: number;
    message: string;
    // eslint-disable-next-line camelcase
    is_staff: boolean;
    date: string;
}

export interface StrenoxTicketDetail extends StrenoxTicket {
    messages: StrenoxTicketMessage[];
}

function unwrap<T>(data: unknown): T {
    if (data && typeof data === 'object' && 'data' in (data as Record<string, unknown>)) {
        return (data as Record<string, unknown>).data as T;
    }
    return data as T;
}

export function getStrenoxAnnouncements(): Promise<StrenoxAnnouncement[]> {
    return http
        .get('/api/client/account/strenox/announcements')
        .then(({ data }) => unwrap<StrenoxAnnouncement[]>(data));
}

export function createStrenoxOrder(plan: string): Promise<{ id: number; plan: string }> {
    return http
        .post('/api/client/account/strenox/store/orders', { plan })
        .then(({ data }) => unwrap<{ id: number; plan: string }>(data));
}

export interface StrenoxOrder {
    id: number;
    plan: string;
    amount: string;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
}

export function getStrenoxOrders(): Promise<StrenoxOrder[]> {
    return http
        .get('/api/client/account/strenox/store/orders')
        .then(({ data }) => unwrap<StrenoxOrder[]>(data));
}

export function getStrenoxTickets(): Promise<StrenoxTicket[]> {
    return http.get('/api/client/account/strenox/tickets').then(({ data }) => unwrap<StrenoxTicket[]>(data));
}

export function createStrenoxTicket(subject: string, priority: string, message: string): Promise<StrenoxTicket> {
    return http
        .post('/api/client/account/strenox/tickets', { subject, priority, message })
        .then(({ data }) => unwrap<StrenoxTicket>(data));
}

export function getStrenoxTicket(id: number): Promise<StrenoxTicketDetail> {
    return http
        .get(`/api/client/account/strenox/tickets/${id}`)
        .then(({ data }) => unwrap<StrenoxTicketDetail>(data));
}

export function replyStrenoxTicket(id: number, message: string): Promise<StrenoxTicketMessage> {
    return http
        .post(`/api/client/account/strenox/tickets/${id}/reply`, { message })
        .then(({ data }) => unwrap<StrenoxTicketMessage>(data));
}
