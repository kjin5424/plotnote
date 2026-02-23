// 개선 방향
import Swal from "sweetalert2";

export const useNotification = () => {
  const confirm = async (options: {
    title?: string;
    text?: string;
    icon?: "warning" | "error" | "success" | "info";
  }) => {
    const result = await Swal.fire({
      title: options.title || "확인",
      text: options.text,
      icon: options.icon || "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });
    return result.isConfirmed;
  };

  return { confirm };
};
