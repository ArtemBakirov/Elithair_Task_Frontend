import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { TimeSlotComponent } from './components/TimeSlot';
import { ReservationForm } from './components/ReservationForm';
import { BookedSlots } from './components/BookedSlots';
import axios from 'axios';
import { TimeSlot, ReservationData } from './types/types';

function App() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    slotsPerPage: 5,
    currentPeriod: 'morning' as 'morning' | 'afternoon',
  });

  // Filter slots by current period
  const currentPeriodSlots = slots.filter(
    slot => slot.period === pagination.currentPeriod,
  );

  // Get current slots for pagination
  const indexOfLastSlot = pagination.currentPage * pagination.slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - pagination.slotsPerPage;
  const currentSlots = currentPeriodSlots.slice(
    indexOfFirstSlot,
    indexOfLastSlot,
  );

  const changePeriod = (period: 'morning' | 'afternoon') => {
    setPagination({
      ...pagination,
      currentPeriod: period,
      currentPage: 1, // Reset to first page when changing period
    });
  };

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/slots');
        console.log('response', response.data);
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchSlots();
  }, []);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1) return;
    const totalPages = Math.ceil(slots.length / pagination.slotsPerPage);
    if (pageNumber > totalPages) return;
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handleSlotSelect = (slotId: string) => {
    console.log('on select', slotId);
    setSelectedSlotId(slotId);
    setIsFormOpen(true);
  };

  const handleReservationSubmit = async (data: ReservationData) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/reserve',
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
      {/* Period selector */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          variant={
            pagination.currentPeriod === 'morning' ? 'contained' : 'outlined'
          }
          onClick={() => changePeriod('morning')}
          sx={{ mr: 2 }}
        >
          Morning (10:00 AM - 3:00 PM)
        </Button>
        <Button
          variant={
            pagination.currentPeriod === 'afternoon' ? 'contained' : 'outlined'
          }
          onClick={() => changePeriod('afternoon')}
        >
          Afternoon (3:45 PM - 5:45 PM)
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom>
        Available Slots (
        {pagination.currentPeriod === 'morning'
          ? '10:00 AM - 3:00 PM'
          : '3:45 PM - 5:45 PM'}
        )
      </Typography>
      slots:
      {currentSlots.map(slot => (
        <TimeSlotComponent
          key={slot._id}
          slot={slot}
          onSelect={handleSlotSelect}
        />
      ))}
      {/* Pagination controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => paginate(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="body1" sx={{ mx: 2, alignSelf: 'center' }}>
          Page {pagination.currentPage} of{' '}
          {Math.ceil(currentPeriodSlots.length / pagination.slotsPerPage)}
        </Typography>
        <Button
          variant="contained"
          onClick={() => paginate(pagination.currentPage + 1)}
          disabled={
            pagination.currentPage ===
            Math.ceil(currentPeriodSlots.length / pagination.slotsPerPage)
          }
        >
          Next
        </Button>
      </Box>
      {/* Display current page info */}
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        Page {pagination.currentPage} of{' '}
        {Math.ceil(slots.length / pagination.slotsPerPage)}
      </Typography>
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
