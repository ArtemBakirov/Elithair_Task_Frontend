export interface Booking {
  name: string;
  email: string;
  bookedAt: string;
}

export interface TimeSlot {
  _id: string;
  startTime: string;
  endTime: string;
  isConsumable: boolean;
  bookings: Booking[];
  maxBookings?: number;
  period: 'morning' | 'afternoon';
}

export interface ReservationData {
  name: string;
  email: string;
  slotId: string;
}

export interface PaginationState {
  currentPage: number;
  slotsPerPage: number;
  currentPeriod: 'morning' | 'afternoon';
}
