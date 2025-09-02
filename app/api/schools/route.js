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

        // Convertingg File to Buffer
        const arrayBuffer = await imageFile.arrayBuffer(); 
        const buffer = Buffer.from(arrayBuffer);

        // Save file in public/schoolImages
        const fileName = `${Date.now()}-${imageFile.name}`;
        const filePath = path.join(process.cwd(), "public", "schoolImages", fileName);
        await fs.writeFile(filePath, buffer);

        // Insert into database
        await pool.execute("INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, address, city, state, contact, email_id, fileName]);

        return NextResponse.json({ message: "School added successfully!" });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: "Error adding school" }, { status: 500 });
    }
}
