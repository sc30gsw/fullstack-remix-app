import { Category, Task } from '@prisma/client'
import { json } from '@remix-run/cloudflare'
import { prisma } from '../libs/db'

export const getUserTasks = async (userId: string) => {
  if (!userId) {
    return json({ error: { message: 'userId is required' } })
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: 'desc' },
  })

  return tasks
}

export const createTask = async ({
  category,
  message,
  userId,
}: Pick<Task, 'message' | 'userId'> & { category: Category }) => {
  const newTask = await prisma.task.create({
    data: { category, message, userId },
  })

  if (!newTask) {
    return json({ error: { message: 'Could not post the task' } })
  }

  return json({
    message: 'Task created successfully',
    success: 'true',
    payload: newTask,
  })
}

export const deleteTask = async (id: string) => {
  if (!id) {
    return json({ error: { message: 'id is required' } })
  }

  const task = await prisma.task.findUnique({ where: { id } })

  if (!task) {
    return json({ error: { message: 'task is not found' } })
  }

  await prisma.task.delete({ where: { id } })

  return json({
    message: 'Task deleted',
    success: 'true',
    payload: id,
  })
}
