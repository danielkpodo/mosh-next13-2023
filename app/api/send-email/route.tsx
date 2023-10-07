import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeTemplate from '@/emails/WelcomeTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  /**
   * the from email has to be from a domain that you own
   * so we cannot use free service like yahoo or gmail
   * once you have a domain go to resend.com configure your domain in the resend dashboard
   * the react: in the resend object is the react component that represents our template
   */
  await resend.emails.send({
    from: 'danielnarh.com',
    to: 'naphthanewman@gmail.com',
    subject: 'Testing Resend Emails',
    react: <WelcomeTemplate name='Naphtha' />,
  });

  return NextResponse.json({});
}
