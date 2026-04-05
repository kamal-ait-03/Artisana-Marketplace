import { Card, CardContent } from "@/components/common/Card"
import { Button } from "@/components/common/Button"
import { Package, TrendingUp, Users } from "lucide-react"

export function VendorDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-slate-900">Artisan Dashboard</h1>
        <Button>+ Add New Product</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-zellige-100 text-zellige-900 rounded-full">
              <TrendingUp />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Monthly Revenue</p>
              <p className="text-2xl font-bold font-heading">$1,240.00</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-terracotta-100 text-terracotta-900 rounded-full">
              <Package />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Products</p>
              <p className="text-2xl font-bold font-heading">14</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-olive/20 text-olive rounded-full">
              <Users />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Customers</p>
              <p className="text-2xl font-bold font-heading">32</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-heading font-bold mb-4">Your Recent Products</h2>
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-medium">Product Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Atlas Beni Ourain Rug</td>
              <td className="p-4 text-slate-500">Textiles</td>
              <td className="p-4">$240.00</td>
              <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Active</span></td>
              <td className="p-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Leather Pouf (Tan)</td>
              <td className="p-4 text-slate-500">Furniture</td>
              <td className="p-4">$85.00</td>
              <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Active</span></td>
              <td className="p-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
