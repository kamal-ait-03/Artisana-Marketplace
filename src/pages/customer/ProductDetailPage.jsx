import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/common/Button"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { MOCK_PRODUCTS } from "./ShopPage"

export function ProductDetailPage() {
  const { id } = useParams()
  const addItem = useCartStore(state => state.addItem)
  
  const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id))

  if (!product) {
    return <div className="p-24 text-center">Product not found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-zellige-500 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Viewer */}
        <div className={`h-96 md:h-[600px] ${product.image} rounded-t-arch rounded-b-2xl shadow-sm`} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-terracotta-500 font-medium mb-2">{product.category}</div>
            <h1 className="text-4xl font-heading font-bold text-slate-900 mb-2">{product.name}</h1>
            <p className="text-lg text-slate-600">Authentic hand-made product by artisan {product.artisan}.</p>
          </div>

          <div className="text-3xl font-bold text-zellige-900">
            ${product.price.toFixed(2)}
          </div>

          <div className="pt-6 border-t space-y-4">
            <p className="text-slate-600 leading-relaxed">
              This completely unique item was hand-crafted using traditional generational techniques. 
              Sourced directly from the artisan's workshop in the Medina. Perfect for bringing an authentic touch 
              of Moroccan culture to your modern home.
            </p>

            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>100% Authentic Materials</li>
              <li>Handcrafted in Morocco</li>
              <li>Supports Fair Trade</li>
            </ul>
          </div>

          <div className="pt-6 flex gap-4">
            <Button 
              size="lg" 
              className="flex-1 gap-2" 
              onClick={() => addItem(product)}
            >
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </Button>
            <Button variant="outline" size="lg">Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
