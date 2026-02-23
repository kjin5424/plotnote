// axios 인스턴스 (baseURL, 인터셉터)
// client.js는 설정만, 비즈니스 로직 금지
// 인터셉터에 "특정 API일 때 이렇게 해"같은 코드 넣으면 나중에 지옥입니다.

/*
// services/api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터 (토큰 자동 주입)
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터 (에러 공통 처리)
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
    }
    return Promise.reject(error);
  }
);

export default client;
*/