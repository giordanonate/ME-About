import './globals.css'

export const metadata = {
  title: 'MagicEden – 2025',
  description: 'A minimal two-page showcase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-[300vh] overflow-y-scroll">
        {children}
      </body>
    </html>
  )
}
