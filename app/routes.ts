import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('01', 'routes/01.layout.tsx', [index('routes/01.tsx')]),
] satisfies RouteConfig
