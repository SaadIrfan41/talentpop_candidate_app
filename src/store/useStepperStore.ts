import { create } from 'zustand'
type StepperState = {
  stepNumb: number
  setStepNumb: (stepNumb: number) => void
}

const useStepper = create<StepperState, any[]>(
  // persist(
  (set) => ({
    stepNumb: 1,
    setStepNumb: (stepNumb) => set({ stepNumb }),
  })
  //   {
  //     name: 'CIF-Stepper',
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
)

export default useStepper
