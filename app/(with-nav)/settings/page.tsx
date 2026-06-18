"use client"
import { getPortalUrl } from "@/lib/stripePayment"
import { getApp } from "firebase/app"
import { useRouter } from "next/navigation";

function Page() {
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
        <button onClick={() => manageSubscription()}>
          Manage Subscription
        </button>
      </div>
      
    </div>
  )
}

export default Page