import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getDoctor, getUser } from "../services/user.service";

const useUserInfo = () => {
  const { data: session } = useSession();

  const { data: user, isPending: loading } = useQuery({
    queryFn: () => getUser(),
    queryKey: ["user", "info", session?.user._id],
    enabled: session?.user ? true : false,
    staleTime: 1000 * 60 * 3600,
  });

  return { user, loading };
};

export const useDoctorInfo = () => {
  const { data: session } = useSession();

  const { data: doctor, isPending: loading } = useQuery({
    queryFn: () => getDoctor(),
    queryKey: ["doctor", "info", session?.user._id],
    enabled: session?.user ? true : false,
    staleTime: 1000 * 60 * 3600,
  });

  return { doctor, loading };
};

export default useUserInfo;
