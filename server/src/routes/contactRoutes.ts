import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { sendContactFormEmail } from '../services/mailService';
import axios from 'axios';



const router = Router();

// Rate limiter for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

// Validation rules
const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('message').isLength({ max: 1000 }).withMessage('Message too long'),
  body('turnstileToken').notEmpty().withMessage('Verification required'),
];

// Contact form endpoint
router.post(
  '/contact',
  contactLimiter,
  validateContactForm,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Check validation results
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
        return;
      }

      const { name, email, subject, message, turnstileToken } = req.body;

      // Verify Turnstile
      if (process.env.ENABLE_TURNSTILE === 'true') {
        const verify = await axios.post(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY || '',
            response: turnstileToken,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        if (!verify.data.success) {
          res.status(400).json({
            success: false,
            message: 'Verification failed. Please try again.',
          });
          return;
        }
      }

      // Send email using Brevo
      await sendContactFormEmail({ name, email, subject, message });

      res.status(200).json({
        success: true,
        message: 'Message sent successfully',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  }
);

export default router;