import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/all-places')
      .then(response => {
        setPlaces(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching places:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {places.length > 0 && places.map(place => (
            <Link 
              to={'/place/' + place._id} 
              key={place._id} 
              className="transform transition duration-300 ease-in-out hover:scale-105"
            >
              <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden">
                {place.photos && place.photos.length > 0 ? (
                  <img
                    className="object-cover w-full h-48"
                    src={`http://localhost:8000/uploads/${place.photos?.[0]}`}
                    alt={place.title}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-gray-800 truncate">{place.address}</h2>
                  <h3 className="text-sm text-gray-500 mt-1 truncate">{place.title}</h3>
                  <div className="mt-2">
                    <span className="font-bold text-primary">${place.price}</span>
                    <span className="text-gray-600 text-sm"> per night</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
