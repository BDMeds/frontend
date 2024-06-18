import { Consultation } from ".";

export enum Frequency {
  HOURLY = "hourly",
  DAILY = "daily",
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
  BIMONTHLY = "bimonthly",
  YEARLY = "yearly",
}

export type HeartMetrics = {
  _id?: string;
  patient: string;
  heartHealthStatus?: string;
  heartRate?: number; // in bpm
  bloodPressureSystolic?: number; // in mmHg
  bloodPressureDiastolic?: number; // in mmHg
  bloodOxygenLevel?: number; // in %
  cholesterolTotal?: number; // in mg/dL
  cholesterolLDL?: number; // in mg/dL
  cholesterolHDL?: number; // in mg/dL
  ejectionFraction?: number; // in %
  cardiacOutput?: number; // in L/min
  bloodGlucoseLevel?: number; // in mg/dL
  consultation?: Consultation<HeartMetrics>;
};

export type BrainMetrics = {
  _id?: string;
  patient: string;
  brainHealthStatus?: string;
  eegResults?: number; // in Hertz (Hz)
  cognitiveFunctionTestScore?: {
    lower: number;
    upper: number;
  }; // in Points (Pts)
  consultation?: Consultation<BrainMetrics>;
};

export type EyesMetrics = {
  _id?: string;
  patient: string;
  visionTestResult?: string; // Visual acuity (e.g., 20/20)
  ocularPressure?: number; // mmHg
  contactLensBaseCurve?: number; // Millimeters (mm)
  contactLensDiameter?: number; // Millimeters (mm)
  consultation?: Consultation<EyesMetrics>;
};

export type BoneMetrics = {
  _id?: string;
  patient: string;
  boneHealthStatus?: string;
  rangeOfMotion?: number; // in degrees
  totalFractures?: number;
  consultation?: Consultation<BoneMetrics>;
};

export type KidneyMetrics = {
  _id?: string;
  patient: string;
  kidneyHealthStatus?: string; // Descriptive
  creatinine?: number; // Milligrams per deciliter (mg/dL)
  BUN?: number; // Milligrams per deciliter (mg/dL)
  urineProtein?: number; // Milligrams per deciliter (mg/dL)
  dialysisHours?: number; // Hours
  dialysisFrequency?: number; // Frequency
  consultation?: Consultation<KidneyMetrics>;
};

export type LiverMetrics = {
  _id?: string;
  patient: string;
  liverHealthStatus?: string;
  altLevel?: number; // Units per liter (U/L)
  astLevel?: number; // Units per liter (U/L)
  bilirubin?: number; // Milligrams per deciliter (mg/dL)
  fibrosisScore?: number; // Scaled (e.g., METAVIR score)
  consultation?: Consultation<LiverMetrics>;
};

export type TeethMetrics = {
  _id?: string;
  patient: string;
  dentalHealthStatus?: string; // Descriptive
  cavitiesCount?: number; // Count
  gumRecession?: number; // Millimeters (mm)
  plaqueIndex?: number; // Score
  recentProcedures?: string; // Descriptive
  consultation?: Consultation<TeethMetrics>;
};

type SkinMetrics = {
  _id?: string;
  patient: string;
  skinHealthStatus?: string; // Descriptive
  lesionCount?: number; // Count
  lesionSize?: number; // Millimeters (mm)
  biopsyResults?: string; // Descriptive
  consultation?: Consultation<SkinMetrics>;
};

export type DiagnosisDocument =
  | BoneMetrics
  | BrainMetrics
  | EyesMetrics
  | HeartMetrics
  | KidneyMetrics
  | LiverMetrics
  | SkinMetrics
  | TeethMetrics;

export type DiagnosisRef =
  | "BoneMetrics"
  | "BrainMetrics"
  | "EyesMetrics"
  | "HeartMetrics"
  | "KidneyMetrics"
  | "LiverMetrics"
  | "SkinMetrics"
  | "TeethMetrics";
