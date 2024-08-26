import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import PhotoModal from "../components/PhotoModal";
import AllPhotosModal from "../components/AllPhotosModal";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
      <AddressLink>{place.address}</AddressLink>

      <PlaceGallery place={place} setShowAllPhotos={setShowAllPhotos} />

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
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-8">
          {place.extraInfo}
        </div>
      </div>

      {showAllPhotos && (
        <AllPhotosModal
          place={place}
          onClose={() => setShowAllPhotos(false)}
          setSelectedPhoto={setSelectedPhoto}
        />
      )}

      {selectedPhoto && (
        <PhotoModal
          selectedPhoto={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}
