/* eslint-disable react/prop-types */
export default function PlaceGallery({place,setShowAllPhotos}){
    return(
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
    )
}