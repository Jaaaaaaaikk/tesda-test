import { describe, it, expect } from "vitest";
import { getPool } from "./db";

describe('Database Connection', () => {
    it('should connect to the database', async () => {
        const pool = getPool();
        const connection = await pool.getConnection();
        expect(connection).not.toBeNull();
        connection.release();
    });

    it('should retrieve data from the database', async () => {
        const pool = getPool();
        const [rows] = await pool.query('SELECT 1');
        expect(rows).toBeInstanceOf(Array);
    });
});