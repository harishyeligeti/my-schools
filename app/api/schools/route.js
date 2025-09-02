import { NextResponse } from "next/server";
import pool from "../../lib/db";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT id, name, address, city, state, contact, email_id, image FROM schools");
        return NextResponse.json({ schools: rows }, { status: 200 });
    } catch (err) {
        console.error("GET Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const address = formData.get("address");
        const city = formData.get("city");
        const state = formData.get("state");
        const contact = formData.get("contact");
        const email_id = formData.get("email_id");
        const imageFile = formData.get("image");

        if (!imageFile || !imageFile.size) {
            return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
        }

        // Convert image to Base64
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        // Upload to ImgBB
        const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
            method: "POST",
            body: new URLSearchParams({
                image: base64Image,
            }),
        });

        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
            throw new Error("Image upload failed");
        }

        const imageUrl = uploadData.data.url;

        // Insert into database (store the image URL instead of file name)
        await pool.execute("INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, address, city, state, contact, email_id, imageUrl]);

        return NextResponse.json({ message: "School added successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
