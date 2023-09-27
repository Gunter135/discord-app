import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/providers/modal-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                font.className,
                "bg-white dark:bg-[#313338]"
                )}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem={false}
                    storageKey='ds-theme'>
                <SocketProvider>
                    <ModalProvider/>
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </SocketProvider>
                </ThemeProvider>
            </body>
        </html>
    </ClerkProvider>
  )
}

{/* <div className='h-full'>
<div className='hidden md:flex h-full w-[72] z-30 flex-col fixed inset-y-0'>
</div>
<main className='md:pl-[72] h-full'>
    {children}
</main>
</div> */}