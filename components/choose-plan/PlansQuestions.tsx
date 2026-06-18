import { SlArrowDown } from "react-icons/sl";


function PlansQuestions() {
    return (
        <div className="flex flex-col items-center justify-between w-full gap-7">
            <details className="w-full group border-b border-gray-300 pb-7">
                <summary className="font-semibold text-xl md:text-2xl list-none flex items-center justify-between cursor-pointer">
                    How does the free 7-day trial work?
                    <span className="transition-transform duration-400 group-open:rotate-180">
                        <SlArrowDown />
                    </span>
                </summary>
                <div className="overflow-hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <p className="pt-6">
                            Begin your complimentary 7-day trial with a Summarist annual membership. 
                            You are under no obligation to continue your subscription, and you will only be billed when the trial 
                            period expires. With Premium access, you can learn at your own pace and as frequently as you desire, 
                            and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                        </p>
                    </div>
                </div>
            </details>
            <details className="w-full group border-b border-gray-300 pb-7">
                <summary className="font-semibold text-xl md:text-2xl list-none flex items-center justify-between cursor-pointer">
                    Can I switch subscriptions from monthly to yearly, or yearly to monthly?
                    <span className="transition-transform duration-400 group-open:rotate-180">
                        <SlArrowDown />
                    </span>
                </summary>
                <div className="overflow-hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <p className="pt-6">
                            While an annual plan is active, it is not feasible to switch to a monthly plan. 
                            However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                        </p>
                    </div>
                </div>
            </details>
            <details className="w-full group border-b border-gray-300 pb-7">
                <summary className="font-semibold text-xl md:text-2xl list-none flex items-center justify-between cursor-pointer">
                    What's included in the Premium plan?
                    <span className="transition-transform duration-400 group-open:rotate-180">
                        <SlArrowDown />
                    </span>
                </summary>
                <div className="overflow-hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <p className="pt-6">
                            Premium membership provides you with the ultimate Summarist experience, including unrestricted 
                            entry to many best-selling books high-quality audio, the ability to download titles for offline reading, 
                            and the option to send your reads to your Kindle. 
                        </p>
                    </div>
                </div>
            </details>
            <details className="w-full group border-b border-gray-300 pb-7">
                <summary className="font-semibold text-xl md:text-2xl list-none flex items-center justify-between cursor-pointer">
                    Can I cancel during my trial or subscription?
                    <span className="transition-transform duration-400 group-open:rotate-180">
                        <SlArrowDown />
                    </span>
                </summary>
                <div className="overflow-hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <p className="pt-6">
                            You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the 
                            entire Summarist library, you can still expand your knowledge with one curated book per day.
                        </p>
                    </div>
                </div>
            </details>
            
        </div>
    )
}

export default PlansQuestions