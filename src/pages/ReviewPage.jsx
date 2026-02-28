import { useState, useEffect } from 'react';
import { Star, AlertCircle, CheckCircle } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import ReviewCard from '../components/ReviewCard';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const ReviewPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(null);
        const res = await api.get('/api/reviews');
        if (res.data.success) {
          setReviews(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [submitSuccess]);

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setSubmitError('You must be logged in to submit a review');
      return;
    }

    if (!message.trim()) {
      setSubmitError('Please enter a message');
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    try {
      const res = await api.post('/api/reviews', {
        rating: parseInt(rating),
        message: message.trim(),
      });

      if (res.data.success) {
        setSubmitSuccess(true);
        setMessage('');
        setRating(5);

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(res.data.message || 'Failed to submit review');
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const avg = reviews.length > 0 ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '5.0';

  return (
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
            Average across <strong className="text-slate-200">{reviews.length} reviews</strong>
          </p>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
            What Our <span className="gradient-text">Clients Say</span>
          </h1>
        </div>
      </FadeInSection>

      {/* Error/Success Messages */}
      {error && (
        <FadeInSection>
          <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>Failed to load reviews: {error}</p>
          </div>
        </FadeInSection>
      )}

      {/* Review Submission Form - for logged-in members */}
      {user && (
        <FadeInSection>
          <div className="mb-12 p-6 bg-surface border border-slate-800/50 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Share Your Experience</h2>

            {submitSuccess && (
              <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-700/50 rounded-lg text-green-300 mb-6">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p>Review submitted successfully! It will be visible after admin approval.</p>
              </div>
            )}

            {submitError && (
              <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 mb-6">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-2 bg-surface2 border border-slate-700 rounded-lg text-white focus:border-brand"
                >
                  <option value="5">★★★★★ Excellent</option>
                  <option value="4">★★★★☆ Good</option>
                  <option value="3">★★★☆☆ Average</option>
                  <option value="2">★★☆☆☆ Fair</option>
                  <option value="1">★☆☆☆☆ Poor</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Your Review</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your experience with us..."
                  rows="4"
                  className="w-full px-4 py-2 bg-surface2 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-brand focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-2 bg-brand hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </FadeInSection>
      )}

      {/* Login prompt for non-logged-in users */}
      {!user && (
        <FadeInSection>
          <div className="mb-12 p-6 bg-blue-900/10 border border-blue-700/50 rounded-2xl text-center">
            <p className="text-slate-400 mb-4">
              Want to share your experience? <strong className="text-white">Log in</strong> to submit a review.
            </p>
          </div>
        </FadeInSection>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-slate-400">
          Loading reviews...
        </div>
      )}

      {/* Reviews Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <FadeInSection key={review.id} delay={i * 70}>
              <ReviewCard review={review} />
            </FadeInSection>
          ))}
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p>No reviews yet. Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
