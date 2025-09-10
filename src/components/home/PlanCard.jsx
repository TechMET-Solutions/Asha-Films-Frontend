import { useState } from "react";
import { LuArrowRight,LuArrowUpRight } from "react-icons/lu";
import plan from '@/assets/svg/Plan.png';
import { icons } from "../../assets";

const PlanCard = ({ planData }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // ✅ Build accordion data from backend
  const accordionData = [
    {
      id: 1,
      title: "📋 Plan Benefits",
      content:
        planData.plan_benefits && planData.plan_benefits.length > 0
          ? planData.plan_benefits.join(", ")
          : "No benefits added.",
      bgColor: "bg-ternary",
      textColor: "text-black",
    },
    {
      id: 2,
      title: "📢 For Whom?",
      content: planData.from_whom || "No details provided.",
      bgColor: "bg-secondary",
      textColor: "text-black",
    },
    {
      id: 3,
      title: "❓ Why Subscribe?",
      content: planData.why_subscribe || "No details provided.",
      bgColor: "bg-primary",
      textColor: "text-white",
    },
  ];

  return (
    <div className="w-full max-w-[350px] h-auto min-h-[342px] bg-white rounded-md shadow-lg overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center px-6 py-6 bg-cover bg-center" style={{ backgroundImage: `url(${plan})` }}>
        <img
          src={icons.plan}
          alt="opportunity"
          className="w-12 h-12 mb-3"
        />
        <h3 className="text-lg font-primary font-medium text-primary">
          One Plan. Every Opportunity.
        </h3>
        <p className="text-2xl font-primary font-medium text-primary mt-2">
          ₹ {planData.price}
        </p>
      </div>

      {/* Accordion Section */}
      <div className="flex-1 flex flex-col">
        {accordionData.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            isOpen={openId === item.id}
            onClick={handleToggle}
            bgColor={item.bgColor}
            textColor={item.textColor}
            isOnlyOpenItem={openId !== null}
          />
        ))}
      </div>
    </div>
  );
};

const AccordionItem = ({
  id,
  title,
  content,
  isOpen,
  onClick,
  bgColor,
  textColor,
  isOnlyOpenItem,
}) => {
  return (
    <div
      className={`${bgColor} border-t transition-all duration-300 ease-in-out ${
        isOpen ? "flex-1" : isOnlyOpenItem ? "hidden" : ""
      }`}
    >
      <div
        className={`flex justify-between items-center p-4 cursor-pointer ${
          isOpen ? "pb-2" : ""
        }`}
        onClick={() => onClick(id)}
      >
        <p className={`font-semibold text-base ${isOpen ? textColor : "text-black"}`}>
          {title}
        </p>
        <span
          className={`rounded-full p-1 ${
            isOpen ? "bg-white text-black" : "bg-white text-black"
          }`}
        >
          {isOpen ? <LuArrowUpRight size={16} /> : <LuArrowRight size={16} />}
        </span>
      </div>

      {isOpen && (
        <div className="px-4 pb-4 pt-2">
          <p className={`text-sm ${textColor}`}>{content}</p>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
