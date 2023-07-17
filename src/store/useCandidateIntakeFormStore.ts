import { create } from 'zustand'
import { z } from 'zod'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Step1Data {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  gender: string
  agreementTo90DayRule: boolean
  applicationCodeAvaliable: string
  applicationCode?: string
  coverLetter: string
  resume?: any[]
  customSoftwareTool?: string
  howDidYouHear: string
  referred: string
  referredEmployee?: {
    firstName: string
    lastName: string
    relationship: string
  }
  applyingFrom: string
  // languages: string[]
  availabilityTime: string
  employmentStatus: string
  leaveOfAbsenceWithinSixMonths: string
  educationPlansWithinSixMonthsToYear: string
  noticePeriod: string
  customerSupportExperience: string
  ecommerceExperience: string
  softwareTools: string[]
  agreedPayRate: boolean
  mostCommonshiftAvailability: string
  preferedWorkingHours?: string
}

interface Step2Data {
  typingTestScore?: any[]
  internetSpeedTestScore: string
  generalQuestion1: string
  generalQuestion2: string
  generalQuestion3: string
  generalQuestion4: string
  generalQuestion5: string
  generalQuestion6: string
  generalQuestion7: string
  generalQuestion8: string
  generalQuestion9: string
  generalQuestion10: string
  generalQuestion11: string
}

interface Step3Data {
  customerServiceQuestion1: string
  customerServiceQuestion2: string
  customerServiceQuestion3: string
  customerServiceQuestion4: string
  customerServiceQuestion5: string
  validID: string
  activelyCheckEmail: boolean
  interestedInTraning: string
}

interface CombinedData extends Step1Data, Step2Data, Step3Data {}

type CandidateIntakeFormState = {
  step: number
  step1Data: Step1Data
  step2Data: Step2Data
  step3Data: Step3Data
  setStep: (step: number) => void
  setStep1Data: (data: Step1Data) => void
  setStep2Data: (data: Step2Data) => void
  setStep3Data: (data: Step3Data) => void
  resetForm: () => void
  getCombinedData: () => CombinedData
}
const initialState: CandidateIntakeFormState = {
  step: 1,
  step1Data: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    agreementTo90DayRule: false,
    applicationCodeAvaliable: '',
    applicationCode: '',
    coverLetter: '',
    resume: [],
    customSoftwareTool: '',
    howDidYouHear: '',
    referred: '',
    referredEmployee: {
      firstName: '',
      lastName: '',
      relationship: '',
    },
    applyingFrom: '',
    // languages: [],
    availabilityTime: '',
    employmentStatus: '',
    leaveOfAbsenceWithinSixMonths: '',
    educationPlansWithinSixMonthsToYear: '',
    noticePeriod: '',
    customerSupportExperience: '',
    ecommerceExperience: '',
    softwareTools: [],
    agreedPayRate: false,
    mostCommonshiftAvailability: '',
    preferedWorkingHours: '',
  },
  step2Data: {
    typingTestScore: [],
    internetSpeedTestScore: '',
    generalQuestion1: '',
    generalQuestion2: '',
    generalQuestion3: '',
    generalQuestion4: '',
    generalQuestion5: '',
    generalQuestion6: '',
    generalQuestion7: '',
    generalQuestion8: '',
    generalQuestion9: '',
    generalQuestion10: '',
    generalQuestion11: '',
  },
  step3Data: {
    customerServiceQuestion1: '',
    customerServiceQuestion2: '',
    customerServiceQuestion3: '',
    customerServiceQuestion4: '',
    customerServiceQuestion5: '',
    validID: '',
    activelyCheckEmail: false,
    interestedInTraning: '',
  },
  setStep: () => {},
  setStep1Data: () => {},
  setStep2Data: () => {},
  setStep3Data: () => {},
  resetForm: () => {},
  getCombinedData: () => ({} as CombinedData),
}

export const useCandidateIntakeFormStore = create<CandidateIntakeFormState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStep: (step) => set((state) => ({ ...state, step })),
      setStep1Data: (data) => set((state) => ({ ...state, step1Data: data })),
      setStep2Data: (data) => set((state) => ({ ...state, step2Data: data })),
      setStep3Data: (data) => set((state) => ({ ...state, step3Data: data })),
      resetForm: () => set(initialState),
      getCombinedData: () => {
        const { step1Data, step2Data, step3Data } = get()
        return {
          ...step1Data,
          ...step2Data,
          ...step3Data,
        }
      },
    }),

    {
      name: 'candidate_intake_form',
    }
  )
)
