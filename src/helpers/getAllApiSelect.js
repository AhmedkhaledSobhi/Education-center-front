import { useQuery } from "@tanstack/react-query";
import { allRoom, allUser, getLoggedInUser, profile } from "./fakebackend_helper";
import { toast } from "react-toastify";
import { cleanParams, handleUnauthenticated, isEmpty, safeParse } from "./index";

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
const useGetAllUser = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allUser", params],
    queryFn: () => allUser(params).then((res) => res || []),
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
  });
};

// ------------ get المدرسين ------------
const useGetAllTeacher = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allUser", params],
    queryFn: () => allUser(params).then((res) => res || []),
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
  });
};

// ------------ get الطلاب ------------
const useGetAllStudent = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allUser", params],
    queryFn: () => allUser(params).then((res) => res || []),
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
  });
};

// ------------ get الغرف ( السكشن ) ------------
const useGetAllRoom = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allRoom", params],
    queryFn: () => allRoom(params).then((res) => {            
      return res || []
    }),
    staleTime: 5000 * 10 * 5,
    // refetchInterval: 10000,  // ⏱️ كل 5 ثواني
  });
};
// _________________________________________________________________________________________________________________________

export {
  useGetProfile,
  useGetAllUser,
  useGetAllTeacher,
  useGetAllStudent,
  useGetAllRoom,
}

