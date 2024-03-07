import { Category } from '@prisma/client'
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { authenticator } from '../services/auth.server'
import { createTask, deleteTask, getUserTasks } from '../services/tasks.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  })

  const tasks = await getUserTasks(user.id)

  return { user, tasks }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const action = formData.get('action')

  switch (action) {
    case 'logout': {
      return await authenticator.logout(request, { redirectTo: '/auth/login' })
    }

    case 'new': {
      const category = String(formData.get('category')) as Category
      const message = String(formData.get('message'))

      const user = await authenticator.isAuthenticated(request)

      if (!user) {
        return json(
          { message: 'You are not authorized to perform this action' },
          { status: 401 },
        )
      }

      const newTask = await createTask({
        category,
        message,
        userId: user.id,
      })

      return newTask
    }

    case 'delete': {
      const id = String(formData.get('id'))

      const result = await deleteTask(id)

      return result
    }

    default:
      return null
  }
}

const Index = () => {
  const { user, tasks } = useLoaderData<typeof loader>()

  return (
    <div className="h-full bg-yellow-100 pt-10">
      <div className="max-w-md mx-auto items-left flex flex-col bg-white p-6">
        <div className="d-flex flex-row mb-10">
          <h2 className="text-sm font-normal text-gray-500">
            Welcome {user.name}!
          </h2>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold pe-2">Task tracking app</h1>
            {user ? (
              <Form method="post">
                <button
                  type="submit"
                  name="action"
                  value="logout"
                  className="text-red-500 py-1 border px-3 text-sm rounded-md font-semibold"
                >
                  Logout
                </button>
              </Form>
            ) : null}
          </div>
        </div>
        <TaskForm />
        <br />
        <div className="grid gap-5">
          {Array.isArray(tasks) && tasks.length ? (
            <>
              {tasks.map((task) => (
                <TaskList
                  key={task.id}
                  id={task.id}
                  message={task.message}
                  category={task.category}
                />
              ))}
            </>
          ) : (
            '😳 No task'
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
