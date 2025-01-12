
export const Skeleton = () => {
    return (
        <section>
            <div className='flex flex-col items-center rounded-xl shadow-xl animate-pulse'>
                <div className='rounded-t-xl h-48 w-96 bg-gray-300'></div>
                <div className='w-full px-6 py-3 flex justify-between'>
                    <div className="w-full">
                        <div className='h-6 w-2/4 bg-gray-300 rounded mb-2'></div>
                        <div className='h-4 w-3/4 bg-gray-300 rounded'></div>
                    </div>
                    <div>
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </section >
    )
}
