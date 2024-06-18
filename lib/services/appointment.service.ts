import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse, AppointmentDocument, BookAppointment } from "../types";
import { toastSuccess } from "../utils/toast";

export const getAppointments = async () => {
  try {
    const { data } = await authApi.get<ApiResponse<AppointmentDocument[]>>(
      "/appointment/user"
    );

    return data.data;
  } catch (error) {
    // handleAxiosErrorWithToast(error)
  }
};

export const bookAppointment = async ({
  payload,
  doctorId,
}: {
  payload: BookAppointment;
  doctorId: string;
}) => {
  try {
    const { data } = await authApi.post<ApiResponse>(
      `/appointment/${doctorId}/book`,
      payload
    );
    toastSuccess("Appointment booked.");
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const getSingleAppointment = (appointmentId: string) => async () => {
  try {
    const { data } = await authApi.get<ApiResponse<AppointmentDocument>>(
      `/appointment/${appointmentId}`
    );

    return data.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const { data } = await authApi.put(`/appointment/${appointmentId}/cancel`);

    toastSuccess("Appointment cancelled successfully");

    return data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const updateAppointmentStatus = async ({
  appointmentId,
  status,
}: {
  appointmentId: string;
  status: "successful" | "failed";
}) => {
  try {
    const { data } = await authApi.put(`/appointment/${appointmentId}/status`, {
      status,
    });

    toastSuccess("Appointment status updated");

    return data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};
