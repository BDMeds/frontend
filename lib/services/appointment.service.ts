import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { toastSuccess } from "../utils/toast";
import { ApiResponse, BookAppointment } from "../types";

export const bookAppointment = async ({ payload, doctorId }: { payload: BookAppointment; doctorId: string }) => {
  try {
    const { data } = await authApi.put<ApiResponse>(`/appointment/${doctorId}/book`, payload);
    toastSuccess("Appointment booked.");
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
