import Header from '../../components/Header';
import '../../styles/globals.css';

import { Montserrat, BenchNine } from 'next/font/google';

export const metadata = {
  title: 'Rakonto Blog',
  description: `Rakonto, c'est une association créée en 2021. Ici, nous mettons en lumières les solutions aux problématiques sociales et environnementales qui existent déjà dans le but d'en inspirer d'autres.`,
};

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const benchnine = BenchNine({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-benchnine',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="w-screen overflow-x-hidden" lang="en">
      <body
        className={`bg-[#1B1B1B]  text-white w-screen   ${montserrat.variable} ${benchnine.variable} `}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
