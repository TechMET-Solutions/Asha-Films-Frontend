import React from 'react'
import { FaChevronLeft } from 'react-icons/fa';

const photos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Trisha_Krishnan_at_PS1_pre_release_event_%283%29_%28cropped%29.jpg/250px-Trisha_Krishnan_at_PS1_pre_release_event_%283%29_%28cropped%29.jpg",
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8TPALgQwrzJeNiQuSINwNORWsKp2O_QJ1fpMRNFL1v5w9QId_Rz2AwWVLMLqNnpi4tv_PEkpBqGyWyPghgm-KzQ",
    "https://static.toiimg.com/thumb/msid-120641325,width-1280,height-720,imgsize-35830,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    "https://media.themoviedb.org/t/p/w500/jfeAV0VeAQhKONzIv1UEYbklJGn.jpg",
    "https://www.ottplay.com/web-stories/10-impressive-roles-of-trisha-krishnan/",
];

function ApplicantPhotoGallery() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
                <button
                    // onClick={() => navigate(-1)}
                    className="flex items-center text-primary hover:text-shadow-primary font-semibold text-lg sm:text-xl"
                >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Trisha Krishnan
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((src, index) => (
                    <div key={index} className="overflow-hidden shadow-md">
                        <img
                            src={src}
                            alt={`Trisha Krishnan ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ApplicantPhotoGallery