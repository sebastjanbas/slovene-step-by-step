import { BackArrowButton } from '@/components/auth/BackArrowButton'
import { Disclaimer } from '@/components/auth/Disclaimer'
import { SplitScreen } from '@/components/auth/splitscreen'

const AuthLayout = ({ children }) => {

    return (
        <div className='bg-white dark:bg-[#121212] m-0 h-screen w-screen flex md:flex-row-reverse flex-col'>
            <SplitScreen>

            </SplitScreen>
            <div className='h-full flex flex-col w-full'>
                <div className='flex items-center py-4 px-8'>
                    <BackArrowButton />
                </div>
                <div className='h-full w-full'>
                    {children}
                    <Disclaimer />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout