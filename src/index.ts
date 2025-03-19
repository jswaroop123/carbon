import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const app = new Hono()

app.get("/student", async (context) => {  
  try{
  const student = await prisma.student.findMany();

  return context.json(
    {
      student,
    },
    200
  );}
  catch (error) {
    console.error(error);
  }
})

app.post('/student', async (c) => {
  try{
  const { name, dateOfBirth, aadharNumber, proctorId } = await c.req.json()
  const student = await prisma.student.create({
    data: {
      name,
      dateOfBirth,
      aadharNumber,
      proctorId,
    },
  })
  return c.json(student)}
  catch (error) {
    console.error(error);
  }
})




serve(app);
console.log(`Server is running on http://localhost:${3000}`)