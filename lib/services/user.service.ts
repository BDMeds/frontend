import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { toastSuccess } from "../utils/toast";
import { ApiResponse, IDoctor, IUser } from "../utils/types";

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
    handleAxiosErrorWithToast(err);
  }
};

export const getDoctor = async () => {
  try {
    const { data } = await authApi.get<ApiResponse<IDoctor>>("/doctor/user");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
