import type { NormalizedStore } from 'types/store';

const DB_NAME    = 'plotnote_db';
const DB_VERSION = 1;
const STORE_NAME = 'normalized_store';
const STORE_KEY  = 'main';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      (e.target as IDBOpenDBRequest).result.createObjectStore(STORE_NAME);
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
