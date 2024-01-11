"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import prisma from "./prisma"
import * as bcrypt from "bcryptjs"
import { Product } from "@prisma/client"

const FormSchema = z
  .object({
    username: z.string().min(3, "Username is too short, min 3 characters"),
    email: z.string().email("Please provide a valid e-mail address"),
    password: z.string().min(6, "Password must be at least 6 length"),
    confirmPassword: z.string().min(6, "Password must be at least 6 length"),
    lastName: z.string(),
    firstName: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The two passwords are not equals",
    path: ["password", "confirmPassword"],
  })

export type State = {
  errors?: {
    username?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    lastName?: string[]
    firstName?: string[]
  }
  message?: string | null
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid Credentials"
    }
    throw error
  }
}

export async function register(state: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  })
  // If form validation fails, return errors early. Otherwise, continue.
  console.log("validatedFields: ", validatedFields)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Sign Up.",
    }
  }
  try {
    console.log("try catch block")
    const user = await prisma.user.findUnique({
      where: { email: formData.get("email") as string },
    })
    if (!user) {
      const data = validatedFields.data
      await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: (await bcrypt.hash(data.password, 10)) as string,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      })
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      })
    } else {
      return {
        message: "You already have an account",
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: "Invalid Credentials",
      }
    } else {
      console.error(error)
      return {
        message: "Something went wrong...",
      }
    }
  }
  revalidatePath("/")
  redirect("/")
}

export async function signOutAction() {
  await signOut()
}

export async function fetchProducts(
  category?: string | null,
  query?: string | null,
): Promise<Product[]> {
  noStore()
  let products: Product[] = []
  if (!category && !query) {
    products = await prisma.product.findMany()
  }
  if (category) {
    products = await prisma.product.findMany({
      where: {
        category: category,
      },
    })
  } else if (query) {
    products = await prisma.product.findMany({
      where: {
        OR: [{ category: { contains: query } }, { name: { contains: query } }],
      },
    })
  }
  return products
}

export async function fetchProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  })
  return product
}
