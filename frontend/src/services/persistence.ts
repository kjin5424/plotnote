import type { NormalizedStore } from 'types/store';

const DB_NAME    = 'plotnote_db';
const DB_VERSION = 1;
const STORE_NAME = 'normalized_store';
const STORE_KEY  = 'main';

export function classifyDbError(err: unknown): string {
  if (err instanceof DOMException) {
    if (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      return '저장 공간이 부족합니다. 불필요한 데이터를 정리해 주세요.';
    }
    if (err.name === 'SecurityError') {
      return '브라우저 설정이 로컬 저장을 차단하고 있습니다. 개인정보 보호 설정을 확인해 주세요.';
    }
  }
  return '데이터 저장 중 오류가 발생했습니다.';
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      // v1: 초기 스토어 생성
      if (e.oldVersion < 1) {
        db.createObjectStore(STORE_NAME);
      }
      // v2+: 스키마 변경 시 아래에 마이그레이션 블록 추가
      // if (e.oldVersion < 2) { ... }
    };
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
    req.onerror   = (e) => reject((e.target as IDBOpenDBRequest).error);
  });
}

export async function saveToLocal(store: NormalizedStore): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE_NAME, 'readwrite');
    const req = tx.objectStore(STORE_NAME).put(store, STORE_KEY);
    req.onsuccess = () => resolve();
    req.onerror   = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
}

export async function loadStore(): Promise<NormalizedStore | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(STORE_KEY);
    req.onsuccess = (e) => {
      db.close();
      resolve((e.target as IDBRequest<NormalizedStore | undefined>).result ?? null);
    };
    req.onerror = (e) => reject((e.target as IDBRequest).error);
  });
}

export async function clearStore(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE_NAME, 'readwrite');
    const req = tx.objectStore(STORE_NAME).delete(STORE_KEY);
    req.onsuccess = () => resolve();
    req.onerror   = (e) => reject((e.target as IDBRequest).error);
    tx.oncomplete = () => db.close();
  });
}

function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export const debouncedSave = debounce(saveToLocal, 500);
