import type { CSSProperties } from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { createTranslator, type Locale } from 'next-intl'

interface Props {
  name: string
  url: string
  locale: Locale
}

export const EmailResetPassword = async ({ name, url, locale }: Props) => {
  const t = createTranslator({
    messages: await import(`../../i18n/messages/${locale}/email.json`),
    namespace: 'emailResetPassword',
    locale,
  })

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t('preview')}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{t('heading', { name })}</Heading>

          <Text style={paragraph}>{t('paragraphMain')}</Text>

          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              {t('button')}
            </Button>
          </Section>

          <Text style={paragraph}>{t('paragraphDescription')}</Text>

          <Hr style={hr} />

          <Text style={footer}>
            {t('footer')}
            <br />
            <Link href={url} style={link}>
              {url}
            </Link>
          </Text>

          <Text style={footer}>
            © {new Date().getFullYear()} Ai Smart Dictionary.{' '}
            {t('footer-copyright')}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

EmailResetPassword.PreviewProps = {
  name: 'John Doe',
  url: 'http://sdadwqe123wddsjhakh4h324hdnas',
  locale: 'en',
} as Props

export default EmailResetPassword

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container: CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  marginBottom: '64px',
  borderRadius: '8px',
  maxWidth: '560px',
  border: '1px solid #e6ebf1',
}

const heading: CSSProperties = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
}

const paragraph: CSSProperties = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
}

const buttonContainer: CSSProperties = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button: CSSProperties = {
  backgroundColor: '#000000',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
}

const link: CSSProperties = {
  color: '#b4becc',
  fontSize: '12px',
}

const hr: CSSProperties = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer: CSSProperties = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}
