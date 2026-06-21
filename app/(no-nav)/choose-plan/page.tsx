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
    const currentUser = useAuthModalStore(state => state.currentUser);
    const isOpen = useAuthModalStore(state => state.isOpen);
    const isAuthLoading = useAuthModalStore(state => state.isAuthLoading)
    const openAuthModal= useAuthModalStore(state => state.openAuthModal);

    useEffect(() => {
        if (isAuthLoading) return
        if ((needAccountUpgrade || !currentUser) && !isOpen) {
            openAuthModal()
        }
    }, [needAccountUpgrade, isOpen, openAuthModal, isAuthLoading,currentUser])

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