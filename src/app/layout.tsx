import './globals.css'
import React from 'react'
import Header from './components/header/header'
import Footer from './components/footer/footer'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer /> 
      </body>
    </html>
  )
}