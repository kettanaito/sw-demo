import { useEffect } from 'react'
import { Outlet, Link, type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [{ title: 'Vítejte v Brně!' }]
}

export default function FirstDemoLayout() {
  useEffect(() => {
    navigator.serviceWorker.register('/sw.js')
  }, [])

  return (
    <>
      <header>
        <ul className="flex gap-10 p-5 justify-center">
          <li>
            <Link to="/" className="underline hover:no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="underline hover:no-underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="underline hover:no-underline">
              Contacts
            </Link>
          </li>
        </ul>
      </header>
      <div className="max-w-lg mx-auto my-10">
        <Outlet />
      </div>
    </>
  )
}
