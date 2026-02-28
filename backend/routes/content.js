import express from 'express';
import { RecentProject } from '../models/RecentProject.js';
import { PortfolioProject } from '../models/PortfolioProject.js';
import { CustomerReview } from '../models/CustomerReview.js';
import { CompanyHistory } from '../models/CompanyHistory.js';
import { authenticate, isAdmin, isMember } from '../middleware/auth.js';

const router = express.Router();

// ========== RECENT PROJECTS ==========

// Get all recent projects (public)
router.get('/projects/recent', async (req, res) => {
  try {
    const projects = RecentProject.getAll();
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get recent project by ID (public)
router.get('/projects/recent/:id', async (req, res) => {
  try {
    const project = RecentProject.getById(parseInt(req.params.id));
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create recent project (Admin only)
router.post('/projects/recent', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, description, image, completionDate, clientName, category } = req.body;

    if (!title || !description || !clientName) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and client name are required',
      });
    }

    const project = await RecentProject.create({
      title,
      description,
      image,
      completionDate,
      clientName,
      category,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Update recent project (Admin only)
router.put('/projects/recent/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const { title, description, image, completionDate, clientName, category } = req.body;

    const project = await RecentProject.update(projectId, {
      title,
      description,
      image,
      completionDate,
      clientName,
      category,
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete recent project (Admin only)
router.delete('/projects/recent/:id', authenticate, isAdmin, (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    RecentProject.delete(projectId);

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// ========== PORTFOLIO PROJECTS ==========

// Get all portfolio projects (public)
router.get('/projects/portfolio', async (req, res) => {
  try {
    const projects = PortfolioProject.getAll();
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get portfolio project by ID (public)
router.get('/projects/portfolio/:id', async (req, res) => {
  try {
    const project = PortfolioProject.getById(parseInt(req.params.id));
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create portfolio project (Admin only)
router.post('/projects/portfolio', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, description, images, technologies, projectLink } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    const project = await PortfolioProject.create({
      title,
      description,
      images,
      technologies,
      projectLink,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully',
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Update portfolio project (Admin only)
router.put('/projects/portfolio/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const { title, description, images, technologies, projectLink } = req.body;

    const project = await PortfolioProject.update(projectId, {
      title,
      description,
      images,
      technologies,
      projectLink,
    });

    res.json({
      success: true,
      message: 'Portfolio project updated successfully',
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete portfolio project (Admin only)
router.delete('/projects/portfolio/:id', authenticate, isAdmin, (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    PortfolioProject.delete(projectId);

    res.json({
      success: true,
      message: 'Portfolio project deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// ========== CUSTOMER REVIEWS ==========

// Get all approved reviews (public)
router.get('/reviews', async (req, res) => {
  try {
    const reviews = CustomerReview.getApproved();
    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all reviews (Admin only)
router.get('/reviews/admin/all', authenticate, isAdmin, async (req, res) => {
  try {
    const reviews = CustomerReview.getAll();
    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get my reviews (Member)
router.get('/reviews/my', authenticate, async (req, res) => {
  try {
    const reviews = CustomerReview.getByUserId(req.user.userId);
    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create review (Member only)
router.post('/reviews', authenticate, isMember, async (req, res) => {
  try {
    const { rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({
        success: false,
        message: 'Rating and message are required',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    const review = await CustomerReview.create({
      userId: req.user.userId,
      userName: req.user.email,
      rating: parseInt(rating),
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully. Pending admin approval.',
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Update own review (Member)
router.put('/reviews/:id', authenticate, async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const review = CustomerReview.getById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Member can only edit their own reviews
    if (review.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own reviews',
      });
    }

    const { rating, message } = req.body;

    const updated = await CustomerReview.update(reviewId, {
      rating: rating || review.rating,
      message: message || review.message,
    });

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete review (Member can delete own, Admin can delete any)
router.delete('/reviews/:id', authenticate, (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const review = CustomerReview.getById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Member can only delete their own reviews
    if (review.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews',
      });
    }

    CustomerReview.delete(reviewId);

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Approve review (Admin only)
router.patch('/reviews/:id/approve', authenticate, isAdmin, (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const review = CustomerReview.approve(reviewId);

    res.json({
      success: true,
      message: 'Review approved successfully',
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// ========== COMPANY HISTORY / ABOUT ==========

// Get company history (public)
router.get('/company-history', async (req, res) => {
  try {
    const history = CompanyHistory.get();
    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update company history (Admin only)
router.put('/company-history', authenticate, isAdmin, async (req, res) => {
  try {
    const updated = await CompanyHistory.update(req.body);

    res.json({
      success: true,
      message: 'Company history updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
