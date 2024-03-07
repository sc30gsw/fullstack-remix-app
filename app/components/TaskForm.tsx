import { ValidatedForm } from 'remix-validated-form'
import { tv } from 'tailwind-variants'
import { taskValidator } from '../types/validators/TaskValidator'
import { CategorySelect } from './CategorySelect'
import { TaskTextArea } from './TaskTextArea'

const taskFormStyles = tv({
  slots: {
    btn: 'w-full font-semibold px-3 rounded-xl bg-red-500 py-2 text-white transition duration-300 ease-in-out hover:bg-red-600',
  },
})

export const TaskForm = () => {
  const { btn } = taskFormStyles()

  return (
    <ValidatedForm validator={taskValidator} method="post">
      <CategorySelect />
      <TaskTextArea />
      <div>
        <button type="submit" name="action" value="new" className={btn()}>
          Add task
        </button>
      </div>
    </ValidatedForm>
  )
}
