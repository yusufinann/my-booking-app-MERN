import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

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
    try {
      const response = await axios.post(
        '/api/bookings', 
        {
          checkIn,
          checkOut,
          numberOfGuests,
          name,
          phone,
          place: place._id,  // Ensure place object is populated
          price: numberOfNights * place.price,  // Ensure numberOfNights and place.price are calculated correctly
        },
        { withCredentials: true }  // Ensure cookies (token) are sent
      );
  
      // Redirect to the booking details page using the new booking ID
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking place:", error);
      // Handle error (e.g., show error message to user)
    }
  }
  
  if (redirect) {
    return <Navigate to={redirect} />
  }
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check-in : </label>
              <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
            </div>
            <div className=" py-3 px-4 border-l">
              <label>Check-out : </label>
              <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} />
            </div>
          </div>
          <div className=" py-3 px-4 border-l">
            <label>number of guests </label>
            <input type="number" value={numberOfGuests} onChange={(e)=>setNumberOfGuests(e.target.value)} />
          </div>
          {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
        )}
        </div>

        <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
      </div>
    );
}