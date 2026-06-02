import express, { type Request, type Response } from 'express'
import type { Task } from '@taskforge/shared'

const app = express()
const port = process.env.PORT ?? 3000

// GET /health — ejercita AC-7: Task importado de @taskforge/shared
app.get('/health', (_req: Request, res: Response<Pick<Task, 'status'>>) => res.sendStatus(200))

app.listen(port, () => console.log(`API running on port ${port}`))
