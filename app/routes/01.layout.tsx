import { useEffect } from 'react'
import { Outlet } from 'react-router'

export default function FirstDemoLayout() {
  useEffect(() => {
    navigator.serviceWorker.register('/01/sw.js')
  }, [])

  return <Outlet />
}
