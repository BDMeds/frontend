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

type Faq = {
  question: string;
  answer: string;
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

export const faqs: Faq[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by calling our helpline number or by visiting our website. You can also book an appointment through our mobile app.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer a wide range of services including diagnostic testing, medical consultations, pharmacy, preventive care, and therapy sessions.",
  },
  {
    question: "How do I consult with a doctor?",
    answer:
      "You can consult with a doctor through live video sessions. You can book an appointment with a doctor of your choice and consult with them from the comfort of your home.",
  },
  {
    question: "How do I get my prescription?",
    answer:
      "You can get your prescription from our online pharmacy. You can order your medications and health products online and have them delivered to your doorstep.",
  },
  {
    question: "How do I pay for my appointment?",
    answer:
      "You can pay for your appointment through our website or mobile app. You can pay using your credit card, debit card, or mobile wallet.",
  },
  {
    question: "How do I cancel my appointment?",
    answer:
      "You can cancel your appointment by calling our helpline number or by visiting our website. You can also cancel your appointment through our mobile app.",
  },
];
