"use client"
import PlansFeatures from '@/components/choose-plan/PlansFeatures';
import PlansQuestions from '@/components/choose-plan/PlansQuestions';
import PlansSelections from '@/components/choose-plan/PlansSelections';
import Footer from '@/components/homepage/Footer';
import { useAuthModalStore } from '@/store/AuthModalStore';
import { useSubscriptionStore } from '@/store/SubscriptionStore';
import { useEffect } from 'react';


function Page() {
    const needAccountUpgrade = useSubscriptionStore(state => state.needAccountUpgrade);
    const openAuthModal= useAuthModalStore(state => state.openAuthModal);
    const isOpen = useAuthModalStore(state => state.isOpen)

    useEffect(() => {
        if (needAccountUpgrade && !isOpen) openAuthModal()
    }, [needAccountUpgrade, isOpen,openAuthModal])

    return (
        <div>
            <div className='flex flex-col justify-between items-center'>
                <PlansFeatures />
                <div className='global_container'>
                    <div className='row flex flex-col justify-between items-center gap-14'>
                        <PlansSelections />
                        <PlansQuestions />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page