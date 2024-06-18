import { handleAxiosErrorWithToast } from "../config/axios-error";
import { authApi, publicApi } from "../config/axios-instance";
import { toastSuccess } from "../utils/toast";
import { ApiResponse, KycGet, KycStatus } from "../types";

export const getKyc = async (status: KycStatus) => {
  try {
    const { data } = await authApi.get<ApiResponse<KycGet[]>>(`/doctor/kyc?status=${status}`);
    return data.data;
  } catch (err) {
    // handleAxiosErrorWithToast(err);
  }
};
