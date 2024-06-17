import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse, AppointmentDocument } from "../types";

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
