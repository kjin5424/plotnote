import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useModalStore = defineStore("modal", () => {
  const confirm = async (message: string, title: string = "확인") => {
    return await Swal.fire({
      title,
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      // reverseButtons: true,
      confirmButtonColor: "#4a90e2", // primary color
      cancelButtonColor: "#95a5a6", // secondary color
    }).then((res) => res.isConfirmed);
  };

  // 성공 알림
  const success = async (message: string, title: string = "성공") => {
    return await Swal.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonText: "확인",
      confirmButtonColor: "#a4d96c", // success color
    });
  };

  // 에러 알림
  const error = async (message: string, title: string = "오류") => {
    return await Swal.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonText: "확인",
      confirmButtonColor: "#e74c3c", // danger color
    });
  };

  // 경고 알림
  const warning = async (message: string, title: string = "경고") => {
    return await Swal.fire({
      title,
      text: message,
      icon: "warning",
      confirmButtonText: "확인",
      confirmButtonColor: "#f39c12", // warning color
    });
  };

  // 정보 알림
  const info = async (message: string, title: string = "알림") => {
    return await Swal.fire({
      title,
      text: message,
      icon: "info",
      confirmButtonText: "확인",
      confirmButtonColor: "#4a90e2", // primary color
    });
  };

  // 삭제 확인
  const deleteConfirm = async (message: string = "정말 삭제하시겠습니까?") => {
    return await Swal.fire({
      title: "삭제 확인",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "#e74c3c", // danger color
      cancelButtonColor: "#95a5a6", // secondary color
    }).then((res) => res.isConfirmed);
  };

  return {
    confirm,
    success,
    error,
    warning,
    info,
    deleteConfirm,
  };
});
