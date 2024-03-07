import { useField } from 'remix-validated-form'
import { tv } from 'tailwind-variants'

const taskTextAreaStyles = tv({
  slots: {
    wrapper: 'mb-5',
    labelContent: 'font-semibold mb-2 block',
    textArea:
      'w-full px-3 border-2 rounded-md mr-8 border-gray-600 py-1 outline-none',
    err: 'text-red-500',
  },
  variants: {
    hasError: {
      true: { textArea: 'border-red-500' },
    },
  },
})

export const TaskTextArea = () => {
  const { error } = useField('message')
  const { wrapper, labelContent, textArea, err } = taskTextAreaStyles({
    hasError: !!error,
  })

  return (
    <div className={wrapper()}>
      <label className={labelContent()} htmlFor="task">
        Task
      </label>
      <textarea name="message" id="message" className={textArea()} />
      {error && <span className={err()}>{error}</span>}
    </div>
  )
}
