import WelcomeEmail from '@/emails/welcome-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { data, type } = await request.json();

  if (type === "user.created") {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Slovenščina Korak za Korakom <welcome@slovenscinakzk.com>',
      to: [data.email_addresses[0].email_address],
      subject: 'Welcome to Slovenščina Korak za Korakom',
      react: WelcomeEmail({ name: data.first_name, locale: data.unsafe_metadata.locale }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(emailData);
  } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  } else {
    return Response.json({ error: "Invalid event type" }, { status: 400 });
  }
}