import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await axios.post(
        '/api/bookings', 
        {
          checkIn,
          checkOut,
          numberOfGuests,
          name,
          phone,
          place: place._id,  
          price: numberOfNights * place.price,
        },
        { withCredentials: true } 
      );
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking place:", error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check-in :</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check-out :</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
        </div>
        <div className="py-3 px-4 border-l">
          <label>Number of guests :</label>
          <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
            <label>Phone number:</label>
            <input type="tel" value={phone} onChange={(ev) => setPhone(ev.target.value)} />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>

      {/* Modal for Login/Sign-up Prompt */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl mb-4">Please log in to continue</h2>
            <p className="mb-4">You need to be logged in to complete the booking process.</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="btn bg-blue-500 text-white px-4 py-2 rounded-full">
                Log In
              </Link>
              <Link to="/register" className="btn bg-green-500 text-white px-4 py-2 rounded-full">
                Register Now
              </Link>
            </div>
            <button onClick={() => setShowLoginModal(false)} className="mt-4 text-gray-500 underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
