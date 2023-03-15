import Banner from '../../components/Banner';
import Header from '../../components/Header';
import '../../styles/globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-11/12 pb-10 lg:w-10/12 mx-auto">
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  );
}
