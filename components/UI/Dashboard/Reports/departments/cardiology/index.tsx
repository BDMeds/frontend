import TableComponent from "@/components/Common/Table";
import columns from "./columns";
import { HeartMetrics } from "@/lib/types/reports";
import { getRandomFloat, getRandomNumber } from "@/lib/helpers/numbers";

function generateRandomHeartMetrics(): HeartMetrics {
  const heartHealthStatuses = ["Healthy", "At Risk", "Unhealthy"];

  return {
    patient: `patient_${getRandomNumber(1, 10000)}`,
    heartHealthStatus: heartHealthStatuses[getRandomNumber(0, heartHealthStatuses.length - 1)],
    heartRate: getRandomNumber(60, 100), // Normal resting heart rate
    bloodPressureSystolic: getRandomNumber(90, 120), // Normal systolic BP
    bloodPressureDiastolic: getRandomNumber(60, 80), // Normal diastolic BP
    bloodOxygenLevel: getRandomFloat(95, 100, 1), // Normal SpO2 levels
    cholesterolTotal: getRandomNumber(150, 200), // Desirable total cholesterol
    cholesterolLDL: getRandomNumber(70, 130), // Desirable LDL cholesterol
    cholesterolHDL: getRandomNumber(40, 60), // Desirable HDL cholesterol
    ejectionFraction: getRandomFloat(50, 70, 1), // Normal ejection fraction
    cardiacOutput: getRandomFloat(4, 8, 1), // Normal cardiac output
    bloodGlucoseLevel: getRandomNumber(70, 130), // Normal blood glucose level
  };
}

const data = Array.from({ length: 10 }).map(() => generateRandomHeartMetrics());

const CardiologyReport = () => {
  return (
    <div>
      <TableComponent columns={columns} data={data || []} />
    </div>
  );
};

export default CardiologyReport;
