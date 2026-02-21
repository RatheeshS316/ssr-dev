import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const { name, role, rating, quote } = review;
  return (
    <article className="flex flex-col h-full bg-surface border border-slate-800 rounded-2xl p-6
      transition-all duration-200 hover:border-yellow-500/25 hover:shadow-xl group">

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-700'}`} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-slate-300 italic leading-relaxed flex-1 mb-5">"{quote}"</p>

      {/* Divider */}
      <div className="h-px bg-slate-800 mb-4" />

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-indigo-800
          border border-indigo-500/30 flex items-center justify-center
          text-base font-bold text-indigo-300 shrink-0">
          {name?.charAt(0) ?? '?'}
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none mb-1">{name}</p>
          <p className="text-[11px] text-brand font-medium">{role}</p>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
