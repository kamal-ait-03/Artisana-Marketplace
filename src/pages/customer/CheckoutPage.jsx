import { useState } from "react"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/common/Button"
import { Link, useNavigate } from "react-router-dom"

export function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCheckout = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      clearCart()
      alert("Order placed successfully! In a real app this would route securely through Stripe.")
      navigate("/")
      setLoading(false)
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="p-24 text-center">
        Cart is empty. <Link to="/shop" className="text-zellige-500 underline">Return to shop</Link>.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-left">
      <h1 className="text-4xl font-heading font-bold text-slate-900 mb-8">Secure Checkout</h1>
      
      <form onSubmit={handleCheckout} className="space-y-8">
        <section className="bg-white p-6 border rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input required type="text" className="w-full border rounded-md p-2 focus:ring-zellige-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input required type="text" className="w-full border rounded-md p-2 focus:ring-zellige-500 outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input required type="text" className="w-full border rounded-md p-2 focus:ring-zellige-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input required type="text" className="w-full border rounded-md p-2 focus:ring-zellige-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input required type="text" className="w-full border rounded-md p-2 focus:ring-zellige-500 outline-none" />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 border rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payment Mockup</h2>
          <div className="p-4 bg-slate-50 border rounded text-slate-500 text-sm italic">
            Stripe Payment Element would be injected here.
          </div>
        </section>

        <Button disabled={loading} type="submit" size="lg" className="w-full">
          {loading ? "Processing..." : "Complete Order"}
        </Button>
      </form>
    </div>
  )
}
