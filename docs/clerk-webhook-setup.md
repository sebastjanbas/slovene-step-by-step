# Clerk Webhook Setup for Welcome Emails

This document explains how to set up the Clerk webhook to automatically send welcome emails when new users sign up.

## Overview

The webhook endpoint `/api/clerk/webhook` handles Clerk's `user.created` events and sends a personalized welcome email using Resend.

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Clerk Webhook Secret (get this from Clerk Dashboard)
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Resend API Key (get this from Resend Dashboard)
RESEND_API_KEY=re_your_resend_api_key_here
```

## Setting up the Webhook in Clerk Dashboard

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Webhooks** in the sidebar
3. Click **Add Endpoint**
4. Configure the webhook:
   - **Endpoint URL**: `https://your-domain.com/api/clerk/webhook`
   - **Events**: Select `user.created`
   - **Version**: Choose the latest version
5. Copy the **Signing Secret** and add it to your environment variables as `CLERK_WEBHOOK_SECRET`

## Setting up Resend

1. Go to your [Resend Dashboard](https://resend.com/)
2. Get your API key from the **API Keys** section
3. Add it to your environment variables as `RESEND_API_KEY`
4. Verify your domain in Resend (recommended: `slovenscinakzk.com`)

## Testing the Webhook

### Local Testing

1. Start your development server:

   ```bash
   bun dev
   ```

2. Run the test script:
   ```bash
   bun run scripts/test-clerk-webhook.ts
   ```

### Production Testing

1. Deploy your application
2. Use Clerk's webhook testing feature in the dashboard
3. Check your application logs for webhook events

## Webhook Endpoint Details

- **URL**: `/api/clerk/webhook`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Headers**:
  - `svix-id`: Unique identifier for the webhook event
  - `svix-timestamp`: Timestamp of the event
  - `svix-signature`: Cryptographic signature for verification

## Event Handling

The webhook currently handles:

- `user.created`: Sends a welcome email to new users

### Welcome Email Features

- Personalized with user's first name
- Localized based on user's locale preference
- Includes links to dashboard and other pages
- Responsive design with your branding

## Troubleshooting

### Common Issues

1. **Webhook signature verification fails**
   - Check that `CLERK_WEBHOOK_SECRET` is correct
   - Ensure the webhook URL is accessible

2. **Email not sent**
   - Verify `RESEND_API_KEY` is valid
   - Check that the user has a verified email address
   - Review application logs for errors

3. **Missing webhook headers**
   - Ensure Clerk is sending the proper headers
   - Check that your endpoint is receiving the full request

### Logs

The webhook logs important events:

- User creation events
- Email sending success/failure
- Webhook verification errors

## Security

- Webhook signatures are verified using the `svix` library
- Invalid signatures are rejected with a 400 status code
- All webhook events are logged for debugging

## Future Enhancements

Potential improvements:

- Add support for more event types
- Implement email templates for different locales
- Add retry logic for failed email sends
- Create admin dashboard for webhook monitoring
