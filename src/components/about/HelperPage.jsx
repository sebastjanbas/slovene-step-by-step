"use client";
import Card from "@/components/about/Card";

export default function People({ people }) {

    return (
        <div className="mx-auto w-full px-8">
            <ul
                role="list"
                className="flex items-center justify-evenly flex-wrap gap-10"
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
