import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi, publicApi } from "../config/axios-instance";
import { toastSuccess } from "../utils/toast";
import { ApiResponse, IDoctor, Kyc, KycID, Socials } from "../utils/types";

export const getSpecializations = async () => {
  try {
    const { data } = await publicApi.get<ApiResponse<string[]>>("/doctor/specialities");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const addDoctorSocials = async (socials: Socials) => {
  try {
    const { data } = await authApi.put<ApiResponse>("/doctor/", { socials });
    toastSuccess("Socials added successfully.");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const updateData = async (newData: Partial<IDoctor>) => {
  try {
    const { data } = await authApi.put<ApiResponse>("/doctor/", newData);
    toastSuccess("Info updated successfully");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const getKycId = async () => {
  try {
    const { data } = await authApi.get<ApiResponse<KycID[]>>("/doctor/kyc/id-types");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const uploadKyc = async (payload: Kyc) => {
  try {
    const { data } = await authApi.put<ApiResponse>("/doctor/kyc/update", payload);
    toastSuccess("Kyc documents uploaded");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
