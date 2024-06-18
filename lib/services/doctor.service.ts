import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi, publicApi } from "../config/axios-instance";
import { toastSuccess } from "../utils/toast";
import { ApiResponse, IDoctor, Kyc, KycID, Socials } from "../types";

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
    // handleAxiosErrorWithToast(err);
  }
};

export const uploadKyc = async (payload: Partial<Kyc>) => {
  try {
    const { data } = await authApi.put<ApiResponse>("/doctor/kyc/update", payload);
    toastSuccess("Kyc documents uploaded successfully.");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const rejectKyc = async (doctorId: string) => {
  try {
    const { data } = await authApi.post<ApiResponse>(`/doctor/${doctorId}/kyc/reject`);
    toastSuccess("Kyc rejected successfully.");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const approveKyc = async (doctorId: string) => {
  try {
    const { data } = await authApi.post<ApiResponse>(`/doctor/${doctorId}/kyc/verify`);
    toastSuccess("Kyc approved successfully.");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
