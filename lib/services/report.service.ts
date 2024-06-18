import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse } from "../types";
import { DiagnosisDocument } from "../types/reports";
import { toastSuccess } from "../utils/toast";

export const getAppointmentReport = (appointmentId: string) => async () => {
  try {
    const { data } = await authApi.get<ApiResponse<DiagnosisDocument>>(
      `/consultation/report/appointment/${appointmentId}`
    );

    return data.data;
  } catch (error) {}
};

export const submitCardiologyReprot = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/cardiology`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const submitDentistryReport = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/dentistry`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const submitDermatologyReport = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/dermatology`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const submitHepatologyReport = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/hepatology`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const submitNephrologyReport = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/nephrology`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const submitNeurologyReport = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/neurology`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const submitOptometryReport = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/optometry`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const submitOrthopedicReport = async ({
  report,
  appointmentId,
}: {
  report: any;
  appointmentId: string;
}) => {
  try {
    const { data } = await authApi.post(
      `/consultation/report/${appointmentId}/orthopedic`,
      report
    );

    toastSuccess("Report Submitted Successfully");

    return data?.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};
