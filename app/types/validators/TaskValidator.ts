import { Category } from '@prisma/client'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'

const taskFormSchema = z.object({
  category: z.nativeEnum(Category, {
    errorMap: () => {
      return { message: 'カテゴリーを選択してください' }
    },
  }),
  message: z.string().min(1, 'メッセージは必須入力です'),
})

export const taskValidator = withZod(taskFormSchema)
