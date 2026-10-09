import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLifeRing,
    faPlus,
    faClock,
    faChevronRight,
    faPaperPlane,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import ContentBox from '@/components/elements/ContentBox';
import Spinner from '@/components/elements/Spinner';
import {
    getStrenoxTickets,
    createStrenoxTicket,
    getStrenoxTicket,
    replyStrenoxTicket,
    StrenoxTicket,
    StrenoxTicketDetail,
} from '@/api/strenox';

const TicketRow = styled.div`
    ${tw`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-150`};
    background: linear-gradient(135deg, rgba(30, 21, 53, 0.6) 0%, rgba(22, 22, 31, 0.9) 100%);
    border: 1px solid rgba(145, 35, 215, 0.22);
    box-shadow: 0 0 16px rgba(145, 35, 215, 0.08);

    &:hover {
        border-color: #9123d7;
        box-shadow: 0 0 22px rgba(145, 35, 215, 0.2);
    }
`;

const StatusBadge = styled.span<{ status: string }>`
    ${tw`px-2 py-0.5 rounded text-xs font-semibold`};
    background: ${(props) =>
        props.status === 'open' ? '#22C55E20' : props.status === 'answered' ? '#9123D720' : '#8888A820'};
    color: ${(props) =>
        props.status === 'open' ? '#22C55E' : props.status === 'answered' ? '#9123D7' : '#8888A8'};
`;

const PriorityBadge = styled.span<{ priority: string }>`
    ${tw`px-2 py-0.5 rounded text-xs font-semibold`};
    background: ${(props) =>
        props.priority === 'high' ? '#EF444420' : props.priority === 'medium' ? '#F59E0B20' : '#3B82F620'};
    color: ${(props) =>
        props.priority === 'high' ? '#EF4444' : props.priority === 'medium' ? '#F59E0B' : '#3B82F6'};
`;

const Input = styled.input`
    ${tw`w-full rounded-lg px-4 py-2.5 text-sm transition-all duration-200`};
    background: #16161F;
    border: 1px solid #2A2A3A;
    color: #E2E2F0;

    &:focus {
        outline: none;
        border-color: #9123D7;
        box-shadow: 0 0 0 3px rgba(145, 35, 215, 0.15);
    }
`;

const TextArea = styled.textarea`
    ${tw`w-full rounded-lg px-4 py-2.5 text-sm transition-all duration-200`};
    background: #16161F;
    border: 1px solid #2A2A3A;
    color: #E2E2F0;
    min-height: 100px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #9123D7;
        box-shadow: 0 0 0 3px rgba(145, 35, 215, 0.15);
    }
`;

const Select = styled.select`
    ${tw`rounded-lg px-4 py-2.5 text-sm transition-all duration-200`};
    background: #16161F;
    border: 1px solid #2A2A3A;
    color: #E2E2F0;

    &:focus {
        outline: none;
        border-color: #9123D7;
    }
`;

const SubmitButton = styled.button`
    ${tw`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 flex items-center gap-2`};
    background: linear-gradient(135deg, #9123D7 0%, #7C3AED 100%);
    color: white;
    border: none;

    &:hover:not(:disabled) {
        box-shadow: 0 0 20px rgba(145, 35, 215, 0.35);
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
    }
`;

const MessageBubble = styled.div<{ staff: boolean }>`
    ${tw`rounded-lg p-3 text-sm max-w-[85%]`};
    background: ${(props) => (props.staff ? 'rgba(145,35,215,0.12)' : '#16161F')};
    border: 1px solid ${(props) => (props.staff ? '#9123D7' : '#2A2A3A')};
    color: #E2E2F0;
    align-self: ${(props) => (props.staff ? 'flex-start' : 'flex-end')};
`;

