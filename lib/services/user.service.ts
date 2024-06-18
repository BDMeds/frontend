import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { toastSuccess } from "../utils/toast";
import { ApiResponse, BookAppointment, ChangePassword, Department, IDoctor, IUser } from "../types";

export const uploadProfilePicture = async (picture: string) => {
  try {
    const { data } = await authApi.put<ApiResponse>("/user/profile-picture", { picture });
    toastSuccess("Profile picture updated.");
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const getUser = async () => {
  try {
    const { data } = await authApi.get<ApiResponse<IUser>>("/user");

    return data.data;
  } catch (err) {
    // handleAxiosErrorWithToast(err);
  }
};

export const getDoctor = async () => {
  try {
    const { data } = await authApi.get<ApiResponse<IDoctor>>("/doctor/user");
    return data.data;
  } catch (err) {
    // handleAxiosErrorWithToast(err);
  }
};

export const getDoctors = async ({
  department = "Cardiology (Heart)",
  search = "",
}: {
  search?: string;
  department: Department;
}) => {
  try {
    const { data } = await authApi.get<ApiResponse<IDoctor[]>>(`/doctor?search=${search}&department=${department}`);
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const changePassword = async (payload: ChangePassword) => {
  try {
    const { data } = await authApi.put<ApiResponse>("/auth/change-password", payload);
    toastSuccess("Password changed successfully");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};

export const deleteProfilePicture = async () => {
  try {
    const { data } = await authApi.delete<ApiResponse>("/user/profile-picture");
    toastSuccess("Profile picture deleted");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
