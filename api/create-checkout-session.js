const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { businessType, businessInfo, owners } = req.body;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${businessType} Formation`,
              description: `Business formation service for ${businessType}`,
            },
            unit_amount: 29900, // $299.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/form`,
      metadata: {
        businessType,
        businessInfo: JSON.stringify(businessInfo),
        owners: JSON.stringify(owners)
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
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
          <p>Best regards,<br>Your LegalZoom Clone Team</p>
        `
      });
    }
  }

  res.json({ received: true });
});

module.exports = router; 