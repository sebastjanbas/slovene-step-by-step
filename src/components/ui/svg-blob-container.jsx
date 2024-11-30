export default function SvgBlobContainer({ top, children }) {
    return (
        <>
            {top ? (
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    {children}
                </div>
            ) : (
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    {children}
                </div>
            )}
        </>
    );
};
