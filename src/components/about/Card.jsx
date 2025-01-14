"use client";

function Card({ person }) {

    return (
        <div className="flex flex-col items-center gap-3 justify-center text-center">
            <div>
                <img
                    className="size-24 rounded-full object-cover shadow-lg"
                    src={person.imageUrl}
                    alt={person.name}
                />
            </div>
            <div>
                <h3 className="font-semibold">{person.name[0] + " " + person.name[1]}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-600">{person.role}</p>
            </div>

        </div>
    );
}

export default Card;
