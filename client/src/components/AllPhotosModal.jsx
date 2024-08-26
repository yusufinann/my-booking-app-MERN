/* eslint-disable react/prop-types */
export default function AllPhotosModal({ place, onClose, setSelectedPhoto }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-5xl max-h-screen p-4 md:p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
        <button
          onClick={onClose}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-2xl font-semibold mb-4 text-center">Photos of {place.title}</h3>
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
  );
}
