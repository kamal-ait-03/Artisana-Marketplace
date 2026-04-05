import { Outlet, Link } from "react-router-dom"
import { Search, ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/common/Button"
import { useCartStore } from "@/store/useCartStore"

export function RootLayout() {
  const items = useCartStore(state => state.items)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="h-2 w-full bg-zellige-500" />
      
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold text-zellige-900">SouqMina</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/shop" className="transition-colors hover:text-zellige-500">Shop Catalog</Link>
              <Link to="/blog" className="transition-colors hover:text-zellige-500">Journal</Link>
              <Link to="/vendor" className="transition-colors hover:text-zellige-500 text-terracotta-500 font-bold">Artisan Portal</Link>
              <Link to="/admin" className="transition-colors hover:text-zellige-500 text-slate-400">Admin</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta-500 text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="primary" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        <div className="absolute inset-0 z-[-1] border-red-500 pointer-events-none" />
        <Outlet />
      </main>

      <footer className="border-t bg-zellige-900 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading text-xl mb-4">SouqMina</h3>
              <p className="text-zellige-100 text-sm">Empowering Moroccan Artisans, preserving heritage.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-zellige-100">
                <li><Link to="/shop">All Products</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
