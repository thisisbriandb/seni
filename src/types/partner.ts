export interface Partner {
  id: string
  name: string
  shortDesc: string
  description: string
  logo: string
  image: string
  images: string[]
  location: string
  specialties?: string[]
  chirurgicalSpecialties?: string[]
  phone?: string
  website?: string
  email?: string
  quote?: {
    text: string
    author: string
  }
  highlights?: string[]
} 