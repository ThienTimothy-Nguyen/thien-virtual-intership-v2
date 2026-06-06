"use client"
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

function page() {

    const router = useRouter()

    function handleSignOut() {
        signOut(auth)
    }

  return (
    <>
        <div>This is for you</div>
        <button onClick={() => handleSignOut()}>Sign out</button>
    </>
  )
}

export default page