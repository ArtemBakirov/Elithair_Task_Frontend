import React from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { ReservationData } from '../types/types';

interface ReservationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReservationData) => void;
  slotId: string;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  open,
  onClose,
  onSubmit,
  slotId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<ReservationData, 'slotId'>>();

  const handleFormSubmit = (data: Omit<ReservationData, 'slotId'>) => {
    onSubmit({ ...data, slotId });
  };

  const StyledTextField = styled(TextField)({
    '& input:-webkit-autofill': {
      transition: 'background-color 600000s 0s, color 600000s 0s',
    },
    '& input:-webkit-autofill:focus': {
      transition: 'background-color 600000s 0s, color 600000s 0s',
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Time Slot</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <StyledTextField
            margin="dense"
            label="Name"
            fullWidth
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <StyledTextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Book Slot
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
