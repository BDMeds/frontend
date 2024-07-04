import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse, CreateMedicine, Medicine } from "../types";
import { toastSuccess } from "../utils/toast";

export const getMedicines = async () => {
  try {
    const { data } = await authApi.get<ApiResponse<Medicine[]>>("/medicine");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const getSingleMedicine = async (id: string) => {
  try {
    const { data } = await authApi.get<ApiResponse<Medicine>>(`/medicine/${id}`);
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const addMedicine = async (payload: CreateMedicine) => {
  try {
    const { data } = await authApi.post<ApiResponse>("/medicine", payload);
    toastSuccess("Medicine created.");
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
