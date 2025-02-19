'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { FaUser, FaCalendar, FaSpinner, FaSearch } from 'react-icons/fa';

interface Patient {
  $id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  birthDate: string;
  primaryPhysician: string;
}

interface Appointment {
  $id: string;
  schedule: string;
  primaryPhysician: string;
  reason: string;
  note: string;
  patient: string;
}

export default function PatientDashboard() {
  const { user } = useUser();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (user?.emailAddresses[0].emailAddress) {
        try {
          const patientResponse = await fetch(
            `/api/patient?email=${user.emailAddresses[0].emailAddress}`
          );
          const patientData = await patientResponse.json();
          setPatient(patientData);
          console.log('Patient Data:', patientData);

          if (patientData.$id) {
            const appointmentsResponse = await fetch(
              `/api/appointments?patientId=${patientData.$id}`
            );
            const appointmentsData = await appointmentsResponse.json();
            console.log('Appointments Data:', appointmentsData);
            setAppointments(appointmentsData);
            setFilteredAppointments(appointmentsData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    const filtered = appointments.filter((appointment) =>
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.primaryPhysician.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaUser className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Patient Record Found</h2>
          <p className="text-gray-600">Please contact your healthcare provider to set up your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900">Welcome, {patient.name}</h1> */}
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            {/* <p className="text-blue-800 font-medium">Patient ID: {patient.$id}</p> */}
          </div>
        </div>

        {/* Patient Information Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <FaUser className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 ml-4">Personal Information</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Full Name</label>
                <p className="mt-1 text-gray-900">{patient.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Email Address</label>
                <p className="mt-1 text-gray-900">{patient.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Phone Number</label>
                <p className="mt-1 text-gray-900">{patient.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Gender</label>
                <p className="mt-1 text-gray-900 capitalize">{patient.gender}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Address</label>
                <p className="mt-1 text-gray-900">{patient.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Date of Birth</label>
                <p className="mt-1 text-gray-900">
    {patient.birthDate
      ? new Intl.DateTimeFormat("en-GB").format(new Date(patient.birthDate))
      : "N/A"}
  </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Primary Physician</label>
                <p className="mt-1 text-gray-900">{patient.primaryPhysician}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <FaCalendar className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Appointment History</h2>
            </div>
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Date & Time", "Doctor", "Reason", "Notes", "Status"].map((header) => (
                    <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.$id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(appointment.schedule).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      Dr. {appointment.primaryPhysician}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {appointment.reason}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {appointment.note}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${new Date(appointment.schedule) > new Date() 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'}
                        transition-colors duration-200`}>
                        {new Date(appointment.schedule) > new Date() ? 'Upcoming' : 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <FaCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No appointments found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}