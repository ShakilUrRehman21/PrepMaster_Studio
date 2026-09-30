import { Inter } from 'next/font/google';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "PrepMaster | Technical & Behavioral Mock Interview Studio",
  description: "Executive-grade interview simulator with real-time speech capture, role-tailored questions, and in-depth performance analytics.",
  keywords: ["mock interview", "tech interview practice", "system design interview", "behavioral interview", "job preparation", "career development"],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#121217',
          colorText: '#f4f4f5',
          colorInputBackground: '#18181b',
          colorInputText: '#f4f4f5',
        },
        elements: {
          card: 'bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-2xl',
          headerTitle: 'text-zinc-100',
          headerSubtitle: 'text-zinc-400',
          socialButtonsBlockButton: 'border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
          formFieldLabel: 'text-zinc-300',
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 text-white font-medium',
          footerActionLink: 'text-blue-400 hover:text-blue-300',
        }
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-blue-600/30 selection:text-blue-200`}>
          <Toaster 
            position="top-right" 
            theme="dark" 
            richColors 
            toastOptions={{
              className: 'bg-zinc-900 border border-zinc-800 text-zinc-100',
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
