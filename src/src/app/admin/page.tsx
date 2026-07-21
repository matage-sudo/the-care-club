import { CreateEventForm } from "../../components/admin/CreateEventForm";

export default function AdminDashboard() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Post New Event</h2>
        <CreateEventForm />
      </div>
    </main>
  );
}
