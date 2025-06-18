'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Switcher() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center">
      <div className="flex space-x-2 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
        {['1', '2'].map((num) => (
          <Link
            key={num}
            href={`/${num}`}
            className={`px-6 py-2 rounded-lg transition-all font-medium ${
              pathname === `/${num}`
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            {num}
          </Link>
        ))}
      </div>
    </div>
  )
}
