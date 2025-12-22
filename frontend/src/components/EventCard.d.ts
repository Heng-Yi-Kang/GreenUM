import React from 'react';
interface EventCardProps {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
}
declare const EventCard: React.FC<EventCardProps>;
export default EventCard;
