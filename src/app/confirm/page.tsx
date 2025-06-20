'use client';

import { useEffect, useState } from 'react';

export default function EmailVerifiedPage() {
  const [title, setTitle] = useState('Vérification Réussie !');
  const [message, setMessage] = useState(
    'Votre adresse e-mail a bien été vérifiée. Nous avons lancé l\'application pour que vous puissiez continuer.'
  );
  const [manualLinkVisible, setManualLinkVisible] = useState(false);
  const [customSchemeUrl, setCustomSchemeUrl] = useState('#');

  useEffect(() => {
    const hash = window.location.hash;
    const schemeUrl = `mon-appli-scolaire://auth/callback${hash}`;
    setCustomSchemeUrl(schemeUrl);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      setTitle('Action Requise');
      setMessage(
        'Merci pour votre vérification !<br>Pour continuer, veuillez retourner sur l\'ordinateur où l\'application est installée.'
      );
    } else {
      window.location.href = schemeUrl;

      setMessage(
        "Votre adresse e-mail a bien été vérifiée. "
      );
      setManualLinkVisible(true);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-md">
        <h1 className={`text-2xl font-bold mb-4 ${title === 'Action Requise' ? 'text-yellow-500' : 'text-green-600'}`}>
          {title}
        </h1>
        <p
          className="text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        {manualLinkVisible && (
          <a
            href={customSchemeUrl}
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Merci d'avoir choisi e-school
          </a>
        )}
      </div>
    </div>
  );
}
