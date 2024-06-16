import { handleAxiosErrorWithToast } from "../config/axios-error";
import { publicApi } from "../config/axios-instance";
import { ApiResponse } from "../utils/types";

export const getSpecializations = async () => {
  try {
    const { data } = await publicApi.get<ApiResponse<string[]>>("/doctor/specialities");
    return data.data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
