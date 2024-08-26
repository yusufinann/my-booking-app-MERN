/* eslint-disable react/prop-types */
export default function PlaceImg({ place }) {
    return place.photos && place.photos.length > 0 ? (
      <img
        src={"http://localhost:8000/uploads/" + place.photos[0]}
        alt={place.title}
        className="w-full h-48 object-cover rounded-lg"
      />
    ) : (
      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
        No Image Available
      </div>
    );
  }
  