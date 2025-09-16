
import { useState } from "react";
import Not from "../../assets/images/Not.png"
import rightClick from "../../assets/images/rightClick.png";
import righttick from "../../assets/images/righttick.png";



const Plans = () => {
   const [planList, setPlanList] = useState([
  {
    id: 1,
    price: 999,
    duration: "1 Year",
    name: "BASIC",
    features: [
      "Apply up to 50 casting calls per year",
      "Email alerts 1",
      "Weekly WhatsApp reminder",
      "10 Photos upload"
    ]
  },
  {
    id: 2,
    price: 2999,
    duration: "1 Year",
    name: "PRO",
    features: [
      "Unlimited casting calls per year",
      "Email alerts 3",
      "Thrice a week MWF WhatsApp alerts",
      "30 Photos upload",
      "5 Introduction videos upload"
    ]
  }
]);
  const features = [
  "Apply up to 50 casting calls per year",
  "Email alerts 1",
  "Weekly WhatsApp reminder",
  "10 Photos upload",
  "3 Introduction videos upload",
  "5 Audition video upload",
  "3 work links",
  "Unlimited casting calls per year",
  "Email alerts 3",
  "Thrice a week MWF WhatsApp alerts and reminders",
  "30 Photos upload",
  "5 Introduction videos upload",
  "10 Audition video upload",
  "10 work links"
];

  return (
    <div>
      <div>
       <div className="text-center mt-10">
  <p className="font-poppins font-bold text-[36px] leading-[100%] tracking-[0%] text-[#8B3C68]">
    Get Discovered, Start Now.
  </p>
</div>

      </div>



     <div className="mt-10 flex justify-center">
  <div className="grid grid-cols-[560px_409px_409px] gap-1 border rounded-[10px]">
    
    {/* Features Column */}
    <div className="bg-white border-r rounded-l-[10px]">
      <div className="h-[169px] flex justify-center items-center rounded-tl-[10px]" 
           style={{ background: "linear-gradient(180deg, #8B3C68 22.12%, #C77496 100%)" }}>
        <p className="font-poppins font-bold text-[32px] text-white">Features</p>
      </div>
      <div>
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center p-5">
            <img src={righttick} alt="tick" className="w-6 h-6 mr-3" />
            <p className="font-poppins text-[20px]">{feature}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Plans Columns */}
    {planList.map((plan) => (
      <div key={plan.id} className="border-l rounded-r-[10px] bg-white">
        {/* Plan Header */}
        {/* <div className="h-[169px] flex flex-col justify-center items-center rounded-t-[10px]"
             style={{ background: "linear-gradient(180deg, #8B3C68 22.12%, #C77496 100%)" }}>
          <span className="text-white font-medium text-[32px]">₹{plan.price}/-</span>
          <span className="text-white text-[20px]">{plan.duration}</span>
          <span className="text-white text-[24px] font-bold">{plan.name}</span>
        </div> */}
         <div
            className="h-[169px] rounded-[10px] flex justify-center items-center"
            style={{
              background: "linear-gradient(180deg, #8B3C68 22.12%, #C77496 100%)"
            }}
          >
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                color: "#FFF5DA",
                marginTop: "-50px",
                fontSize: "32px",
                fontWeight: 500
              }}
            >
              ₹
            </span>
            <p className="font-poppins font-medium text-white text-center ml-2">
              <span className="text-[48px]" style={{ color: "#FFF5DA" }}>
                {plan.price}/-
              </span>
              <br />
              <span className="text-[20px]">{plan.duration}</span>{" "}
              <span className="text-[24px] font-bold">{plan.name}</span>
            </p>
          </div>

        {/* Features */}
        <div>
          {features.map((feature, idx) => {
            const included = plan.features.includes(feature);
            return (
              <div key={idx} className="flex items-center p-5 justify-start">
                <img
                  src={included ? rightClick : Not}
                  alt={included ? "Included" : "Not included"}
                  className="w-6 h-6 mr-3"
                />
                <p className="font-poppins text-[20px]">{feature}</p>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  )
}

export default Plans
