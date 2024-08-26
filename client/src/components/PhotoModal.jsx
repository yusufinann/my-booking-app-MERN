/* eslint-disable react/prop-types */
export default function PhotoModal({ selectedPhoto, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl max-h-screen p-4 md:p-6 bg-white rounded-lg shadow-lg">
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
        <div className="flex justify-center items-center h-full">
          <img
            className="max-w-full max-h-full object-contain cursor-pointer"
            src={"http://localhost:8000/uploads/" + selectedPhoto}
            alt="Selected Photo"
          />
        </div>
      </div>
    </div>
  );
}
