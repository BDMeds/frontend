import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse, CreateMedicine } from "../types";
import { toastSuccess } from "../utils/toast";

export const addMedicine = async (payload: CreateMedicine) => {
  try {
    const { data } = await authApi.post<ApiResponse>("/medicine", payload);
    toastSuccess("Medicine created.");
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
