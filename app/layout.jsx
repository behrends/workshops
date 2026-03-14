import { Head } from 'nextra/components';

export const metadata = {
  title: {
    default: 'progcontent',
    template: '%s',
  },
  openGraph: {
    url: 'https://workshops.progcontent.com',
    siteName: 'Workshops Progcontent',
    locale: 'de',
    type: 'website',
  },
};

export default async function RootLayout({ children }) {
  return (
    <html
      lang="de"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head />
      <body>{children}</body>
    </html>
  );
}
