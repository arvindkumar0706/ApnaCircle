import { serve } from "inngest/express";
import connectDB from "../configs/db.js";
import { inngest,functions } from "../ingest/index.js";


export default async function handler(req, res) {
    try {
        await connectDB();

        return serve({
            client: inngest,
            functions,
        })(req, res);

    } catch (error) {
        console.error("INNGEST ERROR:", error);
        res.status(500).send("Internal Server Error");
    }
}