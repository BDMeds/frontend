export type ApiResponse<T> = {
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
};

export type IDoctorRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  specialization: string;
  gender: string;
  experienceYears: string;
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

export type ITokens = {
  accessToken: string;
  refreshToken: string;
  lifeSpan: number;
};

export type Currency = "USD" | "NGN";
