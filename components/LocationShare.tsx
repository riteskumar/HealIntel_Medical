export default function LocationShare() {
    const shareLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          alert(`📍 Location: ${latitude}, ${longitude}`);
        });
      } else {
        alert("Geolocation not supported!");
      }
    };
  
    return (
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        onClick={shareLocation}
      >
        📍 Share Location
      </button>
    );
  }
  