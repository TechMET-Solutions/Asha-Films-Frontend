// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API } from "../../api";
// import { images } from "../../assets";
// import { Title } from "../../components/ui";

// const AboutUs = () => {
//   const [aboutUsHtml, setAboutUsHtml] = useState("");
//   const [leftImage, setLeftImage] = useState("");
//   const [rightImage, setRightImage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // ✅ Fetch About Us content
//         const aboutRes = await axios.get(`${API}/api/content/about`);
//         setAboutUsHtml(aboutRes.data.aboutUs.html);

//         // ✅ Fetch banners (assuming first = left, second = right)
//         const bannersRes = await axios.get(`${API}/api/content/banners`);
//         const banners = bannersRes.data.banners;

//         if (banners.length > 0) {
//           setLeftImage(banners[0].url); // first banner as left
//         }
//         if (banners.length > 1) {
//           setRightImage(banners[1].url); // second banner as right
//         }
//       } catch (err) {
//         console.error("Error fetching About Us data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="grid grid-cols-7 grid-rows-7 gap-0 p-6">
//       {/* Left Image - Hidden on small screens */}
//       <div className="hidden md:block col-span-2 row-span-7">
//         <img
//           src={leftImage}
//           alt="Left Decoration"
//           className="object-contain w-full h-full"
//         />
//       </div>

//       {/* Center Text Content */}
//       <div className="col-span-7 md:col-span-3 row-span-5 md:col-start-3">
//         <div className="overflow-y-auto">
//           <div className="my-4">
//             <Title title={"About Us"} />
//           </div>
//           <div
//             className="text-md md:text-lg text-[#2D2D2D] font-secondary leading-relaxed m-4 p-4"
//             dangerouslySetInnerHTML={{ __html: aboutUsHtml }}
//           />
//         </div>
//       </div>
//       {/* Bottom Image under Text */}
//             <div className="col-span-7 md:col-span-3 row-span-2 md:col-start-3 row-start-6 flex items-end">
//                 <img
//                     src={images.banner}
//                     alt="Decoration"
//                     className="w-full h-auto object-cover"
//                 />
//             </div>

//       {/* Right Image - Hidden on small screens */}
//       <div className="hidden md:block col-span-2 row-span-7 col-start-6 row-start-1">
//         <img
//           src={rightImage}
//           alt="Right Decoration"
//           className="object-contain w-full h-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default AboutUs;


import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
import { Title } from "../../components/ui";
import { images } from "../../assets";

const AboutUs = () => {
  const [aboutUsHtml, setAboutUsHtml] = useState("");
  const [leftImage, setLeftImage] = useState("");
  const [rightImage, setRightImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch About Us content
        const aboutRes = await axios.get(`${API}/api/content/about`);
        setAboutUsHtml(aboutRes.data.aboutUs.html);

        // ✅ Fetch banners (assuming first = left, second = right)
        const bannersRes = await axios.get(`${API}/api/content/banners`);
        const banners = bannersRes.data.banners;

        if (banners.length > 0) setLeftImage(banners[0].url);
        if (banners.length > 1) setRightImage(banners[1].url);
      } catch (err) {
        console.error("Error fetching About Us data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-7 gap-0 p-6">
      {/* Left Image */}
      <div className="hidden md:block col-span-2">
        <img
          src={leftImage}
          alt="Left Decoration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center Text Content */}
      <div className="col-span-7 md:col-span-3 px-4 md:px-8 flex flex-col justify-center">
        <div className="my-4 text-center">
          <Title title="About Us" />
        </div>
        <div
          className="text-md md:text-lg text-[#2D2D2D] font-secondary leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: aboutUsHtml }}
        />
        <div className="col-span-7 md:col-span-3 row-span-2 md:col-start-3 row-start-6 flex items-end">
          <img
            src={images.banner}
            alt="Decoration"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block col-span-2">
        <img
          src={rightImage}
          alt="Right Decoration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AboutUs;
