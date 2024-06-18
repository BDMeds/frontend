import { useParams } from "next/navigation";
import React from "react";

const SubmitReport = () => {
  const { id: appointmentId } = useParams<{ id: string }>();

  return <div>SubmitReport</div>;
};

export default SubmitReport;
