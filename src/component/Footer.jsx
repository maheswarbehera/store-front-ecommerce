import { ChevronRight } from 'lucide-react'
import React from 'react'
import logo from '../assets/logo.webp'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full pt-8 border-t-4 border-black-500">
      
      <div className="mx-auto max-w-6xl items-center justify-between px-4 pb-2 md:flex lg:px-0">
        <Link to='/' className="inline-flex items-center">
        <img src={logo} alt="" width={"50px"} />
          <span className="ml-4 text-lg font-bold">Shop Online</span>
        </Link>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-gray-500">Designed & Devloped By <Link to='https://linkedin.com/in/maheswar-behera-4519b2209/'>Maheswar Behera</Link></p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-gray-500">© 2023 Shop Online. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
