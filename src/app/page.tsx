import { Section } from '@/components/layout'
import { Button, Card, Text } from '@/components/ui'
import { homeContent } from '@/config/content.config'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" background="gradient" align="center">
        <div className="mx-auto max-w-4xl text-center">
          <Text variant="h1" className="mb-6 text-white">
            {homeContent.hero.title}
            <span className="block text-brand-primary">{homeContent.hero.subtitle}</span>
          </Text>
          <Text variant="lead" className="mb-8 text-neutral-300">
            {homeContent.hero.description}
          </Text>
          <Button size="lg">{homeContent.hero.cta}</Button>
        </div>
      </Section>

      {/* Features Section */}
      <Section spacing="lg" contained background="neutral">
        <div className="mb-12 text-center">
          <Text variant="h2" className="mb-4">
            {homeContent.features.title}
          </Text>
          <Text variant="lead">{homeContent.features.subtitle}</Text>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {homeContent.features.items.map((feature, i) => (
            <Card key={i} variant="default" padding="lg" hover className="text-center">
              <Text variant="h5" className="mb-3">
                {feature.title}
              </Text>
              <Text variant="body">{feature.description}</Text>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg" background="neutral" align="center">
        <div className="text-center">
          <Text variant="h2" className="mb-4">
            {homeContent.cta.title}
          </Text>
          <Text variant="lead" className="mb-8">
            {homeContent.cta.subtitle}
          </Text>
          <Button size="lg">{homeContent.cta.button}</Button>
        </div>
      </Section>
    </>
  )
}
