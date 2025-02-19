import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <UserProfile path="/profile" routing="path" />
      </div>
    </div>
  );
}