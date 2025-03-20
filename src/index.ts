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

hono.get("/student/proctor", async (context) => {
  const student = await prisma.student.findMany({
    include: {
      proctor: true,
    },
  });

  return context.json(
    {
      student,
    },
    200
  );
})


hono.post("/student", async (context) => {
  const { name, dateOfBirth, aadharNumber} = await context.req.json();
  const student = await prisma.student.create({
    data: {
      name,
      dateOfBirth,
      aadharNumber,
    },
  });

  return context.json(
    {
      student,
    },
    200
  );

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

hono.get("/professor/:professorId/proctorships", async (context) => {
  const { professorId } = context.req.param();
  const student = await prisma.student.findMany({
    where: {
      proctorId: professorId,
    },
  });
  return context.json({
    student,
  },200);
  
})

hono.get("/student/:id", async (c)=>{
  const {id} = c.req.param();
  const student = await prisma.student.findUnique({
    where:{
      id,
    }
  })

  return c.json({
    student,
  },200)
})

hono.patch("/students/:studentId", async (c)=>{
  const {studentId} = c.req.param();
  const {name,dateOfBirth,aadharNumber,proctorId} = await c.req.json();
  const student = await prisma.student.update({
    where:{
      id: studentId,
    },
    data:{
      name,
      dateOfBirth,
      aadharNumber,
      proctorId,
    }
  })
  return c.json({
    student,
  },200)
})

hono.patch("/professors/:professorId", async (c)=>{
  const {professorId} = c.req.param();
  const {name,seniority,aadharNumber} = await c.req.json(); 
  const proctor = await prisma.professor.update({
    where:{
      id: professorId,
    },
    data:{
      name,
      seniority,
      aadharNumber,
    }
  })
  return c.json({
    proctor,
  },200)
})

hono.delete("/students/:studentId", async (c)=>{
  const {studentId} = c.req.param();
  const student = await prisma.student.delete({
    where:{
      id: studentId,
    }
  })
  return c.json({
    student,
  },200)
})

hono.delete("/professor/:professorId",async(context)=>{
  const{professorId}=context.req.param();
  const professor=await prisma.professor.delete(
    {
      where:{id:professorId,
  
      }
    })
    return context.json({
      professor},200
    )
  })

  hono.post("/professors/:professorId/proctorships", async (context) => {
    const profId = context.req.param("professorId");
    const { studentId } = await context.req.json();
  
  
    const updateStudentProctorship = await prisma.student.update({
      where: { id: studentId },
      data: { proctorId: profId },
    });
    return context.json(
      { "Updated Student Proctorship": updateStudentProctorship },
      200
    );
  });

  hono.get("/students/:studentId/librarymembership", async (context) => {
    const { studentId } = context.req.param();
    const libraryMembership = await prisma.libraryMembership.findMany({
      where: {
        studentId: studentId,
      },
    });
  
    return context.json(
      {
        libraryMembership,
      },
      200
    );
  });

  hono.post("/students/:studentId/library-membership", async (context) => {
    const studentId = context.req.param("studentId");
    const { issueDate, expiryDate } = await context.req.json();
  
    const libraryMembership = await prisma.libraryMembership.create({
      data: {
        studentId,
        issueDate,
       expiryDate,
      },
    });
    return context.json({ libraryMembership }, 200);
  });

  hono.patch("/students/:studentId/library-membership", async (context) => {  
    const studentId = context.req.param("studentId");
    const { issueDate, expiryDate } = await context.req.json();
  
    const libraryMembership = await prisma.libraryMembership.update({
      where: {
        studentId: studentId,
      },
      data: {
        issueDate,
        expiryDate,
      },
    });
    return context.json({ libraryMembership }, 200);
  });

  hono.delete("/students/:studentId/library-membership", async (context) => {
    const studentId = context.req.param("studentId");
  
    const libraryMembership = await prisma.libraryMembership.delete({
      where: {
        studentId: studentId,
      },
    });
    return context.json({ libraryMembership }, 200);
  })
 

serve(hono);
console.log(`Server is running on http://localhost:${3000}`)