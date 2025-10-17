/**
 * 🧪 Test Page pentru Benefits Section
 * Testez LuxuryCard component în context real
 */

import { LuxuryCard } from '@/components/ui/LuxuryCard'
import Link from 'next/link'
import { Search, UserCheck, CarFront, CreditCard, Clock } from 'lucide-react'

// Benefits data cu iconițe Lucide React (exact ca în original)
const benefitsData = [
  {
    id: 'book-instantly',
    title: 'Book Instantly',
    description: 'Competitive rates with full transparency, premium vehicles, and instant confirmation - all in seconds.',
    icon: <Search className="w-full h-full" strokeWidth={1.2} />,
    href: '/book-instantly'
  },
  {
    id: 'professional-chauffeurs', 
    title: 'Professional Chauffeurs',
    description: 'Licensed, vetted, and experienced drivers providing exceptional service and local knowledge.',
    icon: <UserCheck className="w-full h-full" strokeWidth={1.2} />,
    href: '/chauffeurs'
  },
  {
    id: 'finest-fleet',
    title: 'The Finest Chauffeur Fleet',
    description: 'Prestige vehicles, curated with care from fully licensed operators.',
    icon: <CarFront className="w-full h-full" strokeWidth={1.2} />,
    href: '/fleet-details'
  },
  {
    id: 'secure-payments',
    title: 'Secure Payments', 
    description: 'Safe and convenient payment options with transparent pricing and instant confirmation.',
    icon: <CreditCard className="w-full h-full" strokeWidth={1.2} />,
    href: '/payments'
  },
  {
    id: 'available-247',
    title: 'Available 24/7',
    description: 'Round-the-clock service for airport transfers, business meetings, and special occasions.',
    icon: <Clock className="w-full h-full" strokeWidth={1.2} />,
    href: '/support'
  }
]

export default function TestBenefitsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gold">🧪 Benefits Section Test</h1>
          <p className="text-lg text-neutral-300">
            Testing LuxuryCard component cu shimmer effects
          </p>
        </div>

        {/* Benefits Section (identic cu originalul) */}
        <section className="relative z-10 mx-auto max-w-[90rem] px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Why Choose Our Service
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Experience London's only luxury chauffeur platform where choice meets transparency.
            </p>
          </div>
          
          {/* Grid Layout (responsive) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {benefitsData.map((benefit, index) => (
              <LuxuryCard
                key={benefit.id}
                variant="shimmer"
                size="md"
                hover="shimmer"
                as={Link}
                href={benefit.href}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                className="h-full" // Ensure equal height
              />
            ))}
          </div>
        </section>

        {/* Test Controls */}
        <div className="mt-16 p-8 bg-neutral-800/50 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">🎛️ Test Controls</h3>
          
          {/* Single Card Tests */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <LuxuryCard
              variant="shimmer"
              size="sm"
              hover="shimmer"
              title="Shimmer Effect"
              description="Hover pentru shimmer sweep"
            />
            
            <LuxuryCard
              variant="glow"
              size="md"
              hover="glow"
              title="Glow Effect"
              description="Hover pentru golden glow"
            />
            
            <LuxuryCard
              variant="minimal"
              size="lg"
              hover="lift"
              title="Lift Effect"
              description="Hover pentru lift animation"
            />
            
            <LuxuryCard
              variant="premium"
              size="xl"
              hover="none"
              title="No Hover"
              description="Fără hover effects"
            />
          </div>

          {/* Custom Content Test */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Custom Content API:</h4>
            <LuxuryCard variant="shimmer" hover="shimmer">
              <div className="space-y-4">
                <div className="text-6xl">🎯</div>
                <h3 className="text-xl font-bold text-[#CBB26A]">Custom Layout</h3>
                <p className="text-neutral-400">
                  Using children API pentru layout complet custom cu{' '}
                  <span className="text-[#E5D485] font-semibold">markup</span> și styling.
                </p>
                <button className="px-4 py-2 bg-gradient-to-r from-[#CBB26A] to-[#E5D485] text-black rounded-md font-medium hover:from-[#E5D485] hover:to-[#CBB26A] transition-all">
                  Custom Action
                </button>
              </div>
            </LuxuryCard>
          </div>

          {/* Links */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
            >
              ← Înapoi la Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// SEO pentru test page
export const metadata = {
  title: 'Benefits Test - Vantage Lane 2.0',
  description: 'Test page pentru LuxuryCard component și Benefits section'
}
