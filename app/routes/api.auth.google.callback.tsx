import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { authenticator } from '../services/auth.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate('google', request, {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  })
}
