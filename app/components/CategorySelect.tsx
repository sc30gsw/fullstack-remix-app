import { useField } from 'remix-validated-form'
import { tv } from 'tailwind-variants'
import { categories } from '../utils/categories'

const categorySelectStyles = tv({
  slots: {
    wrapper: 'mb-5',
    labelContent: 'font-semibold mb-2 block',
    categorySelect:
      'w-full px-3 border-2 rounded-md mr-8 border-gray-600 py-1 outline-none h-9',
    err: 'text-red-500',
  },
  variants: {
    hasError: {
      true: { categorySelect: 'border-red-500' },
    },
  },
})

export const CategorySelect = () => {
  const { error } = useField('category')
  const { wrapper, labelContent, categorySelect, err } = categorySelectStyles({
    hasError: !!error,
  })

  return (
    <div className={wrapper()}>
      <label className={labelContent()} htmlFor="category">
        Category
      </label>
      <select name="category" id="category" className={categorySelect()}>
        <option value="">Select a category</option>
        {categories.map((category) => {
          return (
            <option key={category.name} value={category.value}>
              {category.name}
            </option>
          )
        })}
      </select>
      {error && <span className={err()}>{error}</span>}
    </div>
  )
}
