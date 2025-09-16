// import { useNavigate } from "react-router-dom";
// import { icons } from "../../assets";

// const LoginButtons = () => {

//   const navigate = useNavigate();

//   const handleUser = () => {
//     navigate("/user/login")
//   }
//   const handleProduction = () => {
//     navigate("/production/login")
//   }

//   return (
//     <div className="flex flex-col gap-4 sm:gap-6">
//       <div className="bg-pink-100 rounded-xl p-4 text-center shadow-md h-58 max-w-xs mx-auto w-full">
//         <img
//           src={icons.talentlogin}
//           alt="Actor"
//           className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-2 object-cover"
//         />
//         <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-2">Talent Login</h4>
//         <button
//           onClick={handleUser}
//           className="border border-primary px-3 sm:px-4 py-1 rounded-md text-primary text-xs sm:text-sm">
//           Click to login
//         </button>
//       </div>

//       <div className="bg-pink-100 rounded-xl p-4 text-center shadow-md  h-58 max-w-xs mx-auto w-full">
//         <img
//           src={icons.clientlogin}
//           alt="Actor"
//           className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-2 object-cover"
//         />
//         <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-2">Client Login</h4>
//         <button
//           onClick={handleProduction}
//           className="border border-primary px-3 sm:px-4 py-1 rounded-md text-primary text-xs sm:text-sm">
//           Click to login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LoginButtons;


import { useNavigate } from "react-router-dom";
import { icons } from "../../assets";

const LoginButtons = () => {
  const navigate = useNavigate();

  const handleUser = () => {
    navigate("/user/login");
  };
  const handleProduction = () => {
    navigate("/production/login");
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 sm:gap-8 px-4">
      {/* Talent Login */}
      <div className="bg-[#8B3C681F] rounded-xl p-9 text-center shadow-md w-[240px] max-w-xs sm:max-w-sm md:max-w-md">
        <img
          src={icons.talentlogin}
          alt="Talent Login"
          className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 object-contain"
        />
        <h4 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg mb-3">
          Talent Login
        </h4>
        <button
          onClick={handleUser}
          className="border border-primary px-4 sm:px-6 py-2 rounded-md text-primary text-sm sm:text-base hover:bg-primary hover:text-white transition"
        >
          Click to login
        </button>
      </div>

      {/* Client Login */}
      <div className="bg-[#8B3C681F] rounded-xl p-9 text-center shadow-md w-[240px] max-w-xs sm:max-w-sm md:max-w-md">
        <img
          src={icons.clientlogin}
          alt="Client Login"
          className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 object-contain"
        />
        <h4 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg mb-3">
          Client Login
        </h4>
        <button
          onClick={handleProduction}
          className="border border-primary px-4 sm:px-6 py-2 rounded-md text-primary text-sm sm:text-base hover:bg-primary hover:text-white transition"
        >
          Click to login
        </button>
      </div>

      {/* 🎬 CINTAA Logo */}
      <div className="rounded-xl p-4 text-center mx-auto max-w-xs">
        <img
          src={icons.cintaa}
          alt="CINTAA"
          className="w-full max-w-[192px] object-contain mx-auto"
        />
      </div>
    </div>
  );
};

export default LoginButtons;
