import { Metadata } from 'next'
import PartnerDetail from '@/components/partners/PartnerDetail'
import { getPartnerById } from '@/lib/partners'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const partner = await getPartnerById(params.id)
  
  if (!partner) {
    return {
      title: 'Partenaire non trouvé'
    }
  }

  return {
    title: `${partner.name} | Nos Partenaires`,
    description: partner.description
  }
}

export default async function PartnerPage({ params }: PageProps) {
  const partner = await getPartnerById(params.id)

  if (!partner) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <PartnerDetail partner={partner} />
    </main>
  )
} 