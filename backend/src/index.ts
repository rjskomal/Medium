import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { verify } from 'hono/jwt'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()
app.use("/*", cors());

app.route("/api/v1/user", userRouter)

app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header('authorization')
  if (!header || !header.startsWith('Bearer ')) {
    c.status(401)
    return c.json({ error: 'Authorization header missing or invalid format' })
  }

  const token = header.split(" ")[1]
  const response = await verify(token, c.env.JWT_SECRET)

  if (response?.id) {
    await next()
  } else {
    c.status(403)
    return c.json({ error: 'Unauthorized' })
  }
})

app.route("/api/v1/blog", blogRouter)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
