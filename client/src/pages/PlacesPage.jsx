import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  useEffect(() => {
    // Kullanıcının yerlerini almak için API çağrısı
    axios.get("api/user-places", { withCredentials: true })
      .then(({ data }) => {
        console.log("Fetched places:", data.places); // Verileri konsola yazdır
        setPlaces(data.places);  // Backend'den gelen "places" verisini set ediyoruz
        setIsLoading(false);  // Veriler yüklendikten sonra loading'i false yapıyoruz
      })
      .catch((err) => {
        console.error("Failed to fetch places:", err);
        setIsLoading(false);  // Hata olsa da loading'i kapatıyoruz
      });
  }, []);

  return (
    <div>
      <div className="text-center mt-4">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-semibold">List of all added places</h1>
        {isLoading ? (  // Eğer loading aktifse, spinner gösterilir
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {places.map((place) => (
              <div key={place._id} className="border p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold">{place.title}</h2>
                <p className="text-sm text-gray-600">{place.address}</p>
                <div className="mt-2">
                 
                 <PlaceImg place={place}/>
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
