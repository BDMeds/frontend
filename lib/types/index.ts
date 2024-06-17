import { AppointmentModeEnum, AppointmentStatusEnum, DepartmentsEnum } from "../enums";
import { DiagnosisDocument } from "./reports";

export type KycID =
  | "National Identification Card"
  | "International Passport"
  | "Drivers License"
  | "Voters Card"
  | "Tax Identification Number";

export type Currency = "USD" | "NGN";

export type Role = "patient" | "doctor" | "admin";

export type Gender = "male" | "gender";

export type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data: T;
};

export type IPatientRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  yearsOfExperience: number;
};

export type IDoctorRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  speciality: string;
  gender: string;
  yearsOfExperience: number;
};

export type ILoginData = {
  emailOrPhone: string;
  password: string;
};

export type IDef = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type IUser = {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  gender: Gender;
  profilePicture: string;
  role: Role;
  meta: ITokens;
} & IDef;

export type IPatient = {
  _id: string;
  user: IUser;
  favouriteDoctors: IDoctor[];
} & IDef;

export type IDoctor = {
  yearsOfExperience: number;
  speciality: string;
  qualifications: [];
  kycVerified: boolean;
  bio: string;
  availableDays: AvailableDay[];
  kycDetails: Kyc | null;
  _id: string;
  user: IUser;
  address?: Address;
  socials?: Socials;
} & IDef;

export type Socials = {
  facebook: string;
  whatsapp: string;
  twitter: string;
  linkedin: string;
};

export type AvailableDay = {
  day: string;
  startTime: string;
  endTime: string;
};

export type Address = {
  state: string;
  city: string;
  country: string;
};

export type ITokens = {
  accessToken: string;
  refreshToken: string;
  lifeSpan: number;
};

export type IPayment = {
  appointment: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "cancelled";
  transactionDate: string;
  doctor: string;
} & IDef;

export type IBookAppointment = {
  name: string;
  phoneNumber: string;
  reasonForVisit: string;
};

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type Kyc = {
  idDoc: string;
  idType: string;
  professionalCert: string;
  status?: "pending" | "failed" | "successful";
};

export type Department =
  | "Cardiology (Heart)"
  | "Dentistry (Teeth and Oral Health)"
  | "Neurology (Nervous System)"
  | "Orthopedics (Musculoskeletal System)"
  | "Optometry (Eye and Vision Care)"
  | "Psychotherapy (Mental Health)"
  | "Nephrology (Kidneys)"
  | "Hepatology (Liver)"
  | "Dermatology (Skin)";

export type Appointment = {
  patient?: string; // Optional because it's not required in the schema
  doctor: string;
  appointmentDate: Date;
  department: DepartmentsEnum;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatusEnum;
  mode: AppointmentModeEnum;
  // invoice later
};

export type AppointmentDocument = Appointment & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Consultation = {
  appointment: AppointmentDocument;
  diagnosis: DiagnosisDocument;
  diagnosisRef: string; /// come back to this
  consultationNote?: string;
};
