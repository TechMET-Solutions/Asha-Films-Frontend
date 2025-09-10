import React from "react";

const Plans = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white"><div className="bg-white py-16 px-6 md:px-12 lg:px-24 flex justify-between gap-20">
    
      
      <div className="max-w-4xl mx-auto text-center mb-12">
       <h2 className="font-poppins font-bold text-[36px] leading-[100%] tracking-[0] text-[#8B2F63] mb-4">
  Get Discovered, Start Now.
</h2>

        <p className="text-gray-600 mt-20">
          Whether you’re a fresh face entering the industry or a seasoned
          performer<br></br> looking for your next big break, enrolling with us is the
          first step toward real,<br></br> meaningful opportunities.
        </p>
        <p className="text-gray-600 mt-4">
          We believe in keeping things simple — one straightforward plan with
          full<br></br> access to everything you need. No complicated tiers, no hidden
          fees, no<br></br> confusion. Just pure visibility to top casting directors,
          agencies, and brands actively looking for talent like you.
        </p>
        <p className="font-semibold mt-4 text-[20px]">
          Ready to be seen? Let’s make it official.
        </p>
      </div>

     
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Basic Plan */}
        <div className="relative border-2 border-pink-300 rounded-md p-6 pt-12 shadow-sm hover:shadow-lg transition w-[350px] h-[442px]">
          {/* Banner */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white border border-pink-300 px-6 py-1 rounded-md shadow-sm text-[16px] font-semibold w-[302px] h-[50px] flex justify-center items-center text-[#494C4E]">
            Basic 999 1 Year
          </div>

          <h4 className="font-semibold text-[#8B3C68] mb-3 text-center">
            Features
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Personal user id with password</li>
            <li>Consolidated profile making, along with link sharing</li>
            <li>Free access to learning videos</li>
            <li>NO middlemen, direct contact to casting directors, producers and production houses View More.. </li>
           
          </ul>
          <div className="mt-18 text-center">
            <button className="border border-[#8B3C68] px-6 py-2 rounded-md text-[#494C4E] font-medium hover:bg-[#8B3C68] w-[215px] h-[49px] text-[20px] hover:text-white">
              Buy Now
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="relative border-2 border-pink-300 rounded-md p-6 pt-12 shadow-sm hover:shadow-lg transition w-[350px] h-[442px]">
          {/* Banner */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white border border-pink-300 px-6 py-1 rounded-md shadow-sm text-[16px] font-semibold w-[302px] h-[50px] flex justify-center items-center text-[#494C4E]">
           Pro 2999 1 Year
          </div>

          <h4 className="font-semibold text-[#8B3C68] mb-3 text-center">
            Features
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Personal user id with password</li>
            <li>Verified actors badge on profile</li>
            <li>Consolidated profile making, along with link sharing</li>
            <li>Free access to learning videos </li>
              <li>Access to regional, Bollywood, Tollywood and PAN INDIA casting calls View More... </li>
           
          </ul>
          <div className="mt-10 text-center">
            <button className="border border-[#8B3C68] px-6 py-2 rounded-md text-[#494C4E] font-medium hover:bg-[#8B3C68] w-[215px] h-[49px] text-[20px] hover:text-white">
              Buy Now
            </button>
          </div>
        </div>
      </div>


    </div></div>
    
  );
};

export default Plans;
