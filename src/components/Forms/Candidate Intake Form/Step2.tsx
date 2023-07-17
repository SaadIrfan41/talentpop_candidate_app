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
import { CandidateIntakeformStep2Schema } from '@/lib/validations/CandidateFormValidation/validations'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { CheckIcon } from '@/utils/Icons'
import { Textarea } from '@/components/ui/textarea'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { softwareToolsNames } from '@/components/staticData'
import { useCandidateIntakeFormStore } from '@/store/useCandidateIntakeFormStore'
import useStepper from '@/store/useStepperStore'

const Step2 = () => {
  const [animateRef] = useAutoAnimate()
  const { setStep2Data, step2Data } = useCandidateIntakeFormStore(
    (state) => state
  )
  const { setStepNumb } = useStepper((state) => state)

  // const [loading, setloading] = useState(false)
  const form = useForm<z.infer<typeof CandidateIntakeformStep2Schema>>({
    resolver: zodResolver(CandidateIntakeformStep2Schema),
    defaultValues: {
      typingTestScore: step2Data.typingTestScore,
      internetSpeedTestScore: step2Data.internetSpeedTestScore,
      generalQuestion1: step2Data.generalQuestion1,
      generalQuestion2: step2Data.generalQuestion2,
      generalQuestion3: step2Data.generalQuestion3,
      generalQuestion4: step2Data.generalQuestion4,
      generalQuestion5: step2Data.generalQuestion5,
      generalQuestion6: step2Data.generalQuestion6,
      generalQuestion7: step2Data.generalQuestion7,
      generalQuestion8: step2Data.generalQuestion8,
      generalQuestion9: step2Data.generalQuestion9,
      generalQuestion10: step2Data.generalQuestion10,
      generalQuestion11: step2Data.generalQuestion11,
    },
  })
  console.log(form.formState.errors)
  const onSubmit = async (
    values: z.infer<typeof CandidateIntakeformStep2Schema>
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('Values', values)
    setStep2Data(values)
    setStepNumb(3)
  }
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
            className=' hidden  h-[30px] w-[6.563rem] rounded-[10px] bg-[#8FD758] pb-1 text-xl font-bold text-white sm:block sm:text-xl   lg:hidden xl:block'
          >
            Next
          </button>
        </div>
        <div className=''>
          <span className=' w-full text-lg font-normal text-[#666666] '>
            Internet, Hardware, and Power Requirements:
          </span>
          <div className='  text-md font-normal text-[#64748B] outline-none'>
            <li>
              Reliable desktop/laptop PC only (Tablets and smartphones are
              prohibited)
            </li>
            <li>
              10 Mbps minimum download and upload (Back up ISP of 5 Mbps
              minimum)
            </li>
            <li>
              Minimum of Core i3 or Ryzen 3 with at least 4 GB RAM (or
              equivalent)
            </li>
            <li>
              Fully functioning video/web camera required (Noise cancelling
              headset required if providing Phone Support)
            </li>
          </div>
        </div>

        <div className=''>
          <p className=' w-full text-lg font-normal text-[#666666] '>
            Complete the typing quiz and speed test check using the links below.
            Using a computer, please take a screenshot of your results and
            upload it in the next step.
            <a
              href=' https://www.livechat.com/typing-speed-test/#/'
              target='_blank'
              rel='noreferrer noopener'
              className='underline decoration-wavy decoration-[#8FD758]'
            >
              Click Here
            </a>
          </p>
        </div>
        <div className='flex flex-col gap-y-2'>
          <FormLabel className='text-lg font-normal text-[#666666] outline-none'>
            Please upload your typing results here
          </FormLabel>
          <FormDescription>
            <span>
              File should be in{' '}
              <strong className=''> PDF or Document (.docx)</strong>
            </span>
          </FormDescription>

          <input
            {...form.register('typingTestScore')}
            accept='.pdf,.doc,.docx'
            id='typingTestScore'
            type='file'
            className='block w-full   text-sm mt-2
      text-slate-500 file:mr-4 file:rounded-xl
      file:border-0 file:bg-[#8FD758]
      file:px-4 file:py-2
      file:text-sm file:font-semibold
      file:text-white
      hover:file:cursor-pointer'
          />
          {form.formState.errors.typingTestScore && (
            <span className='text-red-400'>
              {form.formState.errors.typingTestScore?.message as string}
            </span>
          )}
        </div>
        <div className=' flex flex-col gap-3'>
          <p className=' w-full text-lg font-normal text-[#666666] '>
            Using your personal laptop/computer that you will use for work,
            please conduct a speed test check using this{' '}
            <a
              href=' https://speedtest.net'
              target='_blank'
              rel='noreferrer noopener'
              className='underline decoration-wavy decoration-[#8FD758] '
            >
              speedtest.net.
            </a>
          </p>
          <span className='text-[#64748B]'>
            Paste the <strong>link</strong> to your speed test results below.
          </span>
          <p className='text-[#64748B]'>
            Please Note: To be eligible for employment at TalentPop, agents are
            required a minimum of 10Mbps internet speed{' '}
            <strong className=' italic'>for both UPLOAD and DOWNLOAD.</strong>{' '}
            Reliable/working devices include functioning video and microphone
            functionality. Mobile devices and/or tablets are prohibited. *If you
            are invited to interview, be prepared to share your screen during
            the call with our team to conduct a live speed test!*
          </p>
        </div>
        <FormField
          control={form.control}
          name='internetSpeedTestScore'
          render={({ field }) => (
            <FormItem className='  w-full  max-w-md ' ref={animateRef}>
              <FormControl>
                <Input
                  type='text'
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Enter Your Test Score...'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='generalQuestion1'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                A customer is asking for &quot;general&quot; shipping
                information for a particular brand, where would you first go to
                find the answer?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={step2Data.generalQuestion1 === 'Google'}
                      className='peer sr-only'
                      {...field}
                      value='Google'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Google'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={
                        step2Data.generalQuestion1 === 'Your Manager'
                      }
                      className='peer sr-only'
                      {...field}
                      value='Your Manager'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Your Manager'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion1 === 'The brand’s FAQ page'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='The brand’s FAQ page'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'The brand’s FAQ page'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion1 ===
                        'USPS/DHL/UPS/FedEx Website'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='USPS/DHL/UPS/FedEx Website'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'USPS/DHL/UPS/FedEx Website'}</span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='generalQuestion2'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                What is the best way to respond to an angry customer?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion2 ===
                        'Answer their question directly and to the point'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Answer their question directly and to the point'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {'Answer their question directly and to the point'}
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion2 ===
                        'Tell them they are being rude, to calm down, and then answer their question'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Tell them they are being rude, to calm down, and then answer their question'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Tell them they are being rude, to calm down, and then answer their question'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion2 ===
                        'Let them know you understand their frustration, apologize, and then answer their question'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Let them know you understand their frustration, apologize, and then answer their question'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Let them know you understand their frustration, apologize, and then answer their question'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion2 ===
                        'Say sorry and give them a discount or a gift'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Say sorry and give them a discount or a gift'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {'Say sorry and give them a discount or a gift'}
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
          name='generalQuestion3'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Which sentence is correct?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion3 ===
                        'I should of called my grandma.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='I should of called my grandma.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'I should of called my grandma.'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion3 ===
                        'I shouldve called my grandma.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='I shouldve called my grandma.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'I shouldve called my grandma.'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion3 ===
                        'I should have called my grandma.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='I should have called my grandma.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'I should have called my grandma.'}</span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='generalQuestion4'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Which sentence is correct?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion4 ===
                        'If you still wish to proceed with the refund, kindly see the refund process on our website for your reference.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='If you still wish to proceed with the refund, kindly see the refund process on our website for your reference.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'If you still wish to proceed with the refund, kindly see the refund process on our website for your reference.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion4 ===
                        'If you still wish to proceed with the refund, kindly, see the refund process on our website for your reference.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='If you still wish to proceed with the refund, kindly, see the refund process on our website for your reference.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'If you still wish to proceed with the refund, kindly, see the refund process on our website for your reference.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion4 ===
                        'If you still wish to proceed with the refund, kindly see refund process on our website for your reference.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='If you still wish to proceed with the refund, kindly see refund process on our website for your reference.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'If you still wish to proceed with the refund, kindly see refund process on our website for your reference.'
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
          name='generalQuestion5'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Which sentence is correct?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion5 ===
                        'I have so much fun at your dinner parties. The guests always have a smile on there face because of how delicious everything is. Your a great host and there is no cook better than you!'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='I have so much fun at your dinner parties. The guests always have a smile on there face because of how delicious everything is. Your a great host and there is no cook better than you!'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'I have so much fun at your dinner parties. The guests always have a smile on there face because of how delicious everything is. Your a great host and there is no cook better than you!'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion5 ===
                        'I have so much fun at your dinner parties. The guests always have a smile on their face because of how delicious everything is. You’re a great host and there is no cook better than you!'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='I have so much fun at your dinner parties. The guests always have a smile on their face because of how delicious everything is. You’re a great host and there is no cook better than you!'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'I have so much fun at your dinner parties. The guests always have a smile on their face because of how delicious everything is. You’re a great host and there is no cook better than you!'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion5 ===
                        `I have so much fun at your dinner parties. The guests always have a smile on their face because of how delicious everything is. You're a great host and there is no cook better then you!`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value={`I have so much fun at your dinner parties. The guests always have a smile on their face because of how delicious everything is. You're a great host and there is no cook better then you!`}
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {`I have so much fun at your dinner parties. The guests always have a smile on their face because of how delicious everything is. You're a great host and there is no cook better then you!`}
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
          name='generalQuestion6'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Which sentence is correct?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion6 ===
                        'We apologize that you receive an incomplete order, please know that this is not the experience that we would want you to have with TalentPop.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='We apologize that you receive an incomplete order, please know that this is not the experience that we would want you to have with TalentPop.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'We apologize that you receive an incomplete order, please know that this is not the experience that we would want you to have with TalentPop.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion6 ===
                        'We apologize that you received an incomplete order. Please know that this is not the experience that we would want you to have with TalentPop.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='We apologize that you received an incomplete order. Please know that this is not the experience that we would want you to have with TalentPop.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'We apologize that you received an incomplete order. Please know that this is not the experience that we would want you to have with TalentPop.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion6 ===
                        'We apologize that you received an incompleted order. Please know that this is not the experience that we would want you to have with TalentPop.'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='We apologize that you received an incompleted order. Please know that this is not the experience that we would want you to have with TalentPop.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'We apologize that you received an incompleted order. Please know that this is not the experience that we would want you to have with TalentPop.'
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
          name='generalQuestion7'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Which sentence is correct?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion7 ===
                        `Would you please provide to me your order number and complete shipping address? Once I receive that information, I can assist you further.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Would you please provide to me your order number and complete shipping address? Once I receive that information, I can assist you further.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Would you please provide to me your order number and complete shipping address? Once I receive that information, I can assist you further.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion7 ===
                        `Would you please provide me your order number and complete shipping address? Once I receive that information, I can further assist you.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Would you please provide me your order number and complete shipping address? Once I receive that information, I can further assist you.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Would you please provide me your order number and complete shipping address? Once I receive that information, I can further assist you.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion7 ===
                        `Would you please provide me your order number and completed shipping address? Once I received that information I can help you further.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Would you please provide me your order number and completed shipping address? Once I received that information I can help you further.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Would you please provide me your order number and completed shipping address? Once I received that information I can help you further.'
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
          name='generalQuestion8'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                What size laptop can the Everyday Messenger Bag carry?{' '}
                <a
                  href=' https://www.peakdesign.com/'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='underline decoration-wavy decoration-[#8FD758]'
                >
                  https://www.peakdesign.com/
                </a>
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion8 === `Any Size Laptop`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Any Size Laptop'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Any Size Laptop'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion8 === `Up to 20" Laptop`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Up to 20" Laptop'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Up to 20" Laptop'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion8 === `16" Laptop`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='16" Laptop'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'16" Laptop'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion8 === `13” Laptop`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='13” Laptop'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'13” Laptop'}</span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='generalQuestion9'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                What is the difference between the two tripods?{' '}
                <a
                  href=' https://www.peakdesign.com/
