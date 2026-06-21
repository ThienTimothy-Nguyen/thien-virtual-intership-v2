"use client"
import { getPortalUrl } from "@/lib/stripePayment"
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import { getApp } from "firebase/app"
import { useRouter } from "next/navigation";

function Page() {
  const isSubscribed = useSubscriptionStore(state => state.isSubscribed)
  const app = getApp();
  const router = useRouter()

  async function manageSubscription() {
    const portalUrl = await getPortalUrl(app)
    router.push(portalUrl)
  }
  return (
    <div className='global_container'>
      <div className='row'>
        <h1>Settings</h1>
        {isSubscribed ? 
        <button onClick={() => manageSubscription()}>
          Manage Subscription
        </button> :
        <button onClick={() => router.push("/choose-plan")}>
            Subscribe
        </button>}
      </div>
      
    </div>
  )
}

export default Page