import { z } from 'zod'
const allowedFormats = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
export const CandidateIntakeformStep1Schema = z.object({
  firstName: z.string().trim().nonempty('First name is required'),
  lastName: z.string().trim().nonempty('Last name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  phoneNumber: z
    .string()
    .trim()
    .min(10, 'PhoneNumber must contain at least 10 Digit(s)')
    .max(20, 'PhoneNumber must contain at least 30 Digit(s)')
    .regex(/^\d+$/, { message: 'Invalid Number' }),
  gender: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  agreementTo90DayRule: z
    .boolean({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .refine(
      (value) => {
        if (value) {
          return true
        }
        return false
      },
      {
        message: 'This Field is required ',
      }
    ),

  applicationCodeAvaliable: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  applicationCode: z
    .string()
    .refine((value) => {
      if (value) {
        if (value.trim().length > 0) {
          return true
        }
        return false
      }

      return true
    }, 'Enter your Application Code')
    .optional(),
  coverLetter: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  resume: z
    .any()
    .refine(
      (file) => {
        if (file?.length === 0) {
          return false
        }
        return true
      },
      { message: 'This Field is required' }
    )
    .refine(
      (file) => {
        if (file?.length > 0) {
          return file?.[0]?.size <= 1000000
        }
        return true
      },
      { message: 'Max file size is 1MB.' }
    )
    .refine(
      (file) => {
        if (file?.length !== 0) {
          return allowedFormats.includes(file?.[0]?.type)
        }
        return true
      },
      { message: 'Only PDF and DOC Files Allowed' }
    ),

  customSoftwareTool: z.string().trim().optional(),
  howDidYouHear: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  referred: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  referredEmployee: z
    .object({
      firstName: z.string().trim(),
      lastName: z.string().trim(),
      relationship: z.string().trim(),
    })
    .optional(),
  applyingFrom: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  // languages: z.array(
  //   z.string({
  //     required_error: 'This Field is required',
  //     invalid_type_error: 'This Field is required',
  //   })
  // ),
  availabilityTime: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  employmentStatus: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  leaveOfAbsenceWithinSixMonths: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('This Field is required'),
  educationPlansWithinSixMonthsToYear: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('This Field is required'),
  noticePeriod: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  customerSupportExperience: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  ecommerceExperience: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  softwareTools: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one Tool.',
    }),
  agreedPayRate: z
    .boolean({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .refine(
      (value) => {
        if (value) {
          return true
        }
        return false
      },
      {
        message: 'This Field is required ',
      }
    ),
  mostCommonshiftAvailability: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  preferedWorkingHours: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .optional(),
})
// .refine(
//   (data) =>
//     data.applicationCodeAvaliable === 'No' && data.applicationCode === '',
//   {
//     message: 'This Field is Empty',
//     path: ['applicationCode'], // path of error
//   }
// )
// .refine(
//   (data) =>
//     data.referred === 'No' && data.referredEmployee?.firstName?.trim() === '',
//   {
//     message: 'This Field is Empty',
//     path: ['referredEmployee.firstName'], // path of error
//   }
// )
// .refine(
//   (data) =>
//     data.referred === 'No' && data.referredEmployee?.lastName?.trim() === '',
//   {
//     message: 'This Field is Empty',
//     path: ['referredEmployee.lastName'], // path of error
//   }
// )
// .refine(
//   (data) =>
//     data.referred === 'No' &&
//     data.referredEmployee?.relationship?.trim() === '',
//   {
//     message: 'This Field is Empty',
//     path: ['referredEmployee.relationship'], // path of error
//   }
// )

export const CandidateIntakeformStep2Schema = z.object({
  typingTestScore: z
    .any()
    .refine(
      (file) => {
        if (file?.length === 0) {
          return false
        }
        return true
      },
      { message: 'This Field is required' }
    )
    .refine(
      (file) => {
        if (file?.length > 0) {
          return file?.[0]?.size <= 1000000
        }
        return true
      },
      { message: 'Max file size is 1MB.' }
    )
    .refine(
      (file) => {
        if (file?.length !== 0) {
          return allowedFormats.includes(file?.[0]?.type)
        }
        return true
      },
      { message: 'Only PDF and DOC Files Allowed' }
    ),
  internetSpeedTestScore: z
    .string()
    .url({ message: 'Enter a valid URL' })
    .regex(/^https:\/\/www\.speedtest\.net\/result\/\d+$/, {
      message: 'This is not Speed Test URL',
    })
    .nonempty('Website URL is required'),
  generalQuestion1: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion2: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion3: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion4: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion5: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion6: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion7: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion8: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion9: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion10: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion11: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
})

export const CandidateIntakeformStep3Schema = z.object({
  customerServiceQuestion1: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less then 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion2: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less then 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion3: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less then 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion4: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less then 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion5: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less then 500 words')
    .nonempty('This Field is required'),
  validID: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),

  activelyCheckEmail: z
    .boolean({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .refine(
      (value) => {
        if (value) {
          return true
        }
        return false
      },
      {
        message: 'This Field is required ',
      }
    ),
  interestedInTraning: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
})

export const CandidateIntakeFormSchema = z.object({
  firstName: z.string().trim().nonempty('First name is required'),
  lastName: z.string().trim().nonempty('Last name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  phoneNumber: z
    .string()
    .trim()
    .min(10, 'PhoneNumber must contain at least 10 Digit(s)')
    .max(20, 'PhoneNumber must contain at least 30 Digit(s)')
    .regex(/^\d+$/, { message: 'Invalid Number' }),
  gender: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  agreementTo90DayRule: z
    .boolean({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .refine(
      (value) => {
        if (value) {
          return true
        }
        return false
      },
      {
        message: 'This Field is required ',
      }
    ),
  applicationCodeAvaliable: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  applicationCode: z
    .string()
    .refine((value) => {
      if (value) {
        if (value.trim().length > 0) {
          return true
        }
        return false
      }

      return true
    }, 'Enter your Application Code')
    .optional(),
  coverLetter: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  customSoftwareTool: z.string().trim().optional(),
  howDidYouHear: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  referred: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  referredEmployee: z
    .object({
      firstName: z.string().trim(),
      lastName: z.string().trim(),
      relationship: z.string().trim(),
    })
    .optional(),
  applyingFrom: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  availabilityTime: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  employmentStatus: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  leaveOfAbsenceWithinSixMonths: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('This Field is required'),
  educationPlansWithinSixMonthsToYear: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('This Field is required'),
  noticePeriod: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  customerSupportExperience: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  ecommerceExperience: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  softwareTools: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one Tool.',
    }),
  agreedPayRate: z
    .boolean({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .refine(
      (value) => {
        if (value) {
          return true
        }
        return false
      },
      {
        message: 'This Field is required ',
      }
    ),
  mostCommonshiftAvailability: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  preferedWorkingHours: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .optional(),

  internetSpeedTestScore: z
    .string()
    .url({ message: 'Enter a valid URL' })
    .regex(/^https:\/\/www\.speedtest\.net\/result\/\d+$/, {
      message: 'This is not Speed Test URL',
    })
    .nonempty('Website URL is required'),
  generalQuestion1: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion2: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion3: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion4: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion5: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion6: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion7: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion8: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion9: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion10: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  generalQuestion11: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  customerServiceQuestion1: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less than 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion2: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less than 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion3: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less than 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion4: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less than 500 words')
    .nonempty('This Field is required'),
  customerServiceQuestion5: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .min(500, 'Your Answer Should not be less than 500 words')
    .nonempty('This Field is required'),
  validID: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  activelyCheckEmail: z
    .boolean({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .refine(
      (value) => {
        if (value) {
          return true
        }
        return false
      },
      {
        message: 'This Field is required ',
      }
    ),
  interestedInTraning: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
})
