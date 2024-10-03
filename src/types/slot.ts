export const BOOKING_STATUS = {
  available: "available",
  booked: "booked",
  canceled: "canceled",
};

export type TBookingStatus = keyof typeof BOOKING_STATUS;

export const BookingStatus: TBookingStatus[] = [
  "available",
  "booked",
  "canceled",
];

import { TService } from "./service";

export type TSlot = {
  service: TService;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked?: TBookingStatus;
};
