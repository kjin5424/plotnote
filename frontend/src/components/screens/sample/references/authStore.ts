import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { USER_ROLES } from "@/constants/USER_ROLES";

// ============ 타입 정의 ============
type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
type UserRoleKey = keyof typeof USER_ROLES;

interface SubMenu {
  mnu_nm: string;
  mnu_url: string;
}

interface MenuItem {
  mnu_nm: string;
  nodeList: SubMenu[];
}

interface FormattedSubMenu extends SubMenu {
  processedUrl: string;
}

interface FormattedMenuItem {
  mnu_nm: string;
  nodeList: FormattedSubMenu[];
}

interface UserInfo {
  loginId?: string;
  userId?: string;
  id?: string;
  userNm?: string;
  name?: string;
  userName?: string;
  role?: UserRole;
  userType?: string;
  usrMnuAtrt?: MenuItem[];
  [key: string]: unknown;
}

interface LoginResult {
  success: boolean;
  msg?: string;
}

// ============ 스토어 정의 ============
export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserInfo | null>(null);
  const loading = ref<boolean>(false);
  const menuList = ref<MenuItem[]>([]);

  const isLoggedIn = computed<boolean>(() => !!user.value);
  const loginId = computed<string>(() => {
    if (!user.value) return "Guest";
    return user.value.loginId || user.value.userId || user.value.id || "Guest";
  });
  const loginNm = computed<string>(() => {
    if (!user.value) return "사용자";
    return (
      user.value.userNm || user.value.name || user.value.userName || "사용자"
    );
  });
  const userRole = computed<UserRole>(() => {
    const key = (user.value?.userType as UserRoleKey) || "G";
    return USER_ROLES[key] || USER_ROLES.G;
  });

  const isAdmin = computed<boolean>(() => userRole.value === "admin");
  const isTeacher = computed<boolean>(() => userRole.value === "teacher");
  const isStudent = computed<boolean>(() => userRole.value === "student");

  const formattedMenuList = computed<FormattedMenuItem[]>(() => {
    return menuList.value.map((menu) => ({
      ...menu,
      nodeList:
        menu.nodeList?.map((sub) => ({
          ...sub,
          processedUrl: `/dashboard${sub.mnu_url.endsWith(".do") ? sub.mnu_url.slice(0, -3) : sub.mnu_url}`,
        })) || [],
    }));
  });

  // ============ Actions ============
  const login = async (
    userId: string,
    password: string,
  ): Promise<LoginResult> => {
    loading.value = true;
    try {
      const params = new URLSearchParams();
      params.append("lgn_Id", userId);
      params.append("pwd", password);

      const res = await axios.post("/loginProc.do", params);

      if (res.data.result === "SUCCESS") {
        user.value = res.data;
        sessionStorage.setItem("loginInfo", JSON.stringify(res.data));
        if (res.data.usrMnuAtrt) {
          menuList.value = res.data.usrMnuAtrt;
          sessionStorage.setItem(
            "userMenu",
            JSON.stringify(res.data.usrMnuAtrt),
          );
        } else {
          menuList.value = [];
          sessionStorage.removeItem("userMenu");
        }

        return { success: true };
      }
      return { success: false, msg: res.data.resultMsg };
    } catch (error) {
      return { success: false, msg: "서버 통신 에러" };
    } finally {
      loading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.post("/loginOut.do");
    } catch (error) {
      console.error("서버 로그아웃 처리 중 오류:", error);
    } finally {
      user.value = null;
      menuList.value = [];
      sessionStorage.clear();
    }
  };

  const loadSession = (): void => {
    const storedUser = sessionStorage.getItem("loginInfo");
    const storedMenu = sessionStorage.getItem("userMenu");

    user.value = storedUser ? JSON.parse(storedUser) : null;
    menuList.value = storedMenu ? JSON.parse(storedMenu) : [];
  };

  const checkAuth = (): boolean => {
    loadSession();
    return isLoggedIn.value;
  };

  return {
    // ▶ State
    // 1. 유저 정보
    user, // {loginId, result, resultMsg, serverName, userNm, userType, usrMnuAtrt}
    // 사용 방법 예시
    // console.log({ ...authStore.user })
    // 2. 로딩 상태
    loading, // true/false
    // 3. 메뉴 리스트
    menuList,
    // 사용 방법 예시
    // console.log(JSON.parse(JSON.stringify(authStore.menuList)));

    // ▶ Getters
    // 1. 로그인 상태
    isLoggedIn, // true/false
    // 2. 로그인 아이디
    loginId,
    // 3. 로그인 이름
    loginNm,
    // 4. 유저 역할
    userRole, // "admin" | "teacher" | "student" | "guest"
    // 5. 역할별 체크
    isAdmin,
    isTeacher,
    isStudent,
    // 6. 포맷된 메뉴 리스트
    formattedMenuList,
    // JSON.parse(JSON.stringify(authStore.menuList))와 동일한 결과

    // ▶ Actions
    login,
    logout,
    loadSession,
    checkAuth,
  };
});
