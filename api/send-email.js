const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const express = require('express');
const router = express.Router();
const cors = require('cors');

// Middleware to parse JSON request bodies
router.use(express.json());

// Configure CORS
router.use(cors({
    origin: '*' // Allow requests from any origin
}));

// Endpoint to send email
router.post('/send', async (req, res) => {
    const { to, subject, html } = req.body;

    const msg = {
        to: to,
        from: process.env.EMAIL_USER, // Use the email address verified in SendGrid
        subject: subject,
        html: html,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body)
        }
        res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
    }
});

// Webhook to handle successful payments and send emails
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { businessInfo, owners } = session.metadata;

    // Send confirmation email to all owners
    const ownersList = JSON.parse(owners);
    for (const owner of ownersList) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: owner.email,
        subject: 'Your Business Formation Process Has Started',
        html: `
          <h1>Thank you for starting your business formation process!</h1>
          <p>Dear ${owner.name},</p>
          <p>We have received your payment and will begin processing your ${JSON.parse(businessInfo).businessType} formation.</p>
          <p>Business Details:</p>
          <ul>
            <li>Business Name: ${JSON.parse(businessInfo).businessName}</li>
            <li>Business Type: ${JSON.parse(businessInfo).businessType}</li>
            <li>Business Address: ${JSON.parse(businessInfo).businessAddress}</li>
          </ul>
          <p>We will keep you updated on the progress of your formation.</p>
          <p>Best regards,<br>Your LLC-671 Team</p>
        `
      });
    }
  }

  res.json({ received: true });
});

module.exports = router; 