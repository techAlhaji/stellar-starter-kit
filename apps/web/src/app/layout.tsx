import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '@stellar-starter-kit/wallets';

export const metadata: Metadata = {
  title: 'Stellar Starter Kit',
  description: 'The fastest way to build modern Stellar and Soroban applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
