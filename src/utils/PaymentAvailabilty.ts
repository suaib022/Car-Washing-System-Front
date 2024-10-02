import moment from "moment";
import { useState, useEffect } from "react";

function PaymentAvailability({ date, time, duration, due }) {
  const formattedDate = date.split("T")[0];
  const formattedTime = time;

  const targetDateTime = moment(
    `${formattedDate} ${formattedTime}`,
    "YYYY-MM-DD HH:mm"
  );
  const expirationDateTime = moment(targetDateTime).add(duration, "minutes");

  const [bookingStatus, setBookingStatus] = useState(getBookingStatus());

  function getBookingStatus() {
    const now = moment();
    const timeLeft = moment.duration(targetDateTime.diff(now));

    // Check if the service is ongoing or finished
    const expired = now.isSameOrAfter(expirationDateTime);

    // If the booking has expired
    if (expired) {
      return due === "paid" ? "Completed" : "Canceled";
    }

    // If less than 1 hour is left and due is not paid, cancel the booking
    if (timeLeft.asHours() < 1 && due !== "paid") {
      return "Canceled";
    }

    // If service hasn't started or is in progress, and due is paid
    return "Incomplete";
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBookingStatus(getBookingStatus());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date, time, duration, due]);

  return bookingStatus;
}

export default PaymentAvailability;
