import { useState, useEffect } from "react";

export default function MedicalID() {
  const [medicalID, setMedicalID] = useState("");

  useEffect(() => {
    const savedID = localStorage.getItem("medicalID");
    if (savedID) setMedicalID(savedID);
  }, []);

  const saveMedicalID = () => {
    localStorage.setItem("medicalID", medicalID);
    alert("✅ Medical ID Saved!");
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-80">
      <h2 className="text-lg font-semibold">🏥 Medical ID</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Enter allergies, medications, blood type..."
        value={medicalID}
        onChange={(e) => setMedicalID(e.target.value)}
      ></textarea>
      <button onClick={saveMedicalID} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
        Save
      </button>
    </div>
  );
}
