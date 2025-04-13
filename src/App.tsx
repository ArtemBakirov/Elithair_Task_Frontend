import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { TimeSlotComponent } from './components/TimeSlot';
import { ReservationForm } from './components/ReservationForm';
import { BookedSlots } from './components/BookedSlots';
import axios from 'axios';
import { TimeSlot, ReservationData, PaginationState } from './types/types';

/* custom css styles */
import './Index.css';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    slotsPerPage: 5,
    currentPeriod: 'morning' as 'morning' | 'afternoon',
  });

  // Filter slots by current period
  const currentPeriodSlots = Array.isArray(slots)
    ? slots.filter(slot => slot?.period === pagination.currentPeriod)
    : [];

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
        const response = await axios.get<TimeSlot[]>(
          `${import.meta.env.VITE_BACKEND_PRODUCTION_BASE_URL}/slots`,
        );

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
    setSelectedSlotId(slotId);
    setIsFormOpen(true);
  };

  const handleReservationSubmit = async (data: ReservationData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PRODUCTION_BASE_URL}/reserve`,
        data,
      );
      setSlots(response.data);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error reserving slot:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 'medium',
          color: theme.palette.primary.main,
        }}
        variant="h4"
        gutterBottom
      >
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: 4,
          alignItems: 'flex-start',
        }}
      >
        {/* Slots column */}
        <Box
          sx={{
            flex: isSmallScreen ? 'none' : 1,
            width: isSmallScreen ? '100%' : 'auto',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Available Slots (
            {pagination.currentPeriod === 'morning'
              ? '10:00 AM - 3:00 PM'
              : '3:45 PM - 5:45 PM'}
            )
          </Typography>
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
        </Box>
        <Box
          sx={{
            mb: 6,
            flex: isSmallScreen ? 'none' : '0 0 350px',
            width: isSmallScreen ? '100%' : '350px',
            position: isSmallScreen ? 'static' : 'sticky',
            top: 20,
            alignSelf: 'flex-start',
          }}
        >
          <BookedSlots slots={slots} />
        </Box>
      </Box>

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
