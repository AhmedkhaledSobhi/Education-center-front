import { useQuery } from "@tanstack/react-query";
import { allUser, getLoggedInUser, profile } from "./fakebackend_helper";

// _________________________________________________________________________________________________________________________

// ------------ get المستخدمين ------------
const useGetProfile = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const user = getLoggedInUser() || authUser;

  const data = {
    id: Number(user?.id),
  };
  return useQuery({
    queryKey: ["profile", data.id],
    queryFn: () => profile(data).then((res) => res || []),
    enabled: !!data.id, // مهم جدًا
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
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

