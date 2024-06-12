export type IPatientRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type IDoctorRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  specialization: string;
  experienceYears: string;
};

export type ILoginData = {
  emailOrPhone: string;
  password: string;
};
