import { Link } from "react-router-dom"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/common/Button"
import { Trash2, ShoppingBag } from "lucide-react"

export function CartPage() {
  const { items, removeItem, clearCart } = useCartStore()

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-6">
        <ShoppingBag className="w-16 h-16 mx-auto text-slate-300" />
        <h1 className="text-3xl font-heading font-bold text-slate-900">Your Cart is Empty</h1>
        <p className="text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button size="lg" className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-6 border rounded-lg p-4 bg-white shadow-sm">
              <div className={`w-24 h-24 rounded-md ${item.image}`}></div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="font-bold text-zellige-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-slate-500">By {item.artisan}</p>
                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>
                <div className="flex justify-between items-end">
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2" onClick={() => removeItem(item.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-96 bg-white border rounded-xl p-6 shadow-sm h-fit space-y-6">
          <h2 className="text-xl font-bold font-heading">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-slate-500">Shipping (Worldwide)</span>
              <span className="font-semibold">$15.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-terracotta-500">${(subtotal + 15).toFixed(2)}</span>
            </div>
          </div>
          
          <Link to="/checkout" className="block">
            <Button size="lg" className="w-full bg-terracotta-500 hover:bg-terracotta-900">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
