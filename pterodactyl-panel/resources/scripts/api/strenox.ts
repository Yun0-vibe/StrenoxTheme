import http from '@/api/http';

export interface YETIMCAnnouncement {
    id: number;
    title: string;
    content: string;
    priority: 'info' | 'warning' | 'critical';
    tag: string | null;
    date: string;
}

export interface YETIMCTicket {
    id: number;
    subject: string;
    status: 'open' | 'answered' | 'closed';
    priority: 'low' | 'medium' | 'high';
    date: string;
}

export interface YETIMCTicketMessage {
    id: number;
    message: string;
    // eslint-disable-next-line camelcase
    is_staff: boolean;
    mine: boolean;
    date: string;
}

export interface YETIMCTicketDetail extends YETIMCTicket {
    messages: YETIMCTicketMessage[];
}

function unwrap<T>(data: unknown): T {
    if (data && typeof data === 'object' && 'data' in (data as Record<string, unknown>)) {
        return (data as Record<string, unknown>).data as T;
    }
    return data as T;
}

export function getYETIMCAnnouncements(): Promise<YETIMCAnnouncement[]> {
    return http
        .get('/api/client/account/YETIMC/announcements')
        .then(({ data }) => unwrap<YETIMCAnnouncement[]>(data));
}

export interface YETIMCOverview {
    open_tickets: number;
    announcements: number;
}

export function getOverview(): Promise<YETIMCOverview> {
    return http
        .get('/api/client/account/YETIMC/overview')
        .then(({ data }) => unwrap<YETIMCOverview>(data));
}

export function createYETIMCOrder(plan: string): Promise<{ id: number; plan: string }> {
    return http
        .post('/api/client/account/YETIMC/store/orders', { plan })
        .then(({ data }) => unwrap<{ id: number; plan: string }>(data));
}

export interface YETIMCOrder {
    id: number;
    plan: string;
    amount: string;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
}

export function getYETIMCOrders(): Promise<YETIMCOrder[]> {
    return http
        .get('/api/client/account/YETIMC/store/orders')
        .then(({ data }) => unwrap<YETIMCOrder[]>(data));
}

export function getYETIMCTickets(): Promise<YETIMCTicket[]> {
    return http.get('/api/client/account/YETIMC/tickets').then(({ data }) => unwrap<YETIMCTicket[]>(data));
}

export interface YETIMCTicketAdmin extends YETIMCTicket {
    // eslint-disable-next-line camelcase
    user_name: string | null;
    // eslint-disable-next-line camelcase
    user_email: string | null;
}

export function getAllYETIMCTickets(): Promise<YETIMCTicketAdmin[]> {
    return http
        .get('/api/client/account/YETIMC/tickets/all')
        .then(({ data }) => unwrap<YETIMCTicketAdmin[]>(data));
}

export function createYETIMCTicket(subject: string, priority: string, message: string): Promise<YETIMCTicket> {
    return http
        .post('/api/client/account/YETIMC/tickets', { subject, priority, message })
        .then(({ data }) => unwrap<YETIMCTicket>(data));
}

export function getYETIMCTicket(id: number): Promise<YETIMCTicketDetail> {
    return http
        .get(`/api/client/account/YETIMC/tickets/${id}`)
        .then(({ data }) => unwrap<YETIMCTicketDetail>(data));
}

export function replyYETIMCTicket(id: number, message: string): Promise<YETIMCTicketMessage> {
    return http
        .post(`/api/client/account/YETIMC/tickets/${id}/reply`, { message })
        .then(({ data }) => unwrap<YETIMCTicketMessage>(data));
}

export interface YETIMCDiscordStatus {
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

export function getDiscordStatus(): Promise<YETIMCDiscordStatus> {
    return http
        .get('/api/client/account/YETIMC/discord')
        .then(({ data }) => unwrap<YETIMCDiscordStatus>(data));
}

export function updateDiscordPrefs(prefs: { notifications?: boolean; role_sync?: boolean }): Promise<{
    notifications: boolean;
    role_sync: boolean;
}> {
    return http
        .patch('/api/client/account/YETIMC/discord', prefs)
        .then(({ data }) => unwrap<{ notifications: boolean; role_sync: boolean }>(data));
}

export function unlinkDiscord(): Promise<void> {
    return http.delete('/api/client/account/YETIMC/discord').then(() => undefined);
}

export function getAvatarUrl(): Promise<string | null> {
    return http
        .get('/api/client/account/YETIMC/avatar')
        .then(({ data }) => unwrap<{ avatar_url: string | null }>(data).avatar_url);
}

export function uploadAvatar(file: File): Promise<string | null> {
    const form = new FormData();
    form.append('avatar', file);
    return http
        .post('/api/client/account/YETIMC/avatar', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => unwrap<{ avatar_url: string | null }>(data).avatar_url);
}

export function deleteAvatar(): Promise<void> {
    return http.delete('/api/client/account/YETIMC/avatar').then(() => undefined);
}
