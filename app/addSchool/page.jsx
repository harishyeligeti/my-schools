"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append all text fields
        Object.keys(data).forEach((key) => {
            if (key !== "image") formData.append(key, data[key]);
        });

        // Append file separately
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        const res = await fetch("/api/schools", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            setMessage("School added successfully!");
            reset();

            setTimeout(() => {
                setMessage("");
                setPreview(null);
            }, 3000);
        } else {
            setMessage("Error adding school.");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };
    //handle file chane
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    //home button logic
    const router = useRouter();
    const handleHome = () => {
        router.push("/");
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6">
            <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                <h1 className="text-2xl font-bold">Add School</h1>
                <button className="text-xl font-bold px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition rounded" onClick={handleHome}>
                    Home
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <input placeholder="School Name" {...register("name", { required: true })} className="border p-2 rounded" />
                {errors.name && <span className="text-red-500">Required</span>}

                <input placeholder="Address" {...register("address", { required: true })} className="border p-2 rounded" />

                <input placeholder="City" {...register("city", { required: true })} className="border p-2 rounded" />

                <input placeholder="State" {...register("state", { required: true })} className="border p-2 rounded" />

                <input placeholder="Contact Number" type="number" {...register("contact", { required: true })} className="border p-2 rounded" />

                <input placeholder="Email" type="email" {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} className="border p-2 rounded" />
                {errors.email_id && <span className="text-red-500">Invalid Email</span>}

                {/* File Upload */}
                <input type="file" {...register("image", { required: true })} className="border p-2 rounded" onChange={handleFileChange} />
                {errors.image && <span className="text-red-500">Required</span>}

                {/* Show Preview if Selected */}
                {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded border" />}

                <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded cursor-pointer">
                    Add School
                </button>
            </form>

            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
