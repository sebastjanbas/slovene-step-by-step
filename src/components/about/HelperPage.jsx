"use client";
import Card from "@/components/about/Card";

export default function People({ people }) {

    return (
        <div className="mx-auto w-full px-8">
            <ul
                role="list"
                className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
                {people.map((person) => (
                    <li key={person.id}>
                        <Card
                            person={person}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
