"use client"
import { getCheckoutUrl } from "@/lib/stripePayment"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaRegDotCircle } from "react-icons/fa"
import { FaRegCircle } from "react-icons/fa6"

function PlansSelections() {
    const [chosenPlan, setChosenPlan] = useState<"yearly" | "monthly">("yearly");
    const router = useRouter();

    async function handlePaymentUrl() {
        const priceId = chosenPlan === "yearly" ? 
            "price_1Tj71SJpVauCyTQsoElUq8SZ" : 
            "price_1Tj87FJpVauCyTQs01DPMz0e";
        
        const url = await getCheckoutUrl(priceId);

        router.push(url);
    }

    return (
        <div className="flex flex-col justify-between items-center gap-6 w-full">
            <h1 className="font-bold text-2xl md:text-3xl">Choose the plan that fits you</h1>
            <button 
                className={`flex active:transform-none gap-5 w-full max-w-160 bg-[#f3fcf6] border-4 
                            rounded-md p-6 ${chosenPlan === "yearly" ? "border-green-400" : "border-gray-400"}`}
                onClick={() => setChosenPlan("yearly")}>
                {chosenPlan === "yearly" ? <FaRegDotCircle size={24} /> : <FaRegCircle size={24} />}
                <div className="flex flex-col justify-between text-start gap-1 md:gap-2">
                    <h1 className="font-bold md:text-lg">Premium Plus Yearly</h1>
                    <h2 className="font-bold text-xl md:text-2xl">$99.99/year</h2>
                    <h3 className="text-gray-500 text-sm">7-day free trial included</h3>
                </div>
            </button>
            <div className="flex items-center justify-center gap-4">
                <div className="bg-gray-300 h-px w-28"></div>
                <h1>or</h1>
                <div className="bg-gray-300 h-px w-28"></div>
            </div>
            <button 
                className={`flex active:transform-none gap-5 w-full max-w-160 bg-[#f3fcf6] border-4 
                            rounded-md p-6 ${chosenPlan === "monthly" ? "border-green-400" : "border-gray-400"}`}
                onClick={() => setChosenPlan("monthly")}>
                {chosenPlan === "monthly" ? <FaRegDotCircle size={24} /> : <FaRegCircle size={24} />}
                <div className="flex flex-col justify-between text-start gap-1 md:gap-2">
                    <h1 className="font-bold md:text-lg">Premium Monthly</h1>
                    <h2 className="font-bold text-xl md:text-2xl">$9.99/month</h2>
                    <h3 className="text-gray-500 text-sm">No trial included</h3>
                </div>
            </button>
            <div className="flex flex-col justify-center items-center gap-3">
                <button 
                    className="w-74 p-2 bg-green-400 rounded-md"
                    onClick={() => handlePaymentUrl()}>
                    {chosenPlan === "yearly" ? "Start your free 7-day trial" : "Start your first month"}
                </button>
                <h3 className="text-gray-500 text-sm">
                    {chosenPlan === "yearly" ? "Cancel your trial at any time before it ends, and you won't be charged." : "30-day money back guarantee, no questions asked."}
                </h3>
            </div>
        </div>
    )
}

export default PlansSelections