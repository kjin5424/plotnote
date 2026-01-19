// 권한 관리 (readonly/commentonly/editor/owner)
import { createContext, useContext, useState } from "react";
import { errorMsg } from "../components/common/errorMessage";

// 관리자 권한 관련 컨텍스트
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useUser 커스텀 훅
export const useUser = () => {
  const context = useContext(AuthContext);

  // context 밖에서 사용하면 에러
  if (!context) {
    throw new Error(errorMsg.contexts["useUser 오류"]);
  }

  return context;
};

// // 사용 예시
// function PageCard({ page }) {
//   const { canEdit, isReadonly } = useAuth();

//   return (
//     <div className="page-card">
//       {/* 모든 권한에서 보임 */}
//       <PageThumbnail page={page} />

//       {/* owner, editor만 수정 가능 */}
//       {canEdit && <EditButton onClick={handleEdit} />}

//       {/* readonly는 드래그 불가 */}
//       {!isReadonly && <DragHandle />}
//     </div>
//   );
// }

/*
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 1. AuthContext (유저 정보 + 인증 상태)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// contexts/AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const userData = await response.json();
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user,           // userId, email, displayName, avatar 등
      isAuthenticated,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
*/

// TreeView의 펼침/접힘 버튼을 클릭했을 때 실행되는 함수
const handleTreeToggle = (nodeId) => {
  // 재귀적으로 트리 구조를 탐색하며 해당 노드를 찾아 expanded 값을 반전
  // 이 함수는 복잡하지만, 중첩된 배열 구조에서 특정 요소를 찾아 수정하는 패턴입니다
  const toggleNodeInTree = (nodes) => {
    // map()은 배열의 각 요소를 변환하는 함수
    // 기존 배열을 수정하지 않고 새 배열을 반환 (불변성 유지)
    return nodes.map((node) => {
      // 현재 노드가 우리가 찾는 노드인가?
      if (node.id === nodeId) {
        // { ...node }는 "스프레드 연산자"
        // 기존 객체를 복사하고 특정 속성만 덮어쓰는 문법
        // 예: { a: 1, b: 2 } → { ...obj, b: 3 } → { a: 1, b: 3 }
        return {
          ...node,
          expanded: !node.expanded, // expanded 값 반전
        };
      }

      // 현재 노드가 자식 노드를 가지고 있다면
      if (node.children) {
        // 자식 노드들도 재귀적으로 탐색
        return {
          ...node,
          children: toggleNodeInTree(node.children),
        };
      }

      // 해당 없으면 원본 그대로 반환
      return node;
    });
  }; // 전체 트리 데이터를 변환한 결과로 상태 업데이트
  // setTreeData()에 새로운 배열을 전달
};
