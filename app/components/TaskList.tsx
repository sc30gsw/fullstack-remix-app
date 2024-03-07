import { Task } from '@prisma/client'
import { Form } from '@remix-run/react'
import { FC } from 'react'
import { HiTrash } from 'react-icons/hi'
import { tv } from 'tailwind-variants'

const taskListStyles = tv({
  slots: {
    base: 'flex justify-between items-center',
    messageContent: 'text-md',
    categoryContent:
      'text-xs bg-green-100 border px-2 py-1 rounded text-green-700',
  },
})

export const TaskList: FC<Pick<Task, 'id' | 'message' | 'category'>> = ({
  id,
  message,
  category,
}) => {
  const { base, messageContent, categoryContent } = taskListStyles()

  return (
    <>
      <div className={base()}>
        <div>
          <p className={messageContent()}>{message}</p>
          <span className={categoryContent()}>{category}</span>
        </div>
        <div>
          <Form method="post">
            <button
              className="button"
              name="action"
              type="submit"
              value="delete"
            >
              <HiTrash />
            </button>
            <input type="hidden" name="id" value={id} />
          </Form>
        </div>
      </div>
    </>
  )
}
