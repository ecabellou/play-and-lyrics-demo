import { openDB } from 'idb';

const DB_NAME = 'lyrics-sync-db';
const DB_VERSION = 1;
const STORE_SONGS = 'songs';

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_SONGS)) {
                const store = db.createObjectStore(STORE_SONGS, { keyPath: 'id' });
                store.createIndex('title', 'title', { unique: false });
                store.createIndex('updatedAt', 'updatedAt', { unique: false });
            }
        },
    });
};

export const songService = {
    async getAll() {
        const db = await initDB();
        return db.getAllFromIndex(STORE_SONGS, 'updatedAt');
    },

    async getById(id) {
        const db = await initDB();
        return db.get(STORE_SONGS, id);
    },

    async save(song) {
        const db = await initDB();
        const cleanSong = {
            ...song,
            updatedAt: Date.now(),
            scrollData: song.scrollData || [],
        };
        await db.put(STORE_SONGS, cleanSong);
        return cleanSong;
    },

    async delete(id) {
        const db = await initDB();
        return db.delete(STORE_SONGS, id);
    }
};
