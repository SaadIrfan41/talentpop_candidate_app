'use client'
import { Bulp, HelpIcon, MessagesIcon } from '@/utils/Icons'
import React, { Suspense } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useStepper from '@/store/useStepperStore'
import StepImage from '@/components/Forms/Candidate Intake Form/StepImages'
import Stepper from '@/components/Forms/Candidate Intake Form/Stepper'

const CandidateInatekFormPage = () => {
  const { stepNumb } = useStepper()

  const [animateRef] = useAutoAnimate()
  return (
    <div className='flex  '>
      <div className='relative w-[5rem]'>
        <div className='  fixed bottom-0 left-0 top-0 flex w-[5rem] flex-col justify-between border-r-2 border-[#DCDBE1]'>
          <div className='mt-10 flex flex-col items-center justify-center gap-y-6 '>
            <Bulp />

            <div className='relative flex flex-col items-center '>
              <div
                className={`relative z-10 flex h-8 w-8  items-center justify-center rounded-full  ${
                  stepNumb && stepNumb > 0 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } text-base font-semibold text-white`}
              >
                1
              </div>
              <div
                className={` h-10 w-[0.1rem] ${
                  stepNumb && stepNumb > 0 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } `}
              />
              <div
                className={`relative z-10 flex h-8 w-8  items-center justify-center rounded-full  ${
                  stepNumb && stepNumb > 1 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } text-base font-semibold text-white`}
              >
                2
              </div>
              <div
                className={` h-10 w-[0.1rem] ${
                  stepNumb && stepNumb > 1 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } `}
              />

              <div
                className={`relative z-10 flex h-8 w-8  items-center justify-center rounded-full  ${
                  stepNumb && stepNumb > 2 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } text-base font-semibold text-white`}
              >
                3
              </div>
            </div>
          </div>
          <div className='mt-10 flex flex-col items-center justify-center gap-y-8'>
            <HelpIcon />
            <MessagesIcon />
          </div>
        </div>
      </div>
      <div ref={animateRef} className='grid w-full grid-cols-12   gap-x-5 '>
        <div className=' col-span-12 mt-10  pl-10  pr-5   lg:col-span-7  lg:pl-6 '>
          <Stepper />
        </div>
        {stepNumb && (
          <div className=' relative ml-auto hidden h-full w-full  lg:col-span-5 lg:block'>
            <div className='sticky bottom-0 top-0 '>
              <StepImage />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateInatekFormPage
