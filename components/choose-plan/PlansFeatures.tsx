import { FaHandshake } from "react-icons/fa6"
import { IoDocumentTextSharp } from "react-icons/io5"
import { RiPlantFill } from "react-icons/ri"


function PlansFeatures() {
    return (
        <div className="row flex flex-col items-center justify-between gap-12">
            <div className=" pt-10 flex flex-col gap-8 justify-between items-center text-white text-center bg-[#0B2A4A] md:rounded-b-[280px] w-screen">
                <h1 className="text-3xl md:text-5xl font-extrabold">
                   Get unlimited access to many amazing books to read 
                </h1>
                <h2 className="text-md md:text-2xl">
                    Turn ordinary moments into amazing learning opportunities  
                </h2>
                <figure className="max-w-[50%] rounded-t-[280px] overflow-hidden">
                    <img loading="lazy" className="w-full" src="/assets/pricing-top.png" alt="planImage" />
                </figure>
            </div>
            <div className="flex flex-col gap-6 text-lg">
                <div className="flex flex-col justify-center items-center gap-4">
                    <IoDocumentTextSharp size={60} color="#0B2A4A" />
                    <h2 className="">
                        <strong>Key ideas in few min</strong> with many books to read
                    </h2>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <RiPlantFill size={60} color="#0B2A4A" />
                    <h2>
                        <strong>3 million</strong> people growing with Summarist everyday
                    </h2> 
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <FaHandshake size={60} color="#0B2A4A" />
                    <h2>
                        <strong>Precise recommendations</strong> collections curated by experts
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default PlansFeatures