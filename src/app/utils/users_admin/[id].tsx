import { connectdb } from '../models/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return await getUser(req, res);
        case "PUT":
            return await updateUser(req, res);
        default:
            return res.status(400).json({ message: "Bad request" });
    }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    let connection;
    try {
        connection = await connectdb.getConnection();
        const id = Number(req.query.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id parameter" });
        }

        const result: any[] = await connection.execute("SELECT * FROM user WHERE id = ?", [id]);
        return res.status(200).json(result[0]);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (connection) {
            await connection.release();
        }
    }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    let connection;
    try {
        connection = await connectdb.getConnection();
        const { id, role_id } = req.body;
        const userId = Number(id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid id parameter" });
        }

        await connection.execute("UPDATE user SET role = ? WHERE id = ?", [role_id, userId]);
        return res.status(200).json({ message: "Se actualizó correctamente el rol" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (connection) {
            await connection.release();
        }
    }
};
