import { serve } from "inngest/express";
import { inngest, functions } from "../ingest/index.js";
import connectDB from "../configs/db.js";

let isConnected = false;

export default async function handler(req, res) {
  try {
    // Ensure DB connects only once
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("DB connected in Vercel function");
    }

    return serve({
      client: inngest,
      functions,
    })(req, res);

  } catch (error) {
    console.error("Inngest Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}