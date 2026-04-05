import { Card, CardContent } from "@/components/common/Card"

export function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Admin Control Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-slate-900 text-white border-0">
          <CardContent className="p-6">
            <p className="text-slate-400 font-medium">Total Platform Volume</p>
            <p className="text-4xl font-heading font-bold">$12,450.00</p>
          </CardContent>
        </Card>
        <Card className="bg-terracotta-500 text-white border-0">
          <CardContent className="p-6">
            <p className="text-orange-200 font-medium">Artisans Pending Approval</p>
            <p className="text-4xl font-heading font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Artisan Applications</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center p-4 bg-white border rounded">
          <div>
            <p className="font-bold">Youssef B.</p>
            <p className="text-sm text-slate-500">Specialty: Carpentry</p>
          </div>
          <div className="space-x-2">
            <button className="text-sm px-4 py-2 bg-green-500 text-white rounded">Approve</button>
            <button className="text-sm px-4 py-2 bg-red-50 text-red-500 rounded">Reject</button>
          </div>
        </li>
      </ul>
    </div>
  )
}
