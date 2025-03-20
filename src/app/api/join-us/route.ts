import { NextResponse } from 'next/server';
import { CONTACT_EMAIL, RESEND_API_KEY } from '@/app/config/env';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const specialty = formData.get('specialty') as string;
    const experience = formData.get('experience') as string;
    const city = formData.get('city') as string;
    const message = formData.get('message') as string;
    const cv = formData.get('cv') as File;

    // Convertir le CV en Buffer
    const cvBuffer = Buffer.from(await cv.arrayBuffer());

    // Envoyer l'email avec Resend
    await resend.emails.send({
      from: 'SENI <noreply@seni.com>',
      to: [CONTACT_EMAIL],
      subject: `Nouvelle candidature de ${fullName}`,
      html: `
        <h2>Nouvelle candidature reçue</h2>
        <p><strong>Nom :</strong> ${fullName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Spécialité :</strong> ${specialty}</p>
        <p><strong>Expérience :</strong> ${experience} ans</p>
        <p><strong>Ville :</strong> ${city}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer
        }
      ]
    });

    // Email de confirmation au candidat
    await resend.emails.send({
      from: 'SENI <noreply@seni.com>',
      to: [email],
      subject: 'Confirmation de réception de votre candidature',
      html: `
        <h2>Bonjour ${fullName},</h2>
        <p>Nous avons bien reçu votre candidature pour rejoindre le réseau SENI.</p>
        <p>Notre équipe va étudier votre profil et reviendra vers vous dans les plus brefs délais.</p>
        <p>Cordialement,<br>L'équipe SENI</p>
      `
    });

    return NextResponse.json(
      { message: 'Candidature envoyée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la candidature:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi de la candidature' },
      { status: 500 }
    );
  }
} 