import { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import stylesheet from './app.css?url'
import { ErrorState } from './components/ErrorState'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Fullstack remix app',
      description: 'A fullstack app for Remix',
    },
  ]
}

export const ErrorBoundary = () => {
  const error = useRouteError()

  return (
    <html lang="ja">
      <head>
        <title>エラーが発生しました</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorState error={error} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const layoutStyles = tv({
  base: 'h-dvh w-full bg-yellow-100',
})

export const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={layoutStyles()}>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const App = () => {
  return <Outlet />
}

export default App
