import { Star } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import ReviewCard from '../components/ReviewCard';

const REVIEWS = [
  { name: 'John Doe',     role: 'CEO, ABC Corp',        rating: 5, quote: 'Professional team delivered our project on time and beyond expectations!' },
  { name: 'Sarah Smith',  role: 'Product Manager',      rating: 5, quote: 'Excellent code quality, great communication, and top-notch support throughout.' },
  { name: 'Michael Lee',  role: 'Startup Founder',      rating: 5, quote: 'Modern, clean design and rock-solid implementation. Highly recommended!' },
  { name: 'Priya Sharma', role: 'Marketing Director',   rating: 5, quote: 'They turned our complex idea into a beautiful, functional product. Fantastic team!' },
  { name: 'Raj Kumar',    role: 'CTO, EdTech Startup',  rating: 5, quote: 'Technical expertise is outstanding. Delivered a scalable system effortlessly.' },
  { name: 'Emily Watson', role: 'HR Manager',           rating: 4, quote: 'Very responsive and professional. The AI resume tool saved us countless hours.' },
];

const avg = (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1);

const ReviewPage = () => (
  <div className="page-container pt-16 pb-24">

    {/* Rating hero banner */}
    <FadeInSection>
      <div className="bg-gradient-to-r from-yellow-500/10 to-brand/8 border border-yellow-500/20
        rounded-2xl flex flex-col items-center py-10 px-6 text-center mb-10">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
        </div>
        <p className="text-5xl sm:text-6xl font-black text-white mb-1">{avg}</p>
        <p className="text-sm text-slate-400 mb-4">
          Average across <strong className="text-slate-200">{REVIEWS.length} reviews</strong>
        </p>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
          What Our <span className="gradient-text">Clients Say</span>
        </h1>
      </div>
    </FadeInSection>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {REVIEWS.map((review, i) => (
        <FadeInSection key={review.name} delay={i * 70}>
          <ReviewCard review={review} />
        </FadeInSection>
      ))}
    </div>
  </div>
);

export default ReviewPage;
