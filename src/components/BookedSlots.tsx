import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { TimeSlot } from '../types/types';

interface BookedSlotsProps {
  slots: TimeSlot[];
}

export const BookedSlots: React.FC<BookedSlotsProps> = ({ slots }) => {
  const bookedSlots = slots.filter(slot => slot.isBooked);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Booked Slots
      </Typography>
      {bookedSlots.length === 0 ? (
        <Typography>No slots booked yet</Typography>
      ) : (
        <List>
          {bookedSlots.map(slot => (
            <ListItem key={slot.id}>
              <ListItemText
                primary={`${slot.startTime} - ${slot.endTime}`}
                secondary={`Booked by: ${slot.bookedBy?.name} (${slot.bookedBy?.email})`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
