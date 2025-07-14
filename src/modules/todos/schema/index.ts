import { z } from 'zod'

const todoSchema = z.object({
	title: z.string().min(1, 'Require')
})

export { todoSchema }
