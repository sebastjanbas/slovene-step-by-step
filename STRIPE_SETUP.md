# Stripe Integration Setup

This guide will help you set up Stripe payments for the language club booking system.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# Stripe
STRIPE_SECRET_KEY="sk_test_..." # Get from Stripe Dashboard
STRIPE_PUBLISHABLE_KEY="pk_test_..." # Get from Stripe Dashboard
STRIPE_WEBHOOK_SECRET="whsec_..." # Get from Stripe Dashboard

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Stripe Setup

1. **Create a Stripe Account**: Sign up at [stripe.com](https://stripe.com)

2. **Get API Keys**:

   - Go to Stripe Dashboard > Developers > API Keys
   - Copy your publishable key and secret key
   - Use test keys for development

3. **Set up Webhooks**:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.payment_failed`, `charge.refunded`
   - Copy the webhook secret

## Database Migration

Run the database migration to create the new tables:

```bash
bun run db:generate
bun run db:push
bun run db:seed
```

Or use the individual commands:

- `bun run db:generate` - Generate migration files
- `bun run db:push` - Apply migrations to database
- `bun run db:seed` - Add sample data to database

## Adding Sample Data

You can add sample language club events to your database:

```sql
INSERT INTO lang_club (tutor, date, theme, description, level, location, max_people, duration, price)
VALUES
('Ela Remic', '2025-01-15 14:00:00', 'Cooking', 'We will talk about cooking, writing a recipe in Slovene from start to finish.', 'A1', 'Room 321, UEL', 8, 45, 25.00),
('Oleksandr Tyutyunnyk', '2025-01-20 15:00:00', 'Weather', 'We will talk about different types of weather and climate.', 'B1', 'Room 321, UEL', 8, 45, 30.00),
('Anna Novak', '2025-01-25 16:00:00', 'Travel', 'Learn vocabulary and phrases for traveling in Slovenia.', 'A2', 'Room 321, UEL', 8, 45, 28.00);
```

## Testing

1. Start your development server: `bun run dev`
2. Navigate to the language club page
3. Click "Book Now" on any event
4. Complete the test payment using Stripe test card: `4242 4242 4242 4242`

## Features

- ✅ Stripe checkout integration
- ✅ Payment processing with webhooks
- ✅ Booking status tracking
- ✅ Success/cancel page handling
- ✅ Price display on event cards
- ✅ Database integration for events and bookings

## Security Notes

- Never commit your Stripe secret keys to version control
- Use test keys for development
- Implement proper authentication and authorization
- Validate all webhook signatures
- Handle payment failures gracefully
