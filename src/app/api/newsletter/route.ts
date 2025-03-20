import { NextResponse } from 'next/server';
import { RESEND_API_KEY } from '@/app/config/env';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, contactEmail } = await request.json();

    // Validation de base
    if (!email || !contactEmail) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    // Envoyer un email de confirmation
    await resend.emails.send({
      from: 'SENI Newsletter <newsletter@seni.com>',
      to: [email],
      subject: 'Bienvenue à la newsletter SENI',
      html: `
        <h1>Merci de votre inscription !</h1>
        <p>Vous êtes maintenant inscrit à la newsletter de SENI. Vous recevrez régulièrement des informations sur nos services et destinations médicales.</p>
        <p>Si vous n'êtes pas à l'origine de cette inscription, veuillez nous contacter à ${contactEmail}.</p>
      `,
    });

    // Notifier l'administrateur
    await resend.emails.send({
      from: 'SENI System <system@seni.com>',
      to: [contactEmail],
      subject: 'Nouvelle inscription newsletter',
      html: `
        <h2>Nouvelle inscription à la newsletter</h2>
        <p>Email: ${email}</p>
        <p>Date: ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Inscription réussie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur newsletter:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
} 