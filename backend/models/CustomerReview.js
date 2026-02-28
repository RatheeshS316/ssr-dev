// In-memory database for Customer Reviews
let customerReviews = [];
let customerReviewIdCounter = 1;

export const CustomerReview = {
  // Create
  create: async (data) => {
    const review = {
      id: customerReviewIdCounter++,
      userId: data.userId,
      userName: data.userName,
      rating: data.rating, // 1-5
      message: data.message,
      isApproved: false, // Pending admin approval
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    customerReviews.push(review);
    return review;
  },

  // Get all
  getAll: () => {
    return customerReviews.map(r => ({ ...r }));
  },

  // Get approved only (public)
  getApproved: () => {
    return customerReviews.filter(r => r.isApproved).map(r => ({ ...r }));
  },

  // Get by ID
  getById: (id) => {
    return customerReviews.find(r => r.id === id);
  },

  // Get by user ID
  getByUserId: (userId) => {
    return customerReviews.filter(r => r.userId === userId);
  },

  // Update
  update: async (id, data) => {
    const index = customerReviews.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Review not found');
    
    customerReviews[index] = {
      ...customerReviews[index],
      ...data,
      updatedAt: new Date(),
    };
    return customerReviews[index];
  },

  // Approve (admin only)
  approve: (id) => {
    const review = customerReviews.find(r => r.id === id);
    if (!review) throw new Error('Review not found');
    review.isApproved = true;
    review.updatedAt = new Date();
    return review;
  },

  // Delete
  delete: (id) => {
    const index = customerReviews.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Review not found');
    customerReviews.splice(index, 1);
  },
};

export default CustomerReview;
