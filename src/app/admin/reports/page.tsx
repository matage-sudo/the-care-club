export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Donation Summary", "Volunteer Hours", "Membership Growth"].map((report) => (
          <div key={report} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg mb-2">{report}</h3>
            <button className="text-sm text-blue-600 underline">Download PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
}
