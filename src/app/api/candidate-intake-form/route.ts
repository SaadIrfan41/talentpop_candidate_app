import { NextResponse, NextRequest } from 'next/server'

import { z, ZodType } from 'zod'

import { headers, cookies } from 'next/headers'
// import { getToken } from 'next-auth/jwt'
import { prisma } from '../../../../prisma/prisma'
import { CandidateIntakeFormSchema } from '@/lib/validations/CandidateFormValidation/validations'
import { getToken } from 'next-auth/jwt'

// const allowedFormats = [
//   'application/pdf',
//   'application/msword',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// ]
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// type CustomerIntakeFormStep4Types = z.infer<typeof CustomerIntakeformSchema>

export async function POST(request: NextRequest) {
  // console.log('FORM DATA', await request.json())
  // console.log('HELLO World')
  const { body, resumeUrl, testScoreUrl } = await request.json()
  console.log(body)
  // console.log('BODY', await request.json())
  // return NextResponse.json(res, { status: 200 })
  try {
    const res = CandidateIntakeFormSchema.safeParse(body)
    console.log('SERVER RESPONSE', res)
    if (!res.success) {
      const formatted = res.error.format()
      console.log('Formated', formatted)
      return NextResponse.json(
        {
          Error: formatted._errors,
          firstName: formatted.firstName?._errors,
          lastName: formatted.lastName?._errors,
          email: formatted.email?._errors,
          phoneNumber: formatted.phoneNumber?._errors,
          gender: formatted.gender?._errors,
          agreementTo90DayRule: formatted.agreementTo90DayRule?._errors,
          applicationCodeAvaliable: formatted.applicationCodeAvaliable?._errors,
          applicationCode: formatted.applicationCode?._errors,
          coverLetter: formatted.coverLetter?._errors,
          //   resume: formatted.resume?._errors,
          customSoftwareTool: formatted.customSoftwareTool?._errors,
          howDidYouHear: formatted.howDidYouHear?._errors,
          referred: formatted.referred?._errors,
          referredEmployee: formatted.referredEmployee?._errors,
          applyingFrom: formatted.applyingFrom?._errors,
          availabilityTime: formatted.availabilityTime?._errors,
          employmentStatus: formatted.employmentStatus?._errors,
          leaveOfAbsenceWithinSixMonths:
            formatted.leaveOfAbsenceWithinSixMonths?._errors,
          educationPlansWithinSixMonthsToYear:
            formatted.educationPlansWithinSixMonthsToYear?._errors,
          noticePeriod: formatted.noticePeriod?._errors,
          customerSupportExperience:
            formatted.customerSupportExperience?._errors,
          ecommerceExperience: formatted.ecommerceExperience?._errors,
          softwareTools: formatted.softwareTools?._errors,
          agreedPayRate: formatted.agreedPayRate?._errors,
          mostCommonshiftAvailability:
            formatted.mostCommonshiftAvailability?._errors,
          preferedWorkingHours: formatted.preferedWorkingHours?._errors,
          //   typingTestScore: formatted.typingTestScore?._errors,
          internetSpeedTestScore: formatted.internetSpeedTestScore?._errors,
          generalQuestion1: formatted.generalQuestion1?._errors,
          generalQuestion2: formatted.generalQuestion2?._errors,
          generalQuestion3: formatted.generalQuestion3?._errors,
          generalQuestion4: formatted.generalQuestion4?._errors,
          generalQuestion5: formatted.generalQuestion5?._errors,
          generalQuestion6: formatted.generalQuestion6?._errors,
          generalQuestion7: formatted.generalQuestion7?._errors,
          generalQuestion8: formatted.generalQuestion8?._errors,
          generalQuestion9: formatted.generalQuestion9?._errors,
          generalQuestion10: formatted.generalQuestion10?._errors,
          generalQuestion11: formatted.generalQuestion11?._errors,
          customerServiceQuestion1: formatted.customerServiceQuestion1?._errors,
          customerServiceQuestion2: formatted.customerServiceQuestion2?._errors,
          customerServiceQuestion3: formatted.customerServiceQuestion3?._errors,
          customerServiceQuestion4: formatted.customerServiceQuestion4?._errors,
          customerServiceQuestion5: formatted.customerServiceQuestion5?._errors,
          validID: formatted.validID?._errors,
          activelyCheckEmail: formatted.activelyCheckEmail?._errors,
          interestedInTraning: formatted.interestedInTraning?._errors,
        },
        { status: 400 }
      )
    }
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      agreementTo90DayRule,
      applicationCodeAvaliable,
      applicationCode,
      coverLetter,

      customSoftwareTool,
      howDidYouHear,
      referred,
      referredEmployee,
      applyingFrom,
      availabilityTime,
      employmentStatus,
      leaveOfAbsenceWithinSixMonths,
      educationPlansWithinSixMonthsToYear,
      noticePeriod,
      customerSupportExperience,
      ecommerceExperience,
      softwareTools,
      agreedPayRate,
      mostCommonshiftAvailability,
      preferedWorkingHours,

      internetSpeedTestScore,
      generalQuestion1,
      generalQuestion2,
      generalQuestion3,
      generalQuestion4,
      generalQuestion5,
      generalQuestion6,
      generalQuestion7,
      generalQuestion8,
      generalQuestion9,
      generalQuestion10,
      generalQuestion11,
      customerServiceQuestion1,
      customerServiceQuestion2,
      customerServiceQuestion3,
      customerServiceQuestion4,
      customerServiceQuestion5,
      validID,
      activelyCheckEmail,
      interestedInTraning,
    } = res.data

    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    })
    if (!session)
      return NextResponse.json(
        { message: 'UNAUTHORIZED USER' },
        { status: 401 }
      )
    console.log(session)
    await prisma.candidateIntakeForm.create({
      data: {
        candidate_id: session?.sub as string,
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        agreementTo90DayRule,
        applicationCodeAvaliable,
        applicationCode,
        coverLetter,
        resume: resumeUrl,
        customSoftwareTool,
        howDidYouHear,
        referred,
        referredEmployeeFirstName: referredEmployee?.firstName,
        referredEmployeeLastName: referredEmployee?.lastName,
        referredEmployeeRelationship: referredEmployee?.relationship,
        applyingFrom,
        availabilityTime,
        employmentStatus,
        leaveOfAbsenceWithinSixMonths,
        educationPlansWithinSixMonthsToYear,
        noticePeriod,
        customerSupportExperience,
        ecommerceExperience,
        softwareTools,
        agreedPayRate,
        mostCommonshiftAvailability,
        preferedWorkingHours,
        typingTestScore: testScoreUrl,
        internetSpeedTestScore,
        generalQuestion1,
        generalQuestion2,
        generalQuestion3,
        generalQuestion4,
        generalQuestion5,
        generalQuestion6,
        generalQuestion7,
        generalQuestion8,
        generalQuestion9,
        generalQuestion10,
        generalQuestion11,
        customerServiceQuestion1,
        customerServiceQuestion2,
        customerServiceQuestion3,
        customerServiceQuestion4,
        customerServiceQuestion5,
        validID,
        activelyCheckEmail,
        interestedInTraning,
      },
    })
    const updatedCustomer = await prisma.candidate.update({
      where: {
        id: session?.sub as string,
      },
      data: {
        candidate_intake_form_submited: true,
      },
    })

    return NextResponse.json(
      {
        formSubmited: updatedCustomer.candidate_intake_form_submited,
        // invoice: Invoice,
      },
      { status: 200 }
    )
    // return NextResponse.json({ formSubmited: 'ALL IS WELL' }, { status: 200 })
  } catch (e: any) {
    console.log('ERROR', e)
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (e.code === 'P2002') {
    //     console.log(
    //       'There is a unique constraint violation, a new user cannot be created with this email'
    //     )
    //   }
    // }
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}

// export async function GET(request: Request) {
//   try {
//     const session = await getToken({
//       //@ts-ignore
//       req: request,
//       secret: process.env.NEXTAUTH_SECRET,
//       secureCookie: process.env.NODE_ENV === 'production',
//     })

//     const form = await prisma.customerIntakeForm.findUnique({
//       where: {
//         customer_id: session?.sub as string,
//       },
//     })

//     return NextResponse.json(form, { status: 200 })
//   } catch (e: any) {
//     return NextResponse.json({ message: e.message }, { status: 400 })
//   }
// }
