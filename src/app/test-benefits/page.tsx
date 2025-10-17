/**
 * 🧪 Test Page pentru Benefits Section
 * Testez LuxuryCard component în context real
 */

import { CarFront, Clock, CreditCard, Search, UserCheck } from 'lucide-react';
import Link from 'next/link';

import { LuxuryCard } from '@/components/ui/LuxuryCard';

// Benefits data cu iconițe Lucide React (exact ca în original)
const benefitsData = [
  {
    id: 'book-instantly',
    title: 'Book Instantly',
    description:
      'Competitive rates with full transparency, premium vehicles, and instant confirmation - all in seconds.',
    icon: <Search className="h-full w-full" strokeWidth={1.2} />,
    href: '/book-instantly',
  },
  {
    id: 'professional-chauffeurs',
    title: 'Professional Chauffeurs',
    description:
      'Licensed, vetted, and experienced drivers providing exceptional service and local knowledge.',
    icon: <UserCheck className="h-full w-full" strokeWidth={1.2} />,
    href: '/chauffeurs',
  },
  {
    id: 'finest-fleet',
    title: 'The Finest Chauffeur Fleet',
    description: 'Prestige vehicles, curated with care from fully licensed operators.',
    icon: <CarFront className="h-full w-full" strokeWidth={1.2} />,
    href: '/fleet-details',
  },
  {
    id: 'secure-payments',
    title: 'Secure Payments',
    description:
      'Safe and convenient payment options with transparent pricing and instant confirmation.',
    icon: <CreditCard className="h-full w-full" strokeWidth={1.2} />,
    href: '/payments',
  },
  {
    id: 'available-247',
    title: 'Available 24/7',
    description:
      'Round-the-clock service for airport transfers, business meetings, and special occasions.',
    icon: <Clock className="h-full w-full" strokeWidth={1.2} />,
    href: '/support',
  },
];

export default function TestBenefitsPage() {
  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-gold mb-4 text-4xl font-bold">🧪 Benefits Section Test</h1>
          <p className="text-lg text-neutral-300">
            Testing LuxuryCard component cu shimmer effects
          </p>
        </div>

        {/* Benefits Section (identic cu originalul) */}
        <section className="relative z-10 mx-auto max-w-[90rem] px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Why Choose Our Service</h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-300">
              Experience London's only luxury chauffeur platform where choice meets transparency.
            </p>
          </div>

          {/* Grid Layout (responsive) */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {benefitsData.map(benefit => (
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
        <div className="mt-16 rounded-xl bg-neutral-800/50 p-8">
          <h3 className="mb-4 text-xl font-semibold">🎛️ Test Controls</h3>

          {/* Single Card Tests */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <h4 className="mb-4 text-lg font-medium">Custom Content API:</h4>
            <LuxuryCard variant="shimmer" hover="shimmer">
              <div className="space-y-4">
                <div className="text-6xl">🎯</div>
                <h3 className="text-xl font-bold text-[#CBB26A]">Custom Layout</h3>
                <p className="text-neutral-400">
                  Using children API pentru layout complet custom cu{' '}
                  <span className="font-semibold text-[#E5D485]">markup</span> și styling.
                </p>
                <button className="rounded-md bg-gradient-to-r from-[#CBB26A] to-[#E5D485] px-4 py-2 font-medium text-black transition-all hover:from-[#E5D485] hover:to-[#CBB26A]">
                  Custom Action
                </button>
              </div>
            </LuxuryCard>
          </div>

          {/* Links */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block rounded-lg bg-neutral-700 px-6 py-3 transition-colors hover:bg-neutral-600"
            >
              ← Înapoi la Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// SEO pentru test page
export const metadata = {
  title: 'Benefits Test - Vantage Lane 2.0',
  description: 'Test page pentru LuxuryCard component și Benefits section',
};
