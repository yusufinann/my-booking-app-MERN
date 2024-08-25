import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  useEffect(() => {
    // Fetch all places when the component mounts
    axios.get('/api/all-places')
      .then(response => {
        setPlaces(response.data); // Store the fetched places in state
        setIsLoading(false);  // Veriler yüklendiğinde loading'i false yapıyoruz
      })
      .catch(error => {
        console.error("Error fetching places:", error);
        setIsLoading(false);  // Hata olsa da loading'i kapatıyoruz
      });
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (  // Eğer loading aktifse, spinner gösterilir
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {places.length > 0 && places.map(place => (
            <Link 
              to={'/place/' + place._id} 
              key={place._id} 
              className="transform transition duration-300 hover:scale-105"
            >
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos && place.photos.length > 0 ? (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={`http://localhost:8000/uploads/${place.photos?.[0]}`}
                    alt={place.title}
                  />
                ) : (
                  <div className="w-full aspect-square rounded-2xl bg-gray-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold text-primary">${place.price}</span> per night
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
