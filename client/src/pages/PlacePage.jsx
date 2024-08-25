import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Added state for selected photo

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      try {
        const response = await axios.get(`api/places/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!place)
    return <div className="text-center mt-8">No place data available.</div>;

  return (
    <div className="mt-8 bg-gray-100 -mx-4 px-8 pt-8">
      <h1 className="text-3xl font-bold mb-4">{place.title}</h1>
      <a
        className="my-2 block font-semibold text-black-600 underline flex items-center gap-2"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-black-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span>{place.address}</span>
      </a>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place?.photos[0] && (
            <img
              className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
              src={"http://localhost:8000/uploads/" + place.photos[0]}
              alt="Main Photo"
              onClick={()=>setShowAllPhotos(true)}
            />
          )}
        </div>
        <div className="grid gap-4 grid-rows-2 relative">
          {place?.photos[1] && (
            <img
              className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
              src={"http://localhost:8000/uploads/" + place.photos[1]}
              alt="Photo 2"
              onClick={()=>setShowAllPhotos(true)}
            />
          )}
          <div className="relative">
            {place?.photos[2] && (
              <img
                className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                src={"http://localhost:8000/uploads/" + place.photos[2]}
                alt="Photo 3"
                onClick={()=>setShowAllPhotos(true)}
              />
            )}
            {place?.photos.length > 2 && (
              <button
                onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md flex gap-1 items-center text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                Show more Photos
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-2xl font-semibold mb-2">Place Description</h2>
            <p className="text-gray-700">{place.description}</p>
          </div>
          Check-in : {place.checkIn}
          <br />
          Check-out : {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}

        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Extra Info</h2>
      </div>
      <div className="mb-4 mt-2 text-sm text-gray-700 leading-8">{place.extraInfo}</div>

      </div>
          {showAllPhotos && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl max-h-screen p-4 md:p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="absolute top-4 right-4 p-3 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Photos of {place.title}
            </h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {place.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={"http://localhost:8000/uploads/" + photo}
                    alt={`Photo ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl max-h-screen p-4 md:p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-3 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex justify-center items-center h-full">
              <img
                className="max-w-full max-h-full object-contain cursor-pointer"
                src={"http://localhost:8000/uploads/" + selectedPhoto}
                alt="Selected Photo"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
