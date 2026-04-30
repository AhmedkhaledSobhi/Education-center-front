import { useQuery } from "@tanstack/react-query";
import { allCourse, allRoom, allUser, getLoggedInUser, profile } from "./fakebackend_helper";
import { toast } from "react-toastify";
import { cleanParams, handleUnauthenticated, isEmpty, safeParse } from "./index";

// _________________________________________________________________________________________________________________________

// _____________/ get المستخدمين \_____________
const useGetProfile = () => {
  const storedUser = safeParse(localStorage.getItem("authUser"));
  const user = getLoggedInUser() || storedUser;
  const userId = user?.id ? Number(user.id) : null;

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await profile({ id: userId });
      return res?.data ?? [];
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

// _____________/ get المستخدمين \_____________
const useGetAllUser = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allUser", params],
    queryFn: () => allUser(params).then((res) => res || []),
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
  });
};

// _____________/ get المدرسين \_____________
const useGetAllTeacher = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allTeacher", params],
    queryFn: () => allUser(params).then((res) => res || []),
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
  });
};

// _____________/ get الطلاب \_____________
const useGetAllStudent = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allStudent", params],
    queryFn: () => allUser(params).then((res) => res || []),
    staleTime: 5000 * 10 * 5,
    refetchInterval: 50000,  // ⏱️ كل 5 ثواني
  });
};

// _____________/ get الغرف ( السكشن ) \_____________
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

// _____________/ get المواد الدراسية \_____________
const useGetAllCourse = (params = {}) => {
  params = cleanParams(params);
  return useQuery({
    queryKey: ["allCourse", params],
    queryFn: () => allCourse(params).then((res) => {
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
  useGetAllCourse,
}

