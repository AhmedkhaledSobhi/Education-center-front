import { useQuery } from "@tanstack/react-query";
import { allUser, getLoggedInUser, profile } from "./fakebackend_helper";
import { toast } from "react-toastify";
import { handleUnauthenticated, isEmpty, safeParse } from "./index";

// _________________________________________________________________________________________________________________________

// ------------ get المستخدمين ------------
const useGetProfile = () => {
  const storedUser = safeParse(localStorage.getItem("authUser"));
  const user = getLoggedInUser() || storedUser;
  const userId = user?.id ? Number(user.id) : null;

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await profile({ id: userId });
      return res ?? [];
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.log("ahmed error", error);
      handleUnauthenticated();

      toast.error(error?.message || "Error fetching profile",{
        position: "top-center",
        hideProgressBar: false,
        autoClose: 3000,
        progress: undefined,
      });

    }
  });
};

// ------------ get المستخدمين ------------
const useGetAllUser = () => {
  return useQuery({
    queryKey: ["allUser",],
    queryFn: () => allUser().then((res) => res || []),
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
  });
};

// _________________________________________________________________________________________________________________________

export {
  useGetProfile,
  useGetAllUser,
}

