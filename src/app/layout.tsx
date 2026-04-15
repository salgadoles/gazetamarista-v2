import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { RadioProvider } from '@/context/RadioContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RadioPlayerBar from '@/components/layout/RadioPlayerBar';

const outfit = Outfit({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Conexão — Gazeta Escolar Digital | Colégio Marista Irmão Acácio',
    template: '%s | Conexão Gazeta Escolar',
  },
  description: 'Portal de mídia escolar do Colégio Marista Irmão Acácio de Londrina. Notícias, rádio ao vivo, jornal digital e conteúdos produzidos pelos alunos do projeto Conexão.',
  keywords: ['gazeta escolar', 'colégio marista', 'londrina', 'jornalismo estudantil', 'rádio escolar', 'conexão'],
  authors: [{ name: 'Colégio Marista Irmão Acácio' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Conexão Gazeta Escolar',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          <RadioProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <RadioPlayerBar />
          </RadioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
