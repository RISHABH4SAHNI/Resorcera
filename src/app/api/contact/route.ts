import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { handleApiError } from '@/lib/errorHandler'
import { validateContactInput, sanitizeString } from '@/lib/validation'
import { rateLimit } from '@/lib/rateLimit'
import { ValidationError } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Apply strict rate limiting for contact form
    await rateLimit({ requests: 5, window: 60 })(request)
    const body = await request.json()

    // Validate and sanitize input
    validateContactInput(body)

    const name = sanitizeString(body.name, 100)
    const email = sanitizeString(body.email, 320)
    const subject = sanitizeString(body.subject, 200)
    const message = sanitizeString(body.message, 2000)

    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new ValidationError('Email service is not configured', 500)
    }

    // Create transporter - you'll need to configure this with your email settings
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (error) {
      throw new ValidationError('Email service is not available', 503)
    }

    // Email to you (admin)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'resorcera@gmail.com', // Your email where you want to receive messages
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #CC7722;">New Contact Form Submission</h2>
          <div style="background-color: #F5E6D3; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #8B4513; font-size: 12px;">
            This message was sent from the Resorcera website contact form.
          </p>
        </div>
      `,
    }

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Resorcera!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #CC7722;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>Best regards,<br><strong>The Resorcera Team</strong></p>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)

    return NextResponse.json({ success: true, message: 'Emails sent successfully' })
  } catch (error) {
    return handleApiError(error)
  }
}