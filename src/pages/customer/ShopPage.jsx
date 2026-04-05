import { Card, CardContent } from "@/components/common/Card"
import { Link } from "react-router-dom"

export const MOCK_PRODUCTS = [
  { id: 1, name: "Atlas Beni Ourain Rug", price: 240, category: "Textiles", artisan: "Youssef", image: "bg-slate-200" },
  { id: 2, name: "Hand-painted Safi Bowl", price: 45, category: "Pottery", artisan: "Fatima", image: "bg-stone-200" },
  { id: 3, name: "Leather Pouf (Tan)", price: 85, category: "Furniture", artisan: "Hassan", image: "bg-amber-100" },
  { id: 4, name: "Zellige Mosaic Table", price: 320, category: "Decor", artisan: "Rachid", image: "bg-blue-100" },
  { id: 5, name: "Traditional Tea Glasses", price: 35, category: "Glassware", artisan: "Khadija", image: "bg-teal-100" },
  { id: 6, name: "Woven Palm Basket", price: 28, category: "Accessories", artisan: "Amina", image: "bg-orange-100" },
];

export function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-slate-900 mb-8">Artisan Catalog</h1>
      
      <div className="flex gap-8 items-start">
        {/* Filters Sidebar */}
        <aside className="w-64 hidden md:block border-r pr-8">
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="hover:text-zellige-500 cursor-pointer font-medium text-zellige-500">All Products</li>
            <li className="hover:text-zellige-500 cursor-pointer">Textiles & Rugs</li>
            <li className="hover:text-zellige-500 cursor-pointer">Pottery & Ceramics</li>
            <li className="hover:text-zellige-500 cursor-pointer">Leather Goods</li>
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card className="group cursor-pointer hover:shadow-md transition-shadow h-full">
                <div className={`h-64 ${product.image} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-zellige-100 flex items-center justify-center text-zellige-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="text-xs text-terracotta-500 font-medium">{product.category}</div>
                  <h3 className="font-heading font-semibold text-lg text-slate-800">{product.name}</h3>
                  <p className="text-sm text-slate-500">By {product.artisan}</p>
                  <div className="font-bold text-zellige-900 mt-2">${product.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
