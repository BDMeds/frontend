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
  gender: "male" | "female";
  profilePicture: string;
  role: "patient" | "doctor";
  meta: ITokens;
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
  state: "string";
  city: "string";
  country: "string";
};

export type IDoctor = {
  yearsOfExperience: number;
  speciality: string;
  qualifications: [];
  kycVerified: boolean;
  bio: string;
  availableDays: AvailableDay[];
  kycDetails: null;
  _id: string;
  user: IUser;
  address?: Address;
  socials?: Socials;
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

export type Currency = "USD" | "NGN";
