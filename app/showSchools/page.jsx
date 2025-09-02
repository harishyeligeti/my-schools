"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        fetch("/api/schools")
            .then((res) => res.json())
            .then((data) => setSchools(data?.schools || [])) 
            .catch((err) => {
                console.error("Error fetching schools:", err);
                setSchools([]); 
            });
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4">
            {schools.length > 0 ? (
                schools.map((school) => (
                    <div key={school.id} className="flex flex-col border border-gray-300 rounded-xl bg-white shadow-sm p-4 hover:shadow-2xl hover:scale-105 transition">
                        <img src={`${school.image}`} alt={school.name} className="w-full h-60 object-cover rounded-lg mb-3" />
                        <h3 className="text-lg font-semibold mb-1">{school.name}</h3>
                        <p className="text-gray-600">{school.address}</p>
                        <p className="text-gray-600">{school.city}</p>
                    </div>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500">No schools found</p>
            )}
        </div>
    );
}
