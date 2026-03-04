import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TripReviewForm from '../Reviews/TripReviewForm';
import { Star } from 'lucide-react';

const MySwal = withReactContent(Swal);

// Inside your component
const handleReview = (trip) => {
  MySwal.fire({
    title: <h2 className="text-xl font-black text-slate-800">Rate your trip to {trip.destination}</h2>,
    html: (
      <TripReviewForm 
        tripId={trip._id} 
        onSuccess={() => MySwal.close()} 
      />
    ),
    showConfirmButton: false, // Let your form handle the submit button
    showCloseButton: true,
    customClass: {
      popup: 'rounded-[2.5rem] p-8',
    }
  });
};

// Updated Button in your list
<button 
  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all"
  onClick={() => handleReview(trip)}
>
  <Star size={16} /> Write Review
</button>