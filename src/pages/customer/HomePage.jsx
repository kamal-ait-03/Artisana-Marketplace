import { Card, CardContent } from "@/components/common/Card"
import { Button } from "@/components/common/Button"
import { ArrowRight } from "lucide-react"

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <section className="relative rounded-t-arch rounded-b-2xl bg-zellige-900 text-white overflow-hidden p-12 md:p-24 text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-heading font-bold">
            Authentic Moroccan Craftsmanship
          </h1>
          <p className="text-lg text-zellige-100">
            Discover handmade treasures from the medinas of Marrakech to the mountains of the Atlas, shipped directly from artisans to your doorstep.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 hover:text-white">
              Meet the Artisans
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-heading font-bold text-slate-900 border-b-4 border-terracotta-500 pb-2 inline-block">
            New Arrivals
          </h2>
          <Button variant="ghost" className="hidden md:flex gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="group cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-64 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-zellige-100 flex items-center justify-center text-zellige-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Product
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="text-xs text-terracotta-500 font-medium">Textiles</div>
                <h3 className="font-heading font-semibold text-lg text-slate-800">Atlas Beni Ourain Rug</h3>
                <p className="text-sm text-slate-500">By Artisan Youssef</p>
                <div className="font-bold text-zellige-900 mt-2">$240.00</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
