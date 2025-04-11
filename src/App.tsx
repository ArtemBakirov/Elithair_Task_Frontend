import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { TimeSlotComponent } from './components/TimeSlot';
import { ReservationForm } from './components/ReservationForm';
import { BookedSlots } from './components/BookedSlots';
import axios from 'axios';
import { TimeSlot, ReservationData } from './types/types';

function App() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/slots');
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchSlots();
  }, []);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    setIsFormOpen(true);
  };

  const handleReservationSubmit = async (data: ReservationData) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/reserve',
        data,
      );
      setSlots(response.data);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error reserving slot:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meeting Slot Reservation
      </Typography>
      <Typography variant="h5" gutterBottom>
        Available Slots (10:00 AM - 3:00 PM)
      </Typography>
      {slots.map(slot => (
        <TimeSlotComponent
          key={slot.id}
          slot={slot}
          onSelect={handleSlotSelect}
        />
      ))}
      <BookedSlots slots={slots} />
      <ReservationForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleReservationSubmit}
        slotId={selectedSlotId || ''}
      />
    </Container>
  );
}

export default App;
