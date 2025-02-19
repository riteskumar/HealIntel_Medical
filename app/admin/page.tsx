import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-10">
      <header className="admin-header">
      
        

        <p className="text-16-semibold text-white"></p>
      </header>

      <main className="admin-main">
        <section className="mt-12 w-full space-y-4">
        <Link href="/">
          <button
           
            className="mb-8 text-green-400 hover:text-green-800 font-medium flex items-center justify-center transition-all duration-300"
          >
            <ArrowLeft className="mr-2" />
            Back to Home
          </button>
        </Link>
          <h1 className="header text-white">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
