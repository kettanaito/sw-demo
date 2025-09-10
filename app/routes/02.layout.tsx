import { useEffect } from 'react'
import { Outlet, type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [{ title: 'Vítejte v Brně!' }]
}

export default function FirstDemoLayout() {
  useEffect(() => {
    navigator.serviceWorker.register('/02/sw.js')
  }, [])

  return <Outlet />
}
