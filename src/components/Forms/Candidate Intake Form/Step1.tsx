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
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { titleFont } from '@/utils/fonts'
import { CandidateIntakeformStep1Schema } from '@/lib/validations/CandidateFormValidation/validations'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { CheckIcon } from '@/utils/Icons'
import { Textarea } from '@/components/ui/textarea'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Label } from '@/components/ui/label'
import { softwareToolsNames } from '@/components/staticData'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useStoreHook } from '@/utils/useStoreHook'
import { useCandidateIntakeFormStore } from '@/store/useCandidateIntakeFormStore'
import useStepper from '@/store/useStepperStore'

const items = [
  {
    id: 'english',
    label: 'English',
  },
  {
    id: 'tagalog',
    label: 'Tagalog',
  },
  {
    id: 'spanish',
    label: 'Spanish',
  },
]

const Step1 = () => {
  const [animateRef] = useAutoAnimate()

  const { setStep1Data, step1Data } = useCandidateIntakeFormStore(
    (state) => state
  )
  const { setStepNumb } = useStepper((state) => state)

  const [applicationCodeAvaliable, setapplicationCodeAvaliable] =
    useState(false)
  const [referal, setreferal] = useState(false)
  const [country, setcountry] = useState(false)
  const [language, setlanguage] = useState(false)
  const [preferedWorkingHours, setpreferedWorkingHours] = useState(false)
  const form = useForm<z.infer<typeof CandidateIntakeformStep1Schema>>({
    resolver: zodResolver(CandidateIntakeformStep1Schema),
    defaultValues: {
      firstName: step1Data.firstName,
      lastName: step1Data.lastName,
      email: step1Data.email,
      phoneNumber: step1Data.phoneNumber,
      // gender: step1Data.gender,
      agreementTo90DayRule: step1Data.agreementTo90DayRule,
      applicationCodeAvaliable: step1Data.applicationCodeAvaliable,
      applicationCode: step1Data.applicationCode,

      coverLetter: step1Data.coverLetter,
      resume: step1Data.resume ? step1Data.resume[0] : [],
      // howDidYouHear: step1Data.howDidYouHear,
      referred: step1Data.referred,
      referredEmployee: step1Data.referredEmployee,
      applyingFrom: step1Data.applyingFrom,
      availabilityTime: step1Data.availabilityTime,
      employmentStatus: step1Data.employmentStatus,
      leaveOfAbsenceWithinSixMonths: step1Data.leaveOfAbsenceWithinSixMonths,
      educationPlansWithinSixMonthsToYear:
        step1Data.educationPlansWithinSixMonthsToYear,
      noticePeriod: step1Data.noticePeriod,
      customerSupportExperience: step1Data.customerSupportExperience,
      ecommerceExperience: step1Data.ecommerceExperience,
      softwareTools: step1Data.softwareTools,
      agreedPayRate: step1Data.agreedPayRate,
      mostCommonshiftAvailability: step1Data.mostCommonshiftAvailability,
      preferedWorkingHours: step1Data.preferedWorkingHours,
    },
  })
  console.log(form.formState.errors)
  console.log(step1Data)
  const onSubmit = async (
    values: z.infer<typeof CandidateIntakeformStep1Schema>
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('Values', values)
    setStep1Data(values)
    setStepNumb(2)
    // setloading(true)
  }
  // console.log(form.getValues('softwareTools'))
  console.log(
    step1Data.availabilityTime === 'I am available to work only Full-Time'
  )
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

        <div className=' flex gap-x-9'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='  w-full max-w-[190px] ' ref={animateRef}>
                <FormControl>
                  <Input
                    type='text'
                    className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                    placeholder='First Name'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='  w-full max-w-[190px] ' ref={animateRef}>
                <FormControl>
                  <Input
                    type='text'
                    className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                    placeholder='Last Name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='  w-full max-w-md' ref={animateRef}>
              <FormControl>
                <Input
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem className='  w-full max-w-md' ref={animateRef}>
              <FormControl>
                <Input
                  className=' py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Phone Number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem className=' max-w-xs' ref={animateRef}>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='h-14  text-lg font-normal text-[#6a7280] focus:ring-1 focus:ring-[#69C920]  focus:ring-offset-1 focus:ring-offset-[#69C920]'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select your Gender' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Female'>Female (she/her)</SelectItem>
                  <SelectItem value='Male'>Male (he/him)</SelectItem>
                  <SelectItem value='Non-Binary'>
                    Non - Binary (they/them)
                  </SelectItem>
                  <SelectItem value='Prefer not to say'>
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='agreementTo90DayRule'
          render={({ field }) => (
            <FormItem className='w-full' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                If you are reapplying within 90 days, your application will not
                be considered.
              </FormLabel>

              <FormDescription className=''>
                Please select I agree if you understood this condition.
              </FormDescription>

              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={step1Data.agreementTo90DayRule}
                      type='checkbox'
                      className='peer sr-only'
                      {...field}
                      value='Yes'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'I agree'}</span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div ref={animateRef} className='flex flex-col gap-y-2  '>
          <div className='flex flex-col'>
            <div className='flex items-center '>
              <span className=' w-full text-lg font-normal text-[#666666] '>
                Do You Have an Application Code?
              </span>
            </div>
          </div>
          <FormField
            control={form.control}
            name='applicationCodeAvaliable'
            render={({ field }) => (
              <FormItem className='  w-full  '>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='radio'
                        defaultChecked={
                          step1Data.applicationCodeAvaliable === 'Yes'
                        }
                        className='peer sr-only'
                        {...field}
                        value={'Yes'}
                        onClick={() => {
                          setapplicationCodeAvaliable(true)
                        }}
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>{'Yes'}</span>
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='applicationCodeAvaliable'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='radio'
                        className='peer sr-only'
                        defaultChecked={
                          step1Data.applicationCodeAvaliable === 'No'
                        }
                        {...field}
                        value={'No'}
                        onClick={() => {
                          setapplicationCodeAvaliable(false),
                            form.resetField('applicationCode')
                        }}
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
          {applicationCodeAvaliable && (
            <FormField
              defaultValue=''
              control={form.control}
              name='applicationCode'
              render={({ field }) => (
                <FormItem className=' max-w-md'>
                  <FormControl>
                    <Textarea
                      rows={7}
                      placeholder='Enter your Application Code here...'
                      className='resize-none focus-visible:ring-[#69C920] text-lg text-[#666666]  focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920]'
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={form.control}
          name='coverLetter'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none'>
                In a few sentences, please introduce yourself.
              </FormLabel>
              <FormDescription>
                (Share your relevant work experience, and why you would be a
                great candidate for this position.
              </FormDescription>
              <FormDescription>
                If you don&apos;t have any relevant experience, please share why
                you would be interested in this position.)
              </FormDescription>
              <FormControl>
                <Textarea
                  rows={7}
                  placeholder='Please provide your cover letter...'
                  className='resize-none focus-visible:ring-[#69C920] text-lg text-[#666666]  focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] max-w-md'
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-y-2'>
          <FormLabel className='text-lg font-normal text-[#666666] outline-none'>
            Please attach your resume.
          </FormLabel>
          <FormDescription>
            <span>
              File should be in{' '}
              <strong className=''> PDF or Document (.docx)</strong>
            </span>
          </FormDescription>
          <FormDescription>
            <span>
              <strong className=''> Please note:</strong> We require all resumes
              to be uploaded in English. We are unable to consider resumes in
              languages other than English. Thank you for your understanding.
            </span>
          </FormDescription>
          <input
            {...form.register('resume')}
            accept='.pdf,.doc,.docx'
            id='resume'
            type='file'
            className='block w-full   text-sm mt-2
      text-slate-500 file:mr-4 file:rounded-xl
      file:border-0 file:bg-[#8FD758]
      file:px-4 file:py-2
      file:text-sm file:font-semibold
      file:text-white
      hover:file:cursor-pointer'
          />
          {form.formState.errors.resume && (
            <span className='text-red-400'>
              {form.formState.errors.resume?.message as string}
            </span>
          )}
        </div>

        <FormField
          control={form.control}
          name='howDidYouHear'
          render={({ field }) => (
            <FormItem className='' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none'>
                How did you hear about this position?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='h-14  max-w-xs  text-lg font-normal text-[#6a7280] focus:ring-1 focus:ring-[#69C920]  focus:ring-offset-1 focus:ring-offset-[#69C920]'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Your Source' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Onlinejobs.ph'>Onlinejobs.ph</SelectItem>
                  <SelectItem value='Jobstreet'>Jobstreet</SelectItem>
                  <SelectItem value='Boss Job'>Boss Job</SelectItem>
                  <SelectItem value='LinkedIn'>LinkedIn</SelectItem>
                  <SelectItem value='Facebook Groups'>
                    Facebook Groups
                  </SelectItem>
                  <SelectItem value='RemoteHub'>RemoteHub</SelectItem>
                  <SelectItem value='Virtual Career Fair'>
                    Virtual Career Fair
                  </SelectItem>
                  <SelectItem value='ZA Indeed'>ZA Indeed</SelectItem>
                  <SelectItem value='Gumtree'>Gumtree</SelectItem>
                  <SelectItem value='Careers24'>Careers24</SelectItem>
                  <SelectItem value='Jamaican Jobs Online'>
                    Jamaican Jobs Online
                  </SelectItem>
                  <SelectItem value='Caribbean Jobs'>Caribbean Jobs</SelectItem>
                  <SelectItem value='Remote Job Hunting'>
                    Remote Job Hunting
                  </SelectItem>
                  <SelectItem value='Glassdoor'>Glassdoor</SelectItem>
                  <SelectItem value='Referred by current employee'>
                    Referred by current employee
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div ref={animateRef}>
          <FormField
            control={form.control}
            name='referred'
            render={({ field }) => (
              <FormItem className='w-full' ref={animateRef}>
                <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                  Were you referred by one of our current employees?
                </FormLabel>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='radio'
                        defaultChecked={step1Data.referred === 'Yes'}
                        className='peer sr-only'
                        {...field}
                        value={'Yes'}
                        onClick={() => setreferal(true)}
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
                        defaultChecked={step1Data.referred === 'No'}
                        {...field}
                        value='No'
                        onClick={() => {
                          setreferal(false), form.resetField('referredEmployee')
                        }}
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

          {referal && (
            <div className=' flex flex-col gap-4 mt-3'>
              <div className=' flex gap-x-9'>
                <FormField
                  control={form.control}
                  name='referredEmployee.firstName'
                  render={({ field }) => (
                    <FormItem
                      className='  w-full max-w-[190px] '
                      ref={animateRef}
                    >
                      <FormControl>
                        <Input
                          type='text'
                          className=' py-6 text-[#666666]  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                          placeholder='First Name'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='referredEmployee.lastName'
                  render={({ field }) => (
                    <FormItem
                      className='  w-full max-w-[190px] '
                      ref={animateRef}
                    >
                      <FormControl>
                        <Input
                          type='text'
                          className=' py-6 placeholder:text-lg text-[#666666]  placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                          placeholder='Last Name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='referredEmployee.relationship'
                render={({ field }) => (
                  <FormItem className='  w-full max-w-md' ref={animateRef}>
                    <FormControl>
                      <Input
                        className=' py-6 placeholder:text-lg text-[#666666]  placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920]'
                        placeholder='Your Relationship with this Employee'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name='applyingFrom'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Which country are you applying from?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={step1Data.applyingFrom === 'Philippines'}
                      className='peer sr-only'
                      {...field}
                      onClick={() => {
                        setcountry(false)
                      }}
                      value='Philippines'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Philippines'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={step1Data.applyingFrom === 'Jamaica'}
                      className='peer sr-only'
                      {...field}
                      onClick={() => {
                        setcountry(false)
                      }}
                      value='Jamaica'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Jamaica'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      className='peer sr-only'
                      defaultChecked={step1Data.applyingFrom === 'South Africa'}
                      {...field}
                      value='South Africa'
                      onClick={() => {
                        setcountry(false)
                      }}
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'South Africa'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={step1Data.applyingFrom === 'Kenya'}
                      className='peer sr-only'
                      {...field}
                      value='Kenya'
                      onClick={() => {
                        setcountry(false)
                      }}
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Kenya'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      className='peer sr-only'
                      defaultChecked={step1Data.applyingFrom === 'Mexico'}
                      {...field}
                      onClick={() => {
                        setcountry(false)
                      }}
                      value='Mexico'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Mexico'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      className='peer sr-only'
                      defaultChecked={step1Data.applyingFrom === 'Costa Rica'}
                      {...field}
                      onClick={() => {
                        setcountry(false)
                      }}
                      value='Costa Rica'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Costa Rica'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full flex flex-col gap-3 text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      // defaultChecked={step1Data.applyingFrom === ''}
                      {...field}
                      value={''}
                      className='peer sr-only'
                      onClick={() => {
                        setcountry(true)
                      }}
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Other:'}</span>
                  </label>
                  <div ref={animateRef}>
                    {country && (
                      <Input
                        type='text'
                        className=' max-w-xs py-6  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                        placeholder='Applying From ?'
                        {...field}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name='languages'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='languages'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <div ref={animateRef}>
          <FormField
            control={form.control}
            name='languages'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                  What languages can you speak/write?
                </FormLabel>
                <FormControl>
                  <div
                    className='w-full  text-lg    font-normal text-[#666666] outline-none transition-all duration-300'
                    // key={index}
                  >
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <input
                        type='checkbox'
                        className='peer sr-only'
                        // {...register('platformName')}
                        value={'English'}
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>{'English'}</span>
                    </label>
                  </div>
                </FormControl>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='checkbox'
                        className='peer sr-only'
                        {...field}
                        value='Tagalog'
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>{'Tagalog'}</span>
                    </label>
                  </div>
                </FormControl>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='checkbox'
                        className='peer sr-only'
                        {...field}
                        value='Spanish'
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>{'Spanish'}</span>
                    </label>
                  </div>
                </FormControl>

                <FormControl>
                  <div className='w-full flex flex-col gap-3 text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='checkbox'
                        {...field}
                        value={''}
                        className='peer sr-only'
                        onClick={() => {
                          setlanguage(!language)
                        }}
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>{'Other:'}</span>
                    </label>
                    {language && (
                      <Input
                        type='text'
                        className=' max-w-xs py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                        placeholder='Laguage...'
                        {...field}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <FormField
          control={form.control}
          name='availabilityTime'
          render={({ field }) => (
            <>
              <FormItem className='space-y-3'>
                <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                  What is your availability?
                </FormLabel>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <input
                        type='radio'
                        defaultChecked={
                          step1Data.availabilityTime ===
                          'I am available to work only Full-Time'
                        }
                        className='peer sr-only'
                        {...field}
                        value='I am available to work only Full-Time'
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>{'I am available to work only Full-Time'}</span>
                    </label>
                  </div>
                </FormControl>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='radio'
                        className='peer sr-only'
                        defaultChecked={
                          step1Data.availabilityTime ===
                          'I am available to work only Part-Time'
                        }
                        {...field}
                        value='I am available to work only Part-Time'
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>{'I am available to work only Part-Time'}</span>
                    </label>
                  </div>
                </FormControl>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='radio'
                        defaultChecked={
                          step1Data.availabilityTime ===
                          'I am available to work both Full-Time and Part-Time'
                        }
                        className='peer sr-only'
                        {...field}
                        value='I am available to work both Full-Time and Part-Time'
                      />
                      <div className='text-white peer-checked:text-[#D0F289]'>
                        <CheckIcon />
                      </div>
                      <span>
                        {'I am available to work both Full-Time and Part-Time'}
                      </span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={form.control}
          name='employmentStatus'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                What is your current employment status?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={
                        step1Data.employmentStatus === 'Unemployed'
                      }
                      className='peer sr-only'
                      {...field}
                      value='Unemployed'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Unemployed'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.employmentStatus ===
                        'Freelancing (flexible hours no set schedule)'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Freelancing (flexible hours no set schedule)'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {'Freelancing (flexible hours no set schedule)'}
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.employmentStatus ===
                        'Currently employed Part Time, looking for a new full time/part time opportunity'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Currently employed Part Time, looking for a new full time/part time opportunity'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Currently employed Part Time, looking for a new full time/part time opportunity'
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
                        step1Data.employmentStatus ===
                        'Currently employed Full Time, looking for a new full time/part time opportunity'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Currently employed Full Time, looking for a new full time/part time opportunity'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Currently employed Full Time, looking for a new full time/part time opportunity'
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
                        step1Data.employmentStatus ===
                        'Currently rendering hours, looking for a new full time/part time opportunities'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Currently rendering hours, looking for a new full time/part time opportunities'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {
                        'Currently rendering hours, looking for a new full time/part time opportunities'
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
          name='leaveOfAbsenceWithinSixMonths'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Do you anticipate taking a Leave Of Absence within the next 6
                months due to any physical limitations and/or other reasons that
                may interfere with your tasks as a virtual agent?
              </FormLabel>
              <FormControl>
                <Input
                  className=' max-w-md py-6 placeholder:text-lg text-[#666666] placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Reason for Leave of Absence...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='educationPlansWithinSixMonthsToYear'
          render={({ field }) => (
            <FormItem className='  w-full ' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Please let us know if you are currently enrolled in school
                and/or if you plan to enroll/continue your education within the
                next 6 months to 1 year.
              </FormLabel>
              <FormControl>
                <Input
                  className=' max-w-md py-6 placeholder:text-lg text-[#666666] placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                  placeholder='Education Plans within Six Months To Year...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='noticePeriod'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                If you are resigning from your current employer, how many days
                would you need to render and how soon can you start?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.noticePeriod ===
                        'Not Rendering/ Can Start Immediately'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Not Rendering/ Can Start Immediately'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Not Rendering/ Can Start Immediately'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={step1Data.noticePeriod === '1 Week'}
                      className='peer sr-only'
                      {...field}
                      value='1 Week'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'1 Week'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={step1Data.noticePeriod === '2 Weeks'}
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='2 Weeks'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'2 Weeks'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={step1Data.noticePeriod === '30+ Days'}
                      className='peer sr-only'
                      {...field}
                      value='30+ Days'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'30+ Days'}</span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customerSupportExperience'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                How many years of combined Customer Support (including Customer
                Service, Technical Support, Sales...) experience do you have?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.customerSupportExperience ===
                        'None, this will be my first customer service job!'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='None, this will be my first customer service job!'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>
                      {'None, this will be my first customer service job!'}
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.customerSupportExperience ===
                        'Less than 1 year'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='Less than 1 year'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Less than 1 year'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.customerSupportExperience === '1 - 2 years'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='1 - 2 years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'1 - 2 years'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.customerSupportExperience === '2 - 4 years'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='2 - 4 years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'2 - 4 years'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.customerSupportExperience === '4 - 6 years'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='4 - 6 years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'4 - 6 years'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.customerSupportExperience === '6 - 8 years'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='6 - 8 years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'6 - 8 years'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={
                        step1Data.customerSupportExperience === '8+ years'
                      }
                      className='peer sr-only'
                      {...field}
                      value='8+ years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'8+ years'}</span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='ecommerceExperience'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                How many years of E-Commerce experience do you have?
              </FormLabel>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.ecommerceExperience ===
                        'None, and willing to learn!'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='None, and willing to learn!'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'None, and willing to learn!'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={
                        step1Data.ecommerceExperience === 'Less than 1 year'
                      }
                      className='peer sr-only'
                      {...field}
                      value='Less than 1 year'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'Less than 1 year'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.ecommerceExperience === '1 - 2 years'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='1 - 2 years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'1 - 2 years'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      type='radio'
                      defaultChecked={
                        step1Data.ecommerceExperience === '2 - 3 years'
                      }
                      className='peer sr-only'
                      {...field}
                      value='2 - 3 years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'2 - 3 years'}</span>
                  </label>
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={
                        step1Data.ecommerceExperience === '3+ years'
                      }
                      type='radio'
                      className='peer sr-only'
                      {...field}
                      value='3+ years'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'3+ years'}</span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div ref={animateRef} className='flex flex-col gap-y-3 '>
          <div ref={animateRef} className='flex flex-col'>
            <h1 className=' w-full text-lg font-normal text-[#666666]'>
              What software tools have you used with your previous work
              experience?
            </h1>
            {form.formState.errors.softwareTools && (
              <span className=' text-red-400'>
                {form.formState.errors.softwareTools.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-y-1 '>
            {softwareToolsNames.map((name, index) => (
              <div
                className='w-full  text-lg    font-normal text-[#666666] outline-none transition-all duration-300'
                key={index}
              >
                <label className='flex cursor-pointer items-center gap-x-3'>
                  <input
                    type='checkbox'
                    className='peer sr-only'
                    {...form.register('softwareTools')}
                    value={name}
                  />
                  <div className='text-white peer-checked:text-[#D0F289]'>
                    <CheckIcon />
                  </div>
                  <span>{name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <FormField
          control={form.control}
          name='agreedPayRate'
          render={({ field }) => (
            <FormItem className='w-full' ref={animateRef}>
              <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                Our pay, as mentioned on our job post, is $3/hr for Non-Voice
                Accounts and $4/hr for Voice Blended Accounts. Please confirm
                that this works for you.
              </FormLabel>

              <FormDescription className=''>
                Please select I confirm if you agree to our pay rates.
              </FormDescription>

              <FormControl>
                <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <Input
                      defaultChecked={step1Data.agreedPayRate}
                      type='checkbox'
                      className='peer sr-only'
                      {...field}
                      value='Yes'
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{'I confirm'}</span>
                  </label>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div ref={animateRef}>
          <FormField
            control={form.control}
            name='mostCommonshiftAvailability'
            render={({ field }) => (
              <FormItem className='w-full' ref={animateRef}>
                <FormLabel className='text-lg font-normal text-[#666666] outline-none '>
                  The most common shift that we are actively recruiting for is
                  an 8 hour shift between 9 AM - 6 PM US EST/US PST (10PM - 10AM
                  Philippine time). Are you able to work these hours?
                </FormLabel>
                <FormControl>
                  <div className='w-full text-lg font-normal text-[#666666] outline-none transition-all duration-300'>
                    <label className='flex cursor-pointer items-center gap-x-3'>
                      <Input
                        type='radio'
                        defaultChecked={
                          step1Data.mostCommonshiftAvailability === 'Yes'
                        }
                        className='peer sr-only'
                        {...field}
                        value={'Yes'}
                        onClick={() => setpreferedWorkingHours(false)}
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
                        defaultChecked={
                          step1Data.mostCommonshiftAvailability === 'No'
                        }
                        className='peer sr-only'
                        {...field}
                        value='No'
                        onClick={() => {
                          setpreferedWorkingHours(true),
                            form.resetField('mostCommonshiftAvailability')
                        }}
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

          {preferedWorkingHours && (
            <div className=' flex flex-col gap-4 mt-3'>
              <div className=' flex gap-x-9'>
                <FormField
                  control={form.control}
                  name='preferedWorkingHours'
                  render={({ field }) => (
                    <FormItem className='  w-full max-w-md ' ref={animateRef}>
                      <FormControl>
                        <Input
                          type='text'
                          className=' py-6 text-[#666666]  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] text-lg focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                          placeholder='Prefered Working Hours'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>

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

export default Step1
