// import React from "react";
// import { IoIosArrowDown } from "react-icons/io";

// const selectId = "category-selector";

// function CategorySelector({ options, selected, onChange, label = "" }) {
//   return (
//     <div className="min-w-80 max-w-md border-2 border-primary flex flex-wrap sm:flex-nowrap items-center gap-2 p-1 sm:p-1">
//       {/* Label */}
//       {label && (
//         <label
//           htmlFor={selectId}
//           className="block font-bold pl-2 text-sm sm:text-base md:text-lg text-gray-700"
//         >
//           {label} :
//         </label>
//       )}

//       {/* Select Dropdown */}
//       <div className="relative flex-1">
//         <select
//           id={selectId}
//           value={selected}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-56 px-3 py-2 sm:py-2.5 font-semibold text-sm sm:text-base md:text-lg text-gray-700 appearance-none 
//                      focus:outline-none focus:ring-0 border-0"
//         >
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>

//         {/* Custom Dropdown Arrow */}
//         <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//           <IoIosArrowDown />
//         </span>
//       </div>
//     </div>
//   );
// }

// export default CategorySelector;


import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const selectId = "category-selector";

function CategorySelector({ options, selected, onChange, label = "" }) {
  return (
    <div className="w-full max-w-md border-2 border-primary rounded-lg flex flex-wrap sm:flex-nowrap items-center gap-2 p-2 sm:p-3">
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className="block font-bold text-sm sm:text-base md:text-lg text-gray-700"
        >
          {label} :
        </label>
      )}

      {/* Select Dropdown */}
      <div className="relative flex-1 min-w-[200px]">
        <select
          id={selectId}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 sm:py-2.5 rounded-md font-semibold 
                     text-sm sm:text-base md:text-lg text-gray-700 
                     appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow */}
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <IoIosArrowDown className="text-gray-600" />
        </span>
      </div>
    </div>
  );
}

export default CategorySelector;
