import { BackArrowButton } from '@/components/auth/BackArrowButton'
import { Disclaimer } from '@/components/auth/Disclaimer'

const AuthLayout = ({ children }) => {

    return (
        <div className='m-0 h-screen w-screen flex md:flex-row-reverse flex-col'>
            <div className='hidden md:flex md:h-full w-full bg-indigo-500'>
            </div>
            <div className='h-full flex flex-col w-full'>
                <div className='flex items-center py-4 px-8'>
                    <BackArrowButton />
                </div>
                <div className='h-full w-full'>
                    {children}
                </div>
                <Disclaimer />
            </div>
        </div>
    )
}

export default AuthLayout