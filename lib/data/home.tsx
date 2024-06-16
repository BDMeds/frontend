import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdCalendarMonth } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { CiVideoOn } from "react-icons/ci";

type Service = {
  icon: JSX.Element;
  title: string;
  description: string;
};

type Department = {
  name: string;
  image: string;
};

export const services: Service[] = [
  {
    title: "Diagnostic testing",
    description: "Blood tests, imaging studies, and other tests to diagnose health condition",
    icon: <MdCalendarMonth size={30} />,
  },
  {
    title: "Medical Consultations",
    description:
      "Our expert healthcare professionals provide personalized medical consultations to address your health concerns. ",
    icon: <AiOutlineMedicineBox size={30} />,
  },
  {
    title: "Pharmacy",
    description:
      "Explore our online pharmacy for a wide range of medications and health products. Convenient, fast, and reliable",
    icon: <MdShoppingCartCheckout size={30} />,
  },
  {
    title: "Preventive care",
    description: "Annual checkups, immunizations, and health screenings care preventive",
    icon: <LiaHandsHelpingSolid size={30} />,
  },
  {
    title: "Therapy Sessions",
    description:
      "Connect with licensed therapists through live video sessions. Get the support you need from the comfort of your home.",
    icon: <CiVideoOn size={30} />,
  },
];

export const departments: Department[] = [
  {
    name: "Cardiology",
    image: "cardiology.png",
  },
  {
    name: "Dentistry",
    image: "dentistry.png",
  },
  {
    name: "Neurology",
    image: "neurology.png",
  },
  {
    name: "Orthopedic",
    image: "orthopedic.png",
  },
  {
    name: "Optometrist",
    image: "optometrist.png",
  },
  {
    name: "Psycho Therapist",
    image: "psychotherapist.png",
  },
];
