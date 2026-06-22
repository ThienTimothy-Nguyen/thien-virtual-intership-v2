"use client"
import { getPortalUrl } from "@/lib/stripePayment"
import { useAuthModalStore } from "@/store/AuthModalStore";
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import { getApp } from "firebase/app"
import { useRouter } from "next/navigation";

function Page() {
  const isSubscribed = useSubscriptionStore(state => state.isSubscribed);
  const currentUser = useAuthModalStore(state => state.currentUser);
  const app = getApp();
  const router = useRouter();
  const openAuthModal = useAuthModalStore(state => state.openAuthModal);

  async function manageSubscription() {
    const portalUrl = await getPortalUrl(app)
    router.push(portalUrl)
  }

  if (!currentUser) {
    return (
      <div className="global_container">
        <div className="row flex flex-col justify-between">
          <h1 className="text-2xl md:text-4xl font-bold border-b border-gray-300 pb-4">
            Settings
          </h1>
          <div className="flex flex-col justify-between items-center gap-3">
            <figure className="max-w-160">
              <img 
                className="w-full"
                src="./assets/login.png" alt="login_img" />
            </figure>
            <h2 className="text-xl md:text-2xl font-bold text-center">Log in to your account to see your details.</h2>
            <button 
              onClick={() => openAuthModal()}
              className="w-48 p-2 bg-green-400 rounded-md hover:bg-green-500 transition-colors ease-in-out">
                Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='global_container'>
      <div className='row flex flex-col gap-6'>
        <h1 className="text-2xl md:text-4xl font-bold border-b border-gray-300 pb-4">
          Settings
        </h1>
        <div className="text-lg flex flex-col gap-2 border-b border-gray-300 pb-4">
          <h2 className="font-bold">
            Your Subscription Plan
          </h2>
          <h2 className="">
            {isSubscribed ? "Premium" : "Basic"}
          </h2>
          {isSubscribed ? 
          <button  
            onClick={() => manageSubscription()}
            className="w-48 p-2 bg-green-400 rounded-md hover:bg-green-500 transition-colors ease-in-out">
            Manage Subscription
          </button> :
          <button 
            onClick={() => router.push("/choose-plan")}
            className="w-48 p-2 bg-green-400 rounded-md hover:bg-green-500 transition-colors ease-in-out">
              Upgrade to Premium
          </button>}
        </div>
        {currentUser.email ? 

        <div className="text-lg">
          <h2 className="font-bold">Acount</h2>
          <h2>Email: {currentUser.email}</h2>
        </div> :

        <div className="text-lg">
          <h2 className="font-bold">Account</h2>
          <h2>Guest</h2>
        </div>}
      </div>
      
    </div>
  )
}

export default Page