import './globals.css';
import { poppins } from '@/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pl' suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased bg-neutral-900`}>
        <main className='mx-auto w-[calc(100%-(clamp(1rem,4.16667vw,2rem)*2))] max-w-[80.375rem]'>
          {children}
        </main>
      </body>
    </html>
  );
}
