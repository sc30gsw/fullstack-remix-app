import { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { ValidatedForm } from 'remix-validated-form'
import { tv } from 'tailwind-variants'
import { TextField } from '../components/TextField'
import { loginValidator } from '../types/validators/LoginValidator'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App login' }]
}

const loginPageStyles = tv({
  slots: {
    base: 'h-full justify-center items-center flex flex-col gap-y-5',
    form: 'rounded-2xl bg-white p-6 w-[420px]',
    title: 'text-3xl font-extrabold text-black-600 mb-5',
    btnWrapper: 'text-center mt-5',
    btn: 'rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600',
    text: 'text-gray-600',
    link: 'text-red-600 px-2 hover:underline',
  },
  compoundSlots: [{ slots: ['btnWrapper', 'btn'], class: 'w-full' }],
})

const LoginPage = () => {
  const { base, form, title, btnWrapper, btn, text, link } = loginPageStyles()

  return (
    <div className={base()}>
      <ValidatedForm
        validator={loginValidator}
        method="POST"
        className={form()}
      >
        <h2 className={title()}>Login</h2>
        <TextField htmlFor="email" label="Email" />
        <TextField htmlFor="password" type="password" label="Password" />
        <div className={btnWrapper()}>
          <button
            type="submit"
            name="_action"
            value="Sign In"
            className={btn()}
          >
            Login
          </button>
        </div>
      </ValidatedForm>
      <p className={text()}>
        Don't have an account?
        <Link to="/auth/signup">
          <span className={link()}>Sign Up</span>
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
