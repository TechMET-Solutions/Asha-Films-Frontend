

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API } from '../../api';

// const FeaturedArtist = ({featuredArtists}) => {
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         const response = await axios.get(`${API}/api/content/artists`); // Adjust the API endpoint if needed
//         setArtists(response.data.data);
//       } catch (err) {
//         console.error('Error fetching artists:', err);
//         setError('Failed to load featured artists');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArtists();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-8">Loading featured artists...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   }

//   if (artists.length === 0) {
//     return <div className="text-center py-8">No featured artists available</div>;
//   }

//   return (
//     <div className="text-center featured-artist-container px-4 sm:px-6 md:px-8">
//       <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
//         Featured artist by 1on1 screen
//       </h2>

//       <Swiper
//         className="mySwiper featured-artist-swiper"
//         modules={[Pagination, EffectCoverflow, Autoplay]}
//         effect="coverflow"
//         grabCursor={true}
//         centeredSlides={true}
//         loop={true}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: 0,
//           depth: 100,
//           modifier: 2.5,
//           slideShadows: true,
//         }}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//           },
//           640: {
//             slidesPerView: 1.5,
//           },
//           768: {
//             slidesPerView: 2,
//           },
//         }}
//       >
//         {artists.map((artist) => (
//           <SwiperSlide key={artist.id}>
//             <div className="relative w-full h-60 sm:h-72 md:h-80 flex items-center justify-center">
//               <img
//                 src={artist.image}
//                 alt={`Featured Artist ${artist.id}`}
//                 className="w-full h-full object-cover rounded-xl"
//                 loading="lazy"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default FeaturedArtist;

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const FeaturedArtist = ({ featuredArtists = [] }) => {
  if (featuredArtists.length === 0) {
    return (
      <div className="text-center py-8">No featured artists available</div>
    );
  }

  return (
    <div className="text-center featured-artist-container px-4 sm:px-6 md:px-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
        Featured artist by 1on1 screen
      </h2>
      <div className="w-[424px] h-[227px] mb-[100px]">
         <Swiper
        className="mySwiper featured-artist-swiper"
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {featuredArtists.map((artist, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-60 sm:h-72 md:h-80 flex items-center justify-center">
              <img
                src={artist.image}
                alt={`Featured Artist ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
</div>
     
    </div>
  );
};

export default FeaturedArtist;
