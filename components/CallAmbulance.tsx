export default function CallAmbulance() {
    return (
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        onClick={() => window.location.href = "tel:108"}
      >
        🚑 Call Ambulance (108)
      </button>
    );
  }
  