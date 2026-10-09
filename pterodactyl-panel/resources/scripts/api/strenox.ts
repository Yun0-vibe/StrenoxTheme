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

export interface StrenoxOverview {
    open_tickets: number;
    announcements: number;
}

export function getOverview(): Promise<StrenoxOverview> {
    return http
        .get('/api/client/account/strenox/overview')
        .then(({ data }) => unwrap<StrenoxOverview>(data));
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

export interface StrenoxTicketAdmin extends StrenoxTicket {
    // eslint-disable-next-line camelcase
    user_name: string | null;
    // eslint-disable-next-line camelcase
    user_email: string | null;
}

export function getAllStrenoxTickets(): Promise<StrenoxTicketAdmin[]> {
    return http
        .get('/api/client/account/strenox/tickets/all')
        .then(({ data }) => unwrap<StrenoxTicketAdmin[]>(data));
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

export interface StrenoxDiscordStatus {
    linked: boolean;
    username: string | null;
    // eslint-disable-next-line camelcase
    avatar_url: string | null;
    notifications: boolean;
    // eslint-disable-next-line camelcase
    role_sync: boolean;
    // eslint-disable-next-line camelcase
    invite_url: string | null;
    // eslint-disable-next-line camelcase
    member_count: number | null;
    // eslint-disable-next-line camelcase
    oauth_configured: boolean;
}

export function getDiscordStatus(): Promise<StrenoxDiscordStatus> {
    return http
        .get('/api/client/account/strenox/discord')
        .then(({ data }) => unwrap<StrenoxDiscordStatus>(data));
}

export function updateDiscordPrefs(
    notifications: boolean,
    roleSync: boolean
): Promise<{ notifications: boolean; role_sync: boolean }> {
    return http
        .patch('/api/client/account/strenox/discord', { notifications, role_sync: roleSync })
        .then(({ data }) => unwrap<{ notifications: boolean; role_sync: boolean }>(data));
}

export function unlinkDiscord(): Promise<void> {
    return http.delete('/api/client/account/strenox/discord').then(() => undefined);
}

export function getAvatarUrl(): Promise<string | null> {
    return http
        .get('/api/client/account/strenox/avatar')
        .then(({ data }) => unwrap<{ avatar_url: string | null }>(data).avatar_url);
}

export function uploadAvatar(file: File): Promise<string | null> {
    const form = new FormData();
    form.append('avatar', file);
    return http
        .post('/api/client/account/strenox/avatar', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => unwrap<{ avatar_url: string | null }>(data).avatar_url);
}

export function deleteAvatar(): Promise<void> {
    return http.delete('/api/client/account/strenox/avatar').then(() => undefined);
}
