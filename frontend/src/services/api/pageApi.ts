/*

현재 usePage.js는 localStorage를 직접 건드리지 않고 DataContext를 통해서만 상태를 변경하고 있어서 구조 자체는 좋습니다. 서버 연동 시에는 usePage.js 안에서만 교체하면 됩니다.
xxxApi.js는 HTTP 호출만, 상태 변경 금지
pageApi.create()가 setPages()를 직접 호출하면 안 됩니다. 상태 변경은 무조건 hook에서만.

// services/api/pageApi.js
import client from './client';

export const pageApi = {
  getAll: (episodeId) => 
    client.get(`/episodes/${episodeId}/pages`),
  
  create: (episodeId, pageData) => 
    client.post(`/episodes/${episodeId}/pages`, pageData),
  
  update: (pageId, pageData) => 
    client.put(`/pages/${pageId}`, pageData),
  
  delete: (pageId) => 
    client.delete(`/pages/${pageId}`),
  
  reorder: (episodeId, pageOrder) => 
    client.patch(`/episodes/${episodeId}/page-order`, { pageOrder }),
};
*/