'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='underline decoration-wavy decoration-[#8FD758]'
                >
                  https://www.peakdesign.com/
                </a>
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion9 ===
                        `One has stripes and the other doesn’t`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='One has stripes and the other doesn’t'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'One has stripes and the other doesn’t'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion9 ===
                        `One is made from aluminum and the other is carbon fiber`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='One is made from aluminum and the other is carbon fiber'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'One is made from aluminum and the other is carbon fiber'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion9 ===
                        `There is only one tripod on the site`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='There is only one tripod on the site'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'There is only one tripod on the site'}</span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='generalQuestion10'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                How would you best respond to the following question: Do you
                carry wallets and are they RFID blocking?{' '}
                <a
                  href='https://www.popovleather.com/
'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='underline decoration-wavy decoration-[#8FD758]'
                >
                  https://www.popovleather.com/
                </a>
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion10 ===
                        `Yes, we sell a wide variety of wallets!`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Yes, we sell a wide variety of wallets!'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Yes, we sell a wide variety of wallets!'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion10 ===
                        `We do not make RFID wallets.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='We do not make RFID wallets.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'We do not make RFID wallets.'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion10 ===
                        `Yes, we carry several types of wallets. Right now we don't make RFID blocking wallets, but we do offer a RFID blocking card that fits inside all our products.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value={`Yes, we carry several types of wallets. Right now we don't make RFID blocking wallets, but we do offer a RFID blocking card that fits inside all our products.`}
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {`Yes, we carry several types of wallets. Right now we don't make RFID blocking wallets, but we do offer a RFID blocking card that fits inside all our products.`}
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion10 ===
                        `Yes, we carry several types of wallets and all of them are RFID blocking wallets.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value={`Yes, we carry several types of wallets and all of them are RFID blocking wallets.`}
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {`Yes, we carry several types of wallets and all of them are RFID blocking wallets.`}
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
          name='generalQuestion11'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                I am moving to another apartment, what would be the best away to
                disassemble my Pod, specifically how to drain the hub?{' '}
                <a
                  href=' https://www.eightsleep.com/
'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='underline decoration-wavy decoration-[#8FD758]'
                >
                  https://www.eightsleep.com/
                </a>
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion11 ===
                        `You have the instructions, take it apart.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='You have the instructions, take it apart.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'You have the instructions, take it apart.'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion11 ===
                        `Press the opening at the back of the hub with your finger.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Press the opening at the back of the hub with your finger.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Press the opening at the back of the hub with your finger.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion11 ===
                        `Click the drain tool into the connectors at the back of the hub.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Click the drain tool into the connectors at the back of the hub.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Click the drain tool into the connectors at the back of the hub.'
                      }
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step2Data.generalQuestion11 ===
                        `Just use the tools we sent you.`
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Just use the tools we sent you.'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Just use the tools we sent you.'}</span>
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

export default Step2
