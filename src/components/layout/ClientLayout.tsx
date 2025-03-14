"use client";

import MotionWrapper from '@/components/animations/MotionWrapper';
import PageTransition from '@/components/animations/PageTransition';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <MotionWrapper>
      <PageTransition>
        {children}
      </PageTransition>
    </MotionWrapper>
  );
} 