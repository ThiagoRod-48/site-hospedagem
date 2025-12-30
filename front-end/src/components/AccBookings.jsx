import axios from "axios";
import { useEffect, useState } from "react";
import Booking from "./Booking";

const AccBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const axioGet = async () => {
      const { data } = await axios.get("/bookings/owner");
      setBookings(data);
    };

    axioGet();
  }, []);

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8">
      {bookings.map((booking) => (
        <Booking booking={booking} key={booking._id} />
      ))}
    </div>
  );
};

export default AccBookings;
