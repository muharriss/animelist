import prisma from "@/libs/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json()
        const { email, name, password } = body

    // Validasi input
      if (!name || !email || !password) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
       }
    
        // check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })
    
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email alredy exists" }, { status: 409 })
        }
    
        const hashedPassword = await hash(password, 10)
    
        const data = {
            name,
            email,
            password: hashedPassword,
        }
    
        const newUser = await prisma.user.create({ data })

        const {password: newUserPassword, ...rest} = newUser
    
        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
    }catch (error) {
        return NextResponse.json({message: "someting went wrong!", error: error }, { status: 500 })
    }
    
}




// export async function POST(req) {
//     try {
//       const body = await req.json();
//       const { name, email, password } = body;
  
//       // Validasi input
//       if (!name || !email || !password) {
//         return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
//       }
  
//       // Cek apakah user sudah terdaftar
//       const existingUser = await prisma.user.findUnique({
//         where: { email },
//       });
  
//       if (existingUser) {
//         return NextResponse.json({ error: 'User already exists.' }, { status: 400 });
//       }
  
//       // Hash password sebelum disimpan
//       const hashedPassword = await hash(password, 10);
  
//       // Buat user baru
//       const user = await prisma.user.create({
//         data: {
//           name,
//           email,
//           password: hashedPassword,
//         },
//       });
  
//       // Balikan respons sukses
//       return NextResponse.json({
//         message: 'User registered successfully.',
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//       });
  
//     } catch (error) {
//       console.error('Registration Error:', error);
//       return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//     }
//   }