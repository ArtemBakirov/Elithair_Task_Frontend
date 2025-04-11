export interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    bookedBy?: {
        name: string;
        email: string;
    };
}

export interface ReservationData {
    name: string;
    email: string;
    slotId: string;
}