import { z } from 'zod'

const todoAddSchema = z.object({
	title: z.string().min(1, 'Require')
})

export { todoAddSchema }