export default function SupportTickets() {
    const [tickets, setTickets] = useState<StrenoxTicket[] | null>(null);
    const [selected, setSelected] = useState<StrenoxTicketDetail | null>(null);
    const [showNew, setShowNew] = useState(false);
    const [subject, setSubject] = useState('');
    const [priority, setPriority] = useState('medium');
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getStrenoxTickets()
            .then(setTickets)
            .catch(() => setTickets([]));
    }, []);

    const openTicket = (id: number) => {
        getStrenoxTicket(id)
            .then(setSelected)
            .catch(() => setSelected(null));
    };

    const submitNew = () => {
        if (!subject.trim() || !message.trim()) return;
        setSaving(true);
        createStrenoxTicket(subject.trim(), priority, message.trim())
            .then((ticket) => {
                setTickets((prev) => (prev ? [ticket, ...prev] : [ticket]));
                setSubject('');
                setMessage('');
                setPriority('medium');
                setShowNew(false);
            })
            .catch(() => undefined)
            .finally(() => setSaving(false));
    };

    const submitReply = () => {
        if (!selected || !reply.trim()) return;
        setSaving(true);
        replyStrenoxTicket(selected.id, reply.trim())
            .then((msg) => {
                setSelected((prev) =>
                    prev ? { ...prev, messages: [...prev.messages, msg] } : prev
                );
                setReply('');
            })
            .catch(() => undefined)
            .finally(() => setSaving(false));
    };

    return (
        <div className={'strenox-page'} css={tw`max-w-4xl mx-auto px-4 py-8`}>
            <div css={tw`mb-8 flex items-center justify-between`}>
                <div>
                    <h1 css={tw`text-3xl font-bold text-neutral-100 mb-2`}>Support Tickets</h1>
                    <p css={tw`text-neutral-400`}>Get help from the StrenoxCloud team</p>
                </div>
                <SubmitButton onClick={() => setShowNew(!showNew)}>
                    <FontAwesomeIcon icon={showNew ? faTimes : faPlus} />
                    {showNew ? 'Cancel' : 'New Ticket'}
                </SubmitButton>
            </div>

            {showNew && (
                <ContentBox title={'Create Ticket'} css={tw`mb-6`}>
                    <div css={tw`space-y-4`}>
                        <div css={tw`flex flex-col sm:flex-row gap-4`}>
                            <Input
                                placeholder={'Subject'}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                css={tw`flex-1`}
                            />
                            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value={'low'}>Low</option>
                                <option value={'medium'}>Medium</option>
                                <option value={'high'}>High</option>
                            </Select>
                        </div>
                        <TextArea
                            placeholder={'Describe your issue...'}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <SubmitButton onClick={submitNew} disabled={saving}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            {saving ? 'Submitting...' : 'Submit Ticket'}
                        </SubmitButton>
                    </div>
                </ContentBox>
            )}

            <div css={tw`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                <ContentBox title={'Your Tickets'}>
                    {tickets === null ? (
                        <Spinner centered />
                    ) : tickets.length === 0 ? (
                        <p css={tw`text-neutral-400 text-sm text-center py-8`}>
                            No tickets yet. Open one and we will help you out.
                        </p>
                    ) : (
                        <div css={tw`space-y-3`}>
                            {tickets.map((ticket) => (
                                <TicketRow key={ticket.id} onClick={() => openTicket(ticket.id)}>
                                    <FontAwesomeIcon icon={faLifeRing} css={tw`text-[#9123D7]`} />
                                    <div css={tw`flex-1 min-w-0`}>
                                        <div css={tw`text-sm font-medium text-neutral-100 truncate`}>
                                            #{ticket.id} — {ticket.subject}
                                        </div>
                                        <div css={tw`text-xs text-neutral-400 flex items-center gap-1 mt-1`}>
                                            <FontAwesomeIcon icon={faClock} />
                                            {ticket.date}
                                        </div>
                                    </div>
                                    <div css={tw`flex flex-col gap-1 items-end`}>
                                        <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                                        <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronRight} css={tw`text-neutral-500 text-xs`} />
                                </TicketRow>
                            ))}
                        </div>
                    )}
                </ContentBox>

                <ContentBox title={selected ? 'Ticket #' + selected.id : 'Conversation'}>
                    {!selected ? (
                        <p css={tw`text-neutral-400 text-sm text-center py-8`}>
                            Select a ticket to view the conversation.
                        </p>
                    ) : (
                        <div css={tw`flex flex-col gap-3`}>
                            <div css={tw`flex gap-2 mb-2`}>
                                <StatusBadge status={selected.status}>{selected.status}</StatusBadge>
                                <PriorityBadge priority={selected.priority}>{selected.priority}</PriorityBadge>
                            </div>
                            {selected.messages.map((msg) => (
                                <MessageBubble key={msg.id} staff={msg.is_staff}>
                                    {msg.is_staff && (
                                        <div css={tw`text-xs font-semibold text-[#9123D7] mb-1`}>
                                            StrenoxCloud Staff
                                        </div>
                                    )}
                                    <div>{msg.message}</div>
                                    <div css={tw`text-xs text-neutral-500 mt-1`}>{msg.date}</div>
                                </MessageBubble>
                            ))}
                            {selected.status !== 'closed' && (
                                <div css={tw`flex gap-2 mt-2`}>
                                    <Input
                                        placeholder={'Write a reply...'}
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        css={tw`flex-1`}
                                    />
                                    <SubmitButton onClick={submitReply} disabled={saving}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </SubmitButton>
                                </div>
                            )}
                        </div>
                    )}
                </ContentBox>
            </div>
        </div>
    );
}
