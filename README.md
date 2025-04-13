
<img src="https://elithairtransplant.com/german/wp-content/uploads/2024/03/elithair-logo-primary.svg" width="300" alt="Description"> 

# Task Assignment
## Virtual Meeting Slot Reservation System - Frontend

## Overview
React/TypeScript frontend for a meeting slot reservation system with consumable/non-consumable time slots.

## Technical Stack
- React 19 with TypeScript
- Vite build tool
- Material-UI (MUI) components
- Axios for API communication
- React Hook Form for form handling

## Key Features
- Displays time slots from 10:00 AM - 3:00 PM and 3:45 PM - 5:45 PM
- Supports two slot types:
    - **Consumable**: Can only be booked once
    - **Non-consumable**: Can be booked multiple times (with count display)
- Responsive layout with flexbox
- Pagination (5 slots per page for better UX)

## Architecture Decisions

### 1. State Management
- Used React's built-in state management (`useState`, `useEffect`)
- Chosen for simplicity as the app doesn't require complex state
- All state logic is contained in `App.tsx` since the app is not that complex

### 2. Components:

```plaintext
components/
├── TimeSlot.tsx        - Individual slot display
├── ReservationForm.tsx - Booking form modal
└── BookedSlots.tsx     - Summary of booked slots
```

### 3. UI/UX Decisions
- Sticky section with booked slots on desktop for better navigation
- Responsive layout with flexbox
- Clear visual distinction between slot types
