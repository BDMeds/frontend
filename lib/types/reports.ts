export type HeartMetrics = {
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
};

export type BrainMetrics = {
  patient: string;
  brainHealthStatus?: string;
  eegResults?: number; // in Hertz (Hz)
  cognitiveFunctionTestScore?: {
    lower: number;
    upper: number;
  }; // in Points (Pts)
};

export type EyesMetrics = {
  patient: string;
  visionTestResult?: string; // Visual acuity (e.g., 20/20)
  ocularPressure?: number; // mmHg
  contactLensBaseCurve?: number; // Millimeters (mm)
  contactLensDiameter?: number; // Millimeters (mm)
};

export type BoneMetrics = {
  patient: string;
  boneHealthStatus?: string;
  rangeOfMotion?: number; // in degrees
  totalFractures?: number;
};

export type KidneyMetrics = {
  patient: string;
  kidneyHealthStatus?: string; // Descriptive
  creatinine?: number; // Milligrams per deciliter (mg/dL)
  BUN?: number; // Milligrams per deciliter (mg/dL)
  urineProtein?: number; // Milligrams per deciliter (mg/dL)
  dialysisHours?: number; // Hours
  dialysisFrequency?: number; // Frequency
};

export type LiverMetrics = {
  patient: string;
  liverHealthStatus?: string;
  altLevel?: number; // Units per liter (U/L)
  astLevel?: number; // Units per liter (U/L)
  bilirubin?: number; // Milligrams per deciliter (mg/dL)
  fibrosisScore?: number; // Scaled (e.g., METAVIR score)
};

export type TeethMetrics = {
  patient: string;
  dentalHealthStatus?: string; // Descriptive
  cavitiesCount?: number; // Count
  gumRecession?: number; // Millimeters (mm)
  plaqueIndex?: number; // Score
  recentProcedures?: string; // Descriptive
};
