'use client'
import { useEffect, useState } from 'react'

export default function FadeInWrapper({ children }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={`transition-opacity duration-1000 ease-out ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
