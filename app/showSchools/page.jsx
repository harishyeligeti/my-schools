"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        fetch("/api/schools")
            .then((res) => res.json())
            .then((data) => setSchools(data.schools));
    }, []);

    return (
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-6 p-6 w-full">
            {schools.map((school) => (
                <div key={school.id} className="border border-gray-300 rounded-xl bg-white shadow-sm p-4 flex flex-col">
                    <img src={`/schoolImages/${school.image}`} alt={school.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                    <h3 className="text-lg font-semibold mb-1">{school.name}</h3>
                    <p className="text-gray-600">{school.address}</p>
                    <p className="text-gray-600">{school.city}</p>
                </div>
            ))}
        </div>
    );
}
