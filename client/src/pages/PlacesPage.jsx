import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import {useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    // Kullanıcının yerlerini almak için API çağrısı
    axios.get("api/user-places", { withCredentials: true })
      .then(({ data }) => {
        console.log("Fetched places:", data.places); // Verileri konsola yazdır
        setPlaces(data.places);  // Backend'den gelen "places" verisini set ediyoruz
     })
      .catch((err) => {
        console.error("Failed to fetch places:", err);
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-semibold">List of all added places</h1>
        {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {places.map((place) => (
              <div key={place._id} className="border p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold">{place.title}</h2>
                <p className="text-sm text-gray-600">{place.address}</p>
                <div className="mt-2">
                  {place.photos && place.photos.length > 0 ? (
                    <img
                      src={"http://localhost:8000/uploads/"+place.photos[0]}
                      alt={place.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      No Image Available
                    </div>
                  )}
                </div>
                <Link to={`/account/places/${place._id}`} className="block mt-4 text-primary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No places added yet.</p>
        )}
      </div>
    </div>
  );
}
