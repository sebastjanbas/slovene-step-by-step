import Link from "next/link";

const people = [
    {
        id: 1,
        name: ["Oleksandr", "Tyutyunnyk"],
        role: "CEO / Main Teacher",
        fluentIn: ["Slovene", "English", "Russian"],
        imageUrl: "/foto-oleksandr3.jpg",
    },
    {
        id: 2,
        name: ["Manca", "Levašič"],
        role: "Professional Teacher",
        fluentIn: ["Slovene", "English"],
        imageUrl: "https://placehold.co/600x600",
    },
    {
        id: 3,
        name: ["Teja", "Šabec"],
        role: "Professional Teacher",
        fluentIn: ["Slovene", "English"],
        imageUrl: "https://placehold.co/600x600",
    },
];

export default function MeetTheTeamPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-xl mb-10">
                    <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        Meet our Team
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        We're a dynamic group of individuals who are passionate about what
                        we do and dedicated to delivering the best results for our clients.
                    </p>
                </div>
                <ul
                    role="list"
                    className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 xl:grid-cols-3"
                >
                    {people.map((person) => (
                        <li key={person.id}>
                            <div className="flex gap-x-6 shadow-xl border rounded-2xl h-60 max-w-96 sm:transition-all sm:duration-300 sm:hover:translate-y-[-5px]">
                                <div className="flex flex-col items-start m-5 justify-between">
                                    <img
                                        alt="Profile photo"
                                        src={person.imageUrl}
                                        className="size-20 rounded-full"
                                    />
                                    <Link
                                        href="#"
                                        className="text-sm/6 font-semibold text-gray-900"
                                    >
                                        About <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                                <div className="m-5">
                                    <h3 className="text-lg/normal font-semibold tracking-tight text-gray-900 m-0">
                                        {person.name[0]}
                                    </h3>
                                    <h3 className="text-2xl/none font-semibold tracking-tight text-gray-900 mb-5">
                                        {person.name[1]}
                                    </h3>
                                    <div className="text-sm/6 font-semibold text-indigo-600 flex gap-1 items-center">
                                        <p>{person.role}</p>
                                    </div>
                                    <div className="text-sm/6 font-semibold text-gray-500">
                                        <p>Speaking:</p>
                                        {person.fluentIn.map((item) => (
                                            <span key={item} className="flex gap-2 items-center">
                                                <img
                                                    src={"/checkmark.svg"}
                                                    alt="checkmark"
                                                    className="size-4"
                                                />
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
