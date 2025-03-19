import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const app = new Hono()

app.get('/student', async (c) => {
  const student = await prisma.student.findMany()
  return c.json({student},200)
})



serve(app);
console.log(`Server is running on http://localhost:${3000}`)