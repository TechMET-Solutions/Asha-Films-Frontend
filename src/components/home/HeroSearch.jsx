import { FaSearch } from "react-icons/fa";
import Confetti from "../../assets/images/Confetti.png";

const HeroSection = ({ birthdayArtists = [] }) => {
  // Take the first artist (if available)
  const artist = birthdayArtists.length > 0 ? birthdayArtists[0] : null;

  return (
    <div className="w-full text-center px-2 sm:px-4">
      {/* 🔍 Hero Search */}
      <h1 className="text-xl sm:text-2xl md:text-2xl font-bold mb-3 sm:mb-4">
        Find the perfect face for your project...
      </h1>

      <div className="flex justify-start items-center w-full max-w-md mx-auto bg-white rounded-xl shadow-md px-4 py-3">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow bg-transparent outline-none text-sm"
        />
        <FaSearch className="text-black" />
      </div>

      <div className="flex flex-wrap justify-start sm:justify-start gap-2 ml-9 mt-3 sm:mt-4 text-xs sm:text-sm text-primary font-medium">
        <button className="px-2 py-1">Age</button>
        <button className="px-2 py-1">Gender</button>
        <button className="px-2 py-1">Advance Filter</button>
      </div>

      {/* 🎉 Celebrating Talent Card */}
      {artist && (
        <div
          className="
            mt-14 bg-pink-100 rounded-xl p-6 sm:p-8 md:p-10 text-center shadow-md mx-auto 
            w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
            lg:w-[379px] lg:h-[389px]
          "
          style={{
            backgroundImage: `url(${Confetti})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "contain",
          }}
        >
          <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-primary mb-2 sm:mb-4">
            Celebrating talent today!
          </h3>

          <img
            src={artist.image}
            alt={artist.name}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full mx-auto mb-3 object-cover"
          />

          <h4 className="font-bold text-base sm:text-lg md:text-xl text-primary mb-1">
            {artist.name}
          </h4>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 px-2 sm:px-4 py-3">
            "Wishing you all health, wealth, and prosperity in your life."
          </p>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
