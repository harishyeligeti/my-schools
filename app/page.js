"use client";
import { useRouter } from "next/navigation";
import AddSchool from "./addSchool/page";
import ShowSchools from "./showSchools/page";

export default function Home() {
  const router = useRouter()
  const handleSubmit =()=>{
    router.push("/addSchool")
  }
    return (
        <div className="max-w-[90vw] mx-auto p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center md:text-left">My Schools</h1>
                <button onClick={handleSubmit} className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition cursor-pointer">Add New School</button>
            </div>

            {/* Schools Grid */}
            <div className="">
                <ShowSchools />
            </div>
        </div>
    );
}
