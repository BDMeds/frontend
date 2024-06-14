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

export type Currency = "USD" | "NGN";
