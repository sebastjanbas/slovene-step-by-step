import Link from 'next/link'

export const Disclaimer = () => {
    return (
        <div className="absolute bottom-0 w-full md:max-w-[50%] mb-6">
            <div className='flex items-center justify-center px-10'>
                <p className='text-center text-sm text-gray-500 dark:text-gray-500'>Slovene step by step uses cookies for analytics, personalized content and ads. By using Slovene step by step's services you agree to this use of cookies.
                    <Link href={"/legal/terms-of-service"} className="font-medium text-gray-800 dark:text-gray-300 hover:underline px-2 text-nowrap">Learn more</Link>
                </p>
            </div>
        </div>
    )
}
