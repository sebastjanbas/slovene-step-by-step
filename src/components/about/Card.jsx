// import Link from "next/link";

function Card({ person, setMemberDetailsOpen, setMember }) {


    const handleClick = () => {
        setMemberDetailsOpen(true);
        setMember(person.id)
    }

    return (
        // <div className="flex justify-evenly shadow-xl border rounded-2xl min-h-60 max-w-96 min-w-64 sm:transition-all sm:duration-300 sm:hover:translate-y-[-5px]">
        <div className="flex bg-white dark:bg-transparent gap-x-2 md:gap-x-6 lg:gap-x-10 shadow-xl border rounded-2xl min-h-60 max-w-96 min-w-64 sm:transition-all sm:duration-300 sm:hover:translate-y-[-5px]">
            <div className="flex flex-col items-start mt-5 mb-5 ml-5 justify-between">
                <img
                    alt="Profile photo"
                    src={person.imageUrl}
                    className="size-20 rounded-full"
                />
                {/* <Link
                    href="#"
                    className="text-sm/6 font-semibold text-gray-900"
                    onClick={() => setMemberDetailsOpen(true)}
                >
                    About <span aria-hidden="true">&rarr;</span>
                </Link> */}
                <button
                    typeof="button"
                    className="text-sm/6 font-semibold text-gray-900 dark:text-gray-200"
                    onClick={handleClick}
                >
                    About <span aria-hidden="true">&rarr;</span>
                </button>
            </div>
            <div className="mt-5 mr-5 mb-5">
                <h3 className="text-lg/normal font-semibold tracking-tight text-gray-900 dark:text-gray-200 m-0">
                    {person.name[0]}
                </h3>
                <h3 className="text-2xl/none font-semibold tracking-tight text-gray-900 dark:text-gray-200 mb-5">
                    {person.name[1]}
                </h3>
                <div className="text-sm/6 font-semibold text-indigo-600 dark:text-indigo-300 flex gap-1 items-center">
                    <p>{person.role}</p>
                </div>
                <div className="text-sm/6 font-semibold text-gray-500 dark:text-gray-300">
                    <p>Speaking:</p>
                    {person.fluentIn.map((item) => (
                        <span key={item} className="flex gap-2 items-center">
                            <img
                                src={`/checkmark.svg`}
                                alt="checkmark"
                                className="size-4"
                            />
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;
