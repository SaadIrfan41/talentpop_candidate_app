'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

import { titleFont } from '@/utils/fonts'
import { CandidateIntakeformStep3Schema } from '@/lib/validations/CandidateFormValidation/validations'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { CheckIcon } from '@/utils/Icons'
import { Textarea } from '@/components/ui/textarea'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { softwareToolsNames } from '@/components/staticData'
import { useCandidateIntakeFormStore } from '@/store/useCandidateIntakeFormStore'
import useStepper from '@/store/useStepperStore'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

const Step3 = () => {
  const { data: session, update } = useSession()

  const [animateRef] = useAutoAnimate()
  const { setStep3Data, step3Data, getCombinedData } =
    useCandidateIntakeFormStore((state) => state)
  const router = useRouter()

  const form = useForm<z.infer<typeof CandidateIntakeformStep3Schema>>({
    resolver: zodResolver(CandidateIntakeformStep3Schema),
    defaultValues: {
      customerServiceQuestion1: step3Data.customerServiceQuestion1,
      customerServiceQuestion2: step3Data.customerServiceQuestion2,
      customerServiceQuestion3: step3Data.customerServiceQuestion3,
      customerServiceQuestion4: step3Data.customerServiceQuestion4,
      customerServiceQuestion5: step3Data.customerServiceQuestion5,
      validID: step3Data.validID,
      activelyCheckEmail: step3Data.activelyCheckEmail,
      interestedInTraning: step3Data.interestedInTraning,
    },
  })
  // console.log(form.formState.errors)
  const onSubmit = async (
    values: z.infer<typeof CandidateIntakeformStep3Schema>
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log('Values', values)
    setStep3Data(values)
    const body = getCombinedData()
    let resumeUrl = ''
    let testScoreUrl = ''
    if (body.resume && body.typingTestScore) {
      try {
        const resumeFile = body.resume[0]
        const resumeFileType = resumeFile.type
        // console.log(resumeFile, resumeFileType)

        const typingTestScoreFile = body.typingTestScore[0]
        const typingTestScoreFileType = typingTestScoreFile.type
        // const { data } = await axios.get(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/s3Upload?fileType=${fileType}`
        // )

        const resumeRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/s3Upload?fileType=${resumeFileType}`
        )
        const typingTestingScoreRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/s3Upload?fileType=${typingTestScoreFileType}`
        )
        if (!resumeRes.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to Upload resume')
        }
        if (!typingTestingScoreRes.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to Upload Typing Test Score')
        }
        // console.log(await res.json())
        const resumeUploadURL = await resumeRes.json()
        const typingtestScoreUploadURL = await typingTestingScoreRes.json()
        // console.log(resumeUploadURL)
        // console.log(typingtestScoreUploadURL)

        await fetch(`${resumeUploadURL?.uploadUrl}`, {
          method: 'PUT',
          body: JSON.stringify({
            resumeFile,
          }),
        })
        await fetch(`${typingtestScoreUploadURL?.uploadUrl}`, {
          method: 'PUT',
          body: JSON.stringify({
            typingTestScoreFile,
          }),
        })
        // console.log(
        //   `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${resumeUploadURL?.key}`
        // )
        // console.log(
        //   `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${typingtestScoreUploadURL?.key}`
        // )

        resumeUrl = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${resumeUploadURL?.key}`

        testScoreUrl = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${typingtestScoreUploadURL?.key}`
        // console.log(object);
      } catch (error) {
        console.log(error)

        return
      }
    }
    //@ts-ignore

    //  const { uploadUrl, key } = data
    //  await axios.put(uploadUrl, file)
    // console.log('ObjectURL', `https://talentpop.s3.amazonaws.com/${key}`)
    //  body.qaSheet = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${key}`
    // setloading(true)
    // console.log(resumeUrl, testScoreUrl)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate-intake-form`,
        {
          method: 'POST',
          body: JSON.stringify({
            body,
            resumeUrl,
            testScoreUrl,
          }),
        }
      )
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
      // console.log(await res.json())
      const response = await res.json()
      console.log(response)
      if (response.message === 'Form Submited Successfully')
        await update({
          ...session,
          user: {
            ...session?.user,
            candidateIntakeFormSubmited: response.formSubmited,
          },
        })
      router.push('/dashboard')

      // router.push('/invoice')
    } catch (error) {
      console.log('ERROR INS RESPONSE', error)
    }

    // const { data } = await res.json()
    // console.log(data)
    // if (data.detail) {
    //   toast.error(data.detail)
    //   setloading(false)
    //   return
    // }
    // router.push('/')

    // if (res.status === 401) {
    //   return { message: "Not authenticated" };
    // }
  }
  //   console.log(form.getValues('softwareTools'))
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-5 px-[5%] pb-16 '
      >
        <div className=' flex w-full gap-x-16    md:gap-x-40 xl:gap-x-32 2xl:gap-x-52 '>
          <h1
            className={`${titleFont.className} text-3xl font-bold text-[#69C920] `}
          >
            Candidate Intake Form
          </h1>
          <button
            type='submit'
            disabled={form.formState.isSubmitting}
            className=' hidden  h-[30px] w-[6.563rem] disabled:bg-gray-400 rounded-[10px] bg-[#8FD758] pb-1 text-xl font-bold text-white sm:block sm:text-xl   lg:hidden xl:block'
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className='mt-1 h-4  animate-spin w-full' />
              </>
            ) : (
              'Next'
            )}
          </button>
        </div>
        <div className=' space-y-3'>
          <span className=' w-full text-lg font-normal text-[#666666] '>
            Instructions: Please answer the following 5 questions to your best
            ability. Respond to each question in about 4-6 sentences.
          </span>
          <div className=' space-y-3  text-md font-normal text-[#64748B] outline-none'>
            <p>
              <strong> PLEASE NOTE:</strong> This written portion of the
              application will make up 70% of your total grade. Please take the
              next 30 minutes to create your responses below and take your time
              to <strong>review</strong> and <strong>proofread</strong> your
              responses before submission.
            </p>
            <p className=' font-bold'>
              Please respond to the following questions in your own words. We
              have a method to detect whether you are copying answers from the
              internet or from AI tools. The use of AI tools to answer the
              questions below will result in application disqualification.
            </p>
          </div>
        </div>
        <FormField
          control={form.control}
          name='customerServiceQuestion1'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                What did you do on the day of your last birthday? Tell us about
                your day from start to finish and how you celebrated.
                <FormDescription>
                  Please Note: This question requires a minimum of 500
                  characters. Responses submitted below this requirement will
                  not be considered.
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Enter Your Answer ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customerServiceQuestion2'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Imagine you woke up on your perfect day today! Tell us what you
                are doing this day, as if you are living it in real time.
                <FormDescription>
                  Please Note: This question requires a minimum of 500
                  characters. Responses submitted below this requirement will
                  not be considered.
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Enter Your Answer ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customerServiceQuestion3'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Tell us about what success looks like for you in the next 5
                years. (What are your goals, dreams, aspirations, etc.)
                <FormDescription>
                  Please Note: This question requires a minimum of 500
                  characters. Responses submitted below this requirement will
                  not be considered.
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Enter Your Answer ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=''>
          <span className=' w-full text-lg font-normal text-[#666666] '>
            The following two inquiries may be situations you will encounter in
            your day-to-day role at TalentPop. Please answer these questions in{' '}
            <strong>Email Format</strong> using customer service best practices.
          </span>
        </div>

        <FormField
          control={form.control}
          name='customerServiceQuestion4'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Hi, my name is Susan. There is a problem with my order and I
                want a refund. Please advise. Thank you. (Please create an email
                response to this customer inquiry on how you would address their
                concern and solve this problem. Imagine the order number is
                1234567, and physical address is known)
                <FormDescription>
                  Please Note: This question requires a minimum of 700
                  characters. Responses submitted below this requirement will
                  not be considered.
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Enter Your Answer ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='customerServiceQuestion5'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Situation: You are noticing that the company is continuously
                receiving negative feedback regarding sizing issues for the same
                product. How do you inform the team about this issue? (Please
                share the message you will send to the team to inform them about
                this ongoing issue.)
                <FormDescription>
                  Please Note: This question requires a minimum of 700
                  characters. Responses submitted below this requirement will
                  not be considered.
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Enter Your Answer ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='validID'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Do you have a valid ID (Passport, Driver’s License or National
                ID)?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Yes'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Yes'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='No'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'No'}</span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='activelyCheckEmail'
          render={({ field }) => (
            <FormItem className='w-full' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                You will be receiving an email with the results within 48 hours.
                Once we review your application, you will receive an email
                automatically which sometimes ends up in the promotions/spam
                folder.(If you have previously applied, and unsubscribed to our
                emails, please adjust your settings so you are able to receive
                them)
              </FormLabel>

              <FormDescription className=''></FormDescription>

              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='checkbox'
                      className='peer sr-only'
                      {...field}
                      value='Yes'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span className=' '>
                      {
                        'I will ACTIVELY check my spam/promotion folders and/or re-subscribe to TalentPop emails for this email and future emails from us!'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='interestedInTraning'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                If you do not currently meet TalentPop’s minimum qualifications
                for the Customer Service Agent position, would you be interested
                in participating in a training program/learning academy (unpaid)
                to further develop your skillset in order to be eligible for
                pairing with one of our clients
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Yes'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Yes'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='No'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'No'}</span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className=' rounded-xl bg-[#8FD758] max-w-[150px] px-8 py-1 text-2xl font-bold text-white sm:hidden  sm:text-2xl lg:block   xl:hidden'
          type='submit'
        >
          Next
        </Button>
      </form>
    </Form>
  )
}

export default Step3
