import TripReviewForm from '@/components/Reviews/TripReviewForm';
import React, { Suspense } from 'react'; // 1. Import Suspense

const Review = () => {
    return (
        <div>
             {/* 2. Wrap the form in Suspense */}
             <Suspense fallback={<div>Loading review form...</div>}>
                <TripReviewForm/>
             </Suspense>
        </div>
    );
};

export default Review;