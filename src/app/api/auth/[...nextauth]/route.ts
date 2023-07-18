import { compare, hash } from 'bcrypt'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { prisma } from '../../../../../prisma/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Candidate } from '@prisma/client'
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        company_name: {
          label: 'Company Name',
          type: 'text',
        },

        password: { label: 'Password', type: 'password' },
        phone_number: { label: 'Phone Number', type: 'text' },
      },
      //@ts-ignore
      async authorize(credentials) {
        //@ts-ignore
        if (credentials?.action === 'login')
          return loginUser(credentials?.phone_number, credentials?.password)
        //@ts-ignore
        if (credentials?.action === 'register')
          // console.log('CREDENTIALS', credentials)
          //@ts-ignore
          return registerUser(
            //@ts-ignore
            credentials?.company_name,
            //@ts-ignore
            credentials?.phone_number,
            //@ts-ignore
            credentials?.password
          )
      },
    }),
  ],
  pages: {
    signIn: '/login',
    // signOut: '/login',
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log(url);
    //   return url.startsWith(baseUrl)
    //     ? Promise.resolve(url)
    //     : Promise.resolve(baseUrl)
    // },

    //@ts-ignore
    async session({ session, token }) {
      // console.log('Session Callback', { session, token })
      // const customer = await prisma.customer.findUnique({
      //   where: {
      //     id: token.sub,
      //   },
      //   // select: { password: false },
      // })
      // if (customer) {
      //   const c = customer as Customer
      //   return {
      //     ...session,
      //     user: {
      //       id: c.id,
      //       phoneNumber: c.phone_number,
      //       customerIntakeFormSubmited: c.candidate_intake_form_submited,
      //       stripeCustomerId: c.stripeCustomerId,
      //     },
      //   }
      // }
      // return session
      return {
        ...session,
        user: {
          id: token.id,
          phoneNumber: token.phoneNumber,
          candidateIntakeFormSubmited: token.candidateIntakeFormSubmited,
        },
      }
    },

    jwt: ({ token, user, trigger, session }) => {
      // console.log('JWT Callback', { token })
      // console.log('JWT Callback USER', { user })
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      if (user) {
        const u = user as Candidate
        return {
          ...token,
          id: user.id,
          phoneNumber: u.phone_number,
          candidateIntakeFormSubmited: u.candidate_intake_form_submited,
        }
      }
      return token
    },
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

const loginUser = async (phone_number: string, password: string) => {
  if (!phone_number || !password) {
    throw new Error('Invalid Credentials')
  }

  try {
    const user = await prisma.candidate.findFirst({
      where: {
        phone_number,
      },
    })

    if (!user) {
      throw new Error('User Does Not Exist')
    }
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid Credentials')
    }
    const userWithoutPassword = exclude(user, ['password'])
    console.log(userWithoutPassword)
    return {
      id: userWithoutPassword.id,
      phone_number: userWithoutPassword.phone_number,
      company_name: userWithoutPassword.company_name,
      candidate_intake_form_submited:
        userWithoutPassword.candidate_intake_form_submited,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

const registerUser = async (
  company_name: string,
  phone_number: string,
  password: string
) => {
  try {
    if (phone_number === '' || company_name === '' || password === '') {
      throw new Error('Invalid Credentials')
    }

    const checkCustomer = await prisma.candidate.findUnique({
      where: {
        phone_number,
      },
    })

    if (checkCustomer) {
      throw new Error('This User Allready Exist')
    }

    const cryptedPassword = await hash(password, 12)
    const newCustomer = await prisma.candidate.create({
      data: {
        phone_number,
        password: cryptedPassword,
        company_name,
      },
    })

    return {
      id: newCustomer.id,
      phone_number: newCustomer.phone_number,
      company_name: newCustomer.company_name,

      candidate_intake_form_submited:
        newCustomer.candidate_intake_form_submited,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
