import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return (
    <div>
      <h1 className="mb-5 text-3xl font-bold text-center">Vítejte v Brně!</h1>
      <ul className="flex flex-col gap-5">
        <img src="/image-01.avif" />
        <img src="/image-02.avif" />
        <img src="/image-03.avif" />
        <img src="/image-04.avif" />
        <img src="/image-05.avif" />
        <img src="/image-06.avif" />
      </ul>
    </div>
  )
}
