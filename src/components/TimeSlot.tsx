import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { TimeSlot } from '../types/types';

interface TimeSlotProps {
  slot: TimeSlot;
  onSelect: (slotId: string) => void;
}

export const TimeSlotComponent: React.FC<TimeSlotProps> = ({
  slot,
  onSelect,
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {slot.startTime} - {slot.endTime}
        </Typography>
        <Typography color={slot.isBooked ? 'error' : 'success'}>
          {slot.isBooked ? 'Booked' : 'Available'}
        </Typography>
        {slot.isBooked && slot.bookedBy && (
          <Typography>
            Booked by: {slot.bookedBy.name} ({slot.bookedBy.email})
          </Typography>
        )}
        {!slot.isBooked && (
          <Button variant="contained" onClick={() => onSelect(slot.id)}>
            Book Slot
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
