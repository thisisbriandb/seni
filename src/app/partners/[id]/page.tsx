import { Metadata } from 'next'
import PartnerDetail from '@/components/partners/PartnerDetail'
import { getPartnerById } from '@/lib/partners'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const partner = await getPartnerById(resolvedParams.id)
  
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

export default async function PartnerPage({ params }: Props) {
  const resolvedParams = await params
  const partner = await getPartnerById(resolvedParams.id)

  if (!partner) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <PartnerDetail partner={partner} />
    </main>
  )
} 