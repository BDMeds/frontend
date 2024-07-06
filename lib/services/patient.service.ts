import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi, publicApi } from "../config/axios-instance";
import { toastSuccess } from "../utils/toast";
import { ApiResponse, IPatient, IUser } from "../types";

export const getPatient = async () => {
  try {
    const { data } = await authApi.get<ApiResponse<IPatient>>("/patient/user");
    return data.data;
  } catch (err) {
    // handleAxiosErrorWithToast(err);
  }
};

export const updatePatient = async (payload: Partial<IPatient>) => {
  try {
    const { data } = await authApi.put<ApiResponse>("/patient", payload);

    toastSuccess("Profile updated.");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const verifyPayment = async (ref: string) => {
  try {
    const { data } = await authApi.get<ApiResponse<{ status: "successful" | "pending" | "failed" }>>(
      `/payment/confirm/${ref}`
    );
    return data.data;
  } catch (err) {}
};
