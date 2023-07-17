'use client'
import React, { useEffect, useState } from 'react'
import Step1 from './Step1'
// import Step2 from './Step2'
// import Step3 from './Step3'

import { useStoreHook } from '@/utils/useStoreHook'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useStepper from '@/store/useStepperStore'
import Step2 from './Step2'
import Step3 from './Step3'

const Stepper = () => {
  const stepNumb = useStoreHook(useStepper, (state) => state.stepNumb)
  const [animateRef] = useAutoAnimate()

  return (
    <div ref={animateRef}>
      {stepNumb === 1 ? (
        <Step1 />
      ) : stepNumb === 2 ? (
        <Step2 />
      ) : stepNumb === 3 ? (
        <Step3 />
      ) : (
        <div className=' grid h-[90dvh] w-[90vw] place-content-center '>
          <div className='loader' />
        </div>
      )}
      {/* <Step2 /> */}
      {/* <div className=' grid h-[90dvh] w-[90vw] place-content-center '>
        <div className='loader' />
      </div> */}
    </div>
  )
}

export default Stepper
