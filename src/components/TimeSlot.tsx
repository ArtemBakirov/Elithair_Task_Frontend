import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { TimeSlot } from '../types/types';

interface TimeSlotProps {
  slot: TimeSlot;
  onSelect: (slotId: string) => void;
  key: string;
}

export const TimeSlotComponent: React.FC<TimeSlotProps> = ({
  slot,
  onSelect,
  key,
}) => {
  const isBooked = slot.isConsumable
    ? slot.bookings.length > 0
    : slot.maxBookings
      ? slot.bookings.length >= slot.maxBookings
      : false;

  return (
    <Card key={key} variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            {slot.period === 'morning'
              ? 'Morning session'
              : 'Afternoon session'}
          </Typography>
          <Typography variant="h6">
            {slot.startTime} - {slot.endTime}
          </Typography>
          <Chip
            label={slot.isConsumable ? 'One-time slot' : 'Multi-booking slot'}
            color={slot.isConsumable ? 'primary' : 'secondary'}
            size="small"
          />
        </Box>

        {slot.isConsumable ? (
          <>
            <Typography color={isBooked ? 'error' : 'success'}>
              {isBooked ? 'Booked' : 'Available (1 place)'}
            </Typography>
            {isBooked && (
              <Typography variant="body2">
                Booked by: {slot.bookings[0].name} ({slot.bookings[0].email})
              </Typography>
            )}
          </>
        ) : (
          <>
            <Typography color={isBooked ? 'error' : 'success'}>
              {isBooked
                ? 'Fully booked'
                : `Available (${slot.maxBookings ? slot.maxBookings - slot.bookings.length : '∞'} places)`}
            </Typography>
            {slot.bookings.length > 0 && (
              <Typography variant="body2">
                {slot.bookings.length}{' '}
                {slot.bookings.length === 1 ? 'booking' : 'bookings'}
              </Typography>
            )}
          </>
        )}

        {!isBooked && (
          <Button
            variant="contained"
            onClick={() => onSelect(slot._id)}
            sx={{ mt: 1 }}
          >
            Book Slot
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
