"use client";
import Card from "@/components/about/Card";
import { useState } from "react";
import DialogAbout from "./DialogAbout";

export default function HelperPage({ people, link }) {
    const [memberDetailsOpen, setMemberDetailsOpen] = useState(false);
    const [member, setMember] = useState(null);

    const chosenPerson = people.find(person => person.id === member);

    return (
        <div className="mx-auto max-w-7xl lg:px-8">
            <ul
                role="list"
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 xl:grid-cols-3"
            >
                {people.map((person) => (
                    <li key={person.id}>
                        <Card
                            setMember={setMember}
                            link={link}
                            person={person}
                            setMemberDetailsOpen={setMemberDetailsOpen}
                        />
                    </li>
                ))}
            </ul>
            <DialogAbout
                person={chosenPerson}
                link={link}
                memberDetailsOpen={memberDetailsOpen}
                setMemberDetailsOpen={setMemberDetailsOpen}
            />
        </div>
    );
}
