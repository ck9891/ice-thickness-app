const CACHE_NAME = 'ice-fishing-safety-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('sync', event => {
  if (event.tag === 'sync-ice-thickness-data') {
    event.waitUntil(syncIceThicknessData());
  }
});

async function syncIceThicknessData() {
  const data = await getLocalIceThicknessData();
  for (const item of data) {
    try {
      await fetch('/ice-thickness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${item.token}`
        },
        body: JSON.stringify(item)
      });
      await removeLocalIceThicknessData(item.id);
    } catch (error) {
      console.error('Failed to sync ice thickness data:', error);
    }
  }
}

function getLocalIceThicknessData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ice-fishing-safety-app', 1);
    request.onsuccess = event => {
      const db = event.target.result;
      const transaction = db.transaction(['iceThicknessData'], 'readonly');
      const store = transaction.objectStore('iceThicknessData');
      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
      getAllRequest.onerror = () => {
        reject(getAllRequest.error);
      };
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

function removeLocalIceThicknessData(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ice-fishing-safety-app', 1);
    request.onsuccess = event => {
      const db = event.target.result;
      const transaction = db.transaction(['iceThicknessData'], 'readwrite');
      const store = transaction.objectStore('iceThicknessData');
      const deleteRequest = store.delete(id);
      deleteRequest.onsuccess = () => {
        resolve();
      };
      deleteRequest.onerror = () => {
        reject(deleteRequest.error);
      };
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}
