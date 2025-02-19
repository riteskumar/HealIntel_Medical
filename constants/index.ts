import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import exp from "constants";
export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Aadhaar Card",
  "Passport",
  "Ration Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    specialization: "Cardiologist",
    experience: "15 years",
    qualification: "MBBS, MD",
    name: "Rahul Arora",
  },
  {
    image: "/assets/images/dr-cameron.png",
    specialization: "General Physician",
    experience: "10 years",
    qualification: "MBBS, MD",
    name: "Shradha Khapra",
  },
  {
    image: "/assets/images/dr-livingston.png",
    specialization: "ENT Specialist",
    experience: "5 years",
    qualification: "MBBS, MS",
    name: "Vikas Batra",
  },
  {
    image: "/assets/images/dr-peter.png",
    specialization: "Dermatologist",
    experience: "8 years",
    qualification: "MBBS, MD",
    name: "Anuj Srivastava",

  },
  {
    image: "/assets/images/dr-powell.png",
    specialization: "Gynecologist",
    experience: "12 years",
    qualification: "MBBS, MD",
    name: "Raj Kalra",
  },
  {
    image: "/assets/images/dr-remirez.png",
    specialization: "Pediatrician",
    experience: "7 years",
    qualification: "MBBS, MD",
    name: "Sumit Mishra",
  },
  {
    image: "/assets/images/dr-lee.png",
    specialization: "Orthopedic",
    experience: "9 years",
    qualification: "MBBS, MS",
    name: "Aman Sharma",
  },
  {
    image: "/assets/images/dr-cruz.png",
    specialization: "Psychiatrist",
    experience: "6 years",
    qualification: "MBBS, MD",
    name: "Riti Kumari",
  },
  {
    image: "/assets/images/dr-sharma.png",
    specialization: "Neurologist",
    experience: "11 years",
    qualification: "MBBS, MD",
    name: "Hardik Sharma",
  },
];



export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
