import { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import stylesheet from './app.css?url'

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

const layoutStyles = tv({
  base: 'h-dvh w-full bg-yellow-100',
})

export const Layout = ({ children }: { children: ReactNode }) => {
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
