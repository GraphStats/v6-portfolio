import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let _db: any = null;

const createDbInstance = () => {
    if (_db) return _db;
    
    if (!databaseUrl) {
        if (process.env.NODE_ENV === 'development') {
            console.warn("⚠️ DATABASE_URL or POSTGRES_URL is not set. Using mock database for local development.");
            const mock: any = new Proxy(() => mock, {
                get: (target, prop) => {
                    if (prop === 'then') return (onFullfilled: any) => onFullfilled([]);
                    return mock;
                },
                apply: () => mock,
            });
            return mock;
        }
        throw new Error("DATABASE_URL or POSTGRES_URL is not set. Please check your environment variables.");
    }
    
    const sql = postgres(databaseUrl, { prepare: false });
    _db = drizzle(sql, { schema });
    return _db;
};

// Use a Proxy to defer initialization until a method is accessed
export const db = new Proxy({} as any, {
    get(target, prop, receiver) {
        // We initialize on any property access
        const instance = createDbInstance();
        return Reflect.get(instance, prop, receiver);
    }
});
