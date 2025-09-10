// import React from 'react';

// const RadioGroup = ({ label, name, options, value, onChange }) => {
//     return (
//         <div>
//             <div className="text-lg font-semibold text-primary mt-10 mb-6">{label}</div>
//             <div className="flex space-x-6">
//                 {options.map((option, index) => (
//                     <label key={index} className="inline-flex items-center space-x-2">
//                         <input
//                             type="radio"
//                             name={name}
//                             value={option}
//                             checked={value === option}
//                             onChange={onChange}
//                             className="form-radio h-5 w-5 text-purple-600"
//                         />
//                         <span>{option}</span>
//                     </label>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RadioGroup;


import React from "react";

const RadioGroup = ({ label, name, options, value, onChange }) => {
  return (
    <div className="flex items-center space-x-6 mt-6 mb-6">
      {/* Label */}
      <div className="text-lg font-semibold text-primary">{label}</div>

      {/* Options */}
      <div className="flex space-x-6">
        {options.map((option, index) => (
          <label
            key={index}
            className="inline-flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="form-radio h-5 w-5 text-purple-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
