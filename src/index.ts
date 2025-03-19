import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const hono = new Hono()


hono.get("/student", async (context) => {  
  const student = await prisma.student.findMany();

  return context.json(
    {
      student,
    },
    200
  );
})



hono.post("/student", async (context) => {
  const { name, dateOfBirth, aadharNumber, proctorId } = await context.req.json();
try{
  const student = await prisma.student.create({
    data: {
      name,
      dateOfBirth,
      aadharNumber,
      proctorId,
    },
  });

  return context.json(
    {
      student,
    },
    200
  );
}

catch(error){
  console.error("Error fetching students:", error);
}
})



hono.post("/professor", async (context) => {
  const{id,name,seniority,aadharNumber} = await context.req.json();
  try{
  const proctor = await prisma.professor.create({
    data: {
      id,
      name,
      seniority,
      aadharNumber,
    },
  });
  
  return context.json(
    {
      proctor,
    },
    200
  );
}
catch(error){
  console.error("Error:", error);
}
});

hono.get("/professor", async (context) => {
  const proctor = await prisma.professor.findMany();

  return context.json(
    {
      proctor,
    },
    200
  );
})



serve(hono);
console.log(`Server is running on http://localhost:${3000}`)