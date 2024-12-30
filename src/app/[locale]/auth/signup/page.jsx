import { SignupForm } from '@/components/auth/SignupForm'
import SvgBlob from '@/components/ui/svg-blob'
import SvgBlobContainer from '@/components/ui/svg-blob-container'
import React from 'react'

const SignupPage = () => {
    return (
        <section className="h-screen">
            <SvgBlobContainer top={true}>
                <SvgBlob color={"blue"} />
            </SvgBlobContainer>
            <div className="flex justify-center items-center">
                <SignupForm />
            </div>
            <SvgBlobContainer top={false}>
                <SvgBlob color={"green"} />
            </SvgBlobContainer>
        </section>
    )
}

export default SignupPage