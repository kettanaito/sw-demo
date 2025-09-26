import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  route('', 'routes/layout.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('contacts', 'routes/contacts.tsx'),
  ]),
] satisfies RouteConfig
