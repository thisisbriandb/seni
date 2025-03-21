"use client";

import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    location: "Bangui",
    content: "SENI a transformé mon parcours médical. Leur équipe professionnelle a organisé mon transfert au Maroc pour une opération complexe. Je suis reconnaissante pour leur soutien continu.",
    image: "/images/testimonials/avatar-1.jpg",
    role: "Patiente internationale"
  },
  {
    id: 2,
    name: "Jean Kotto",
    location: "Bimbo",
    content: "Après des mois d'incertitude, SENI m'a mis en contact avec un spécialiste en Tunisie qui a diagnostiqué correctement mon état. Le processus était fluide et rassurant.",
    image: "/images/testimonials/avatar-2.jpg",
    role: "Patient international"
  },
  {
    id: 3,
    name: "Claire Mbeki",
    location: "Bouar",
    content: "L'assistance administrative de SENI a été extraordinaire. Ils ont géré toute la paperasse pour mon visa médical au Sénégal, me permettant de me concentrer uniquement sur ma santé.",
    image: "/images/testimonials/avatar-3.jpg",
    role: "Patiente internationale"
  }
];

const StarIcon = () => (
  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
    />
  </svg>
);

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300 font-pj">
              Des centaines de patients nous font confiance
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl xl:text-5xl font-pj">
              Témoignages de nos patients
            </h2>
          </div>

          <div className="relative mt-10 md:mt-24 md:order-2">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter" style={{ background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)' }}></div>
            </div>

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex flex-col overflow-hidden shadow-xl">
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white dark:bg-gray-800 lg:py-8 lg:px-7">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>

                      <blockquote className="flex-1 mt-8">
                        <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 font-pj">
                          "{testimonial.content}"
                        </p>
                      </blockquote>
                    </div>

                    <div className="flex items-center mt-8">
                      <div className="relative flex-shrink-0 w-11 h-11">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-bold text-gray-900 dark:text-white font-pj">
                          {testimonial.name}
                        </p>
                        <p className="mt-0.5 text-sm font-pj text-gray-600 dark:text-gray-400">
                          {testimonial.location} - {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center md:mt-16 md:order-3">
            <a
              href="/testimonials"
              className="pb-2 text-base font-bold leading-7 text-gray-900 dark:text-white transition-all duration-200 border-b-2 border-gray-900 dark:border-white hover:border-gray-600 dark:hover:border-gray-400 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600 dark:hover:text-gray-400"
            >
              Voir tous les témoignages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 