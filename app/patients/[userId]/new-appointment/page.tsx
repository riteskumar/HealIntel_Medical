import Image from "next/image";


import { getPatient } from "../../../../lib/actions/patient.actions";
import { AppointmentForm } from "../../../../components/forms/AppointmentForm";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="mt-4 sub-container max-w-[860px] flex-1 justify-between">
          {/* <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-12 p-30 w-fit"
          /> */}

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2025 HealIntel</p>
        </div>
      </section>

      <Image
        src="/assets/images/doctor-clinic.webp"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[265px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
