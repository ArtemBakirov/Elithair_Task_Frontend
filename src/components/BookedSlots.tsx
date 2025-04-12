import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Card,
} from '@mui/material';
import { TimeSlot } from '../types/types';

interface BookedSlotsProps {
  slots: TimeSlot[];
}

export const BookedSlots: React.FC<BookedSlotsProps> = ({ slots }) => {
  const bookedSlots = slots.filter(slot =>
    slot.isConsumable ? slot.bookings.length > 0 : slot.bookings.length > 0,
  );

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Booking Summary
      </Typography>
      {bookedSlots.length === 0 ? (
        <Typography>No slots booked yet</Typography>
      ) : (
        <List>
          {bookedSlots.map(slot => (
            <div key={slot._id}>
              <ListItem>
                <ListItemText
                  primary={`${slot.startTime} - ${slot.endTime} (${slot.isConsumable ? 'One-time' : 'Multi-booking'})`}
                  secondary={
                    slot.isConsumable
                      ? `Booked by: ${slot.bookings[0]?.name} (${slot.bookings[0]?.email})`
                      : `${slot.bookings.length} bookings`
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Card>
  );
};
