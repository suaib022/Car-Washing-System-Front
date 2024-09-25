import moment from "moment";
import { useState, useEffect } from "react";

function CountdownTimer({ date, time, duration }) {
  const formattedDate = date.split("T")[0];
  const formattedTime = time;

  const targetDateTime = moment(
    `${formattedDate} ${formattedTime}`,
    "YYYY-MM-DD HH:mm"
  );
  const expirationDateTime = moment(targetDateTime).add(duration, "minutes");

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = moment();
    const serviceInProgress =
      now.isSameOrAfter(targetDateTime) && now.isBefore(expirationDateTime);
    const expired = now.isSameOrAfter(expirationDateTime);

    if (expired) {
      return "Completed";
    }

    if (serviceInProgress) {
      return "Ongoing";
    }

    const duration = moment.duration(targetDateTime.diff(now));

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {typeof timeLeft === "string" ? (
        <p
          className={`${timeLeft === "Ongoing" && "text-green-600"} ${
            timeLeft === "Completed" && "text-orange-600"
          } font-bold`}
        >
          {timeLeft}
          {timeLeft === "Ongoing" && "..."}
        </p>
      ) : (
        <p className="font-bold">
          {timeLeft.days > 0 && `${timeLeft.days} Days `}
          {timeLeft.hours > 0 && `${timeLeft.hours} Hours `}
          {timeLeft.minutes > 0 && `${timeLeft.minutes} Minutes `}
          {timeLeft.seconds > 0 && `${timeLeft.seconds} Seconds`}
        </p>
      )}
    </div>
  );
}

export default CountdownTimer;
