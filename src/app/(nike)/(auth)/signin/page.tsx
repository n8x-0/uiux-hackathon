import SignInComp from '@/components/auth/signin'
import { SessionProvider } from 'next-auth/react'

const SignInPage = () => {
    return (
        <SessionProvider>
            <SignInComp />
        </SessionProvider>
    )
}

export default SignInPage