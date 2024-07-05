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

export const deleteMedicine = async () => {
  try {
    const { data } = await authApi.delete<ApiResponse>("/medicine");
    toastSuccess("Medicine deleted.");
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const updateMedicine = async (id: string, payload: Partial<CreateMedicine>) => {
  try {
    const { data } = await authApi.put<ApiResponse>(`/medicine/${id}`, payload);
    toastSuccess("Medicine updated.");
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const checkout = async (payload: {
  orderNotes: string;
  cart: { medicine: string; qty: string }[];
  address: any;
}) => {
  try {
    const { data } = await authApi.post<string>("/order/checkout", payload);
    toastSuccess("Order placed.");

    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
