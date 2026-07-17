import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const body = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Fashion Point — Style That Defines You',
  description:
    'Premium men\u2019s fashion — shirts, t-shirts, jeans, jackets, ethnic wear and accessories. Luxury menswear for the modern gentleman.',
  keywords: ['men\u2019s fashion', 'shirts', 'jeans', 'jackets', 'ethnic wear', 'Fashion Point'],
  openGraph: {
    title: 'Fashion Point — Style That Defines You',
    description: 'Premium men\u2019s fashion, curated for the modern gentleman.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink text-bone font-body antialiased">
        <Providers>
          <Header />
          <main className="pt-[104px] sm:pt-[128px]">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
