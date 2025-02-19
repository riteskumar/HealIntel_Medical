import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react"; // Import info icon
import { Doctors } from "@/constants";
import Image from "next/image";
const DoctorSelection = () => {
    return (
      <TooltipProvider>
        <div className="bg-gray-900 p-5 rounded-lg w-full max-w-md mx-auto">
          <p className="text-white mb-2">Select a doctor</p>
          <div className="bg-gray-800 rounded-md p-3">
            {Doctors.map((doctor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-md"
              >
                {/* Doctor Image & Name */}
                <div className="flex items-center gap-3">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="text-white">
                    {doctor.name}{" "}
                    <span className="text-green-300">{doctor.specialization}</span>
                  </p>
                </div>
  
                {/* Tooltip for Qualification */}
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-5 text-gray-400 hover:text-white cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm text-white">{doctor.specialization}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </TooltipProvider>
    );
  };
  
  export default DoctorSelection;