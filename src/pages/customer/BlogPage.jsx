import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/common/Card"

const MOCK_POSTS = [
  {
    id: "history-of-zellige",
    title: "The Ancient Art of Zellige: Morocco's Mosaic Masterpiece",
    excerpt: "Discover the intricate geometry and spiritual meaning behind traditional Moroccan tilework that has adorned palaces for centuries.",
    date: "April 2, 2026",
    category: "Culture",
    imageUrl: "bg-blue-100",
  },
  {
    id: "beni-ourain-rugs",
    title: "How to Style Authentic Beni Ourain Rugs in Modern Homes",
    excerpt: "Learn how the iconic black-and-white geometric patterns from the Atlas Mountains can transform minimalist contemporary spaces.",
    date: "March 28, 2026",
    category: "Interior Design",
    imageUrl: "bg-slate-200",
  },
  {
    id: "pottery-from-safi",
    title: "The Artisans of Safi: A Legacy in Clay",
    excerpt: "Journey to the coastal city of Safi, where generation after generation of master potters shape the iconic green and yellow ceramics.",
    date: "March 15, 2026",
    category: "Craftsmanship",
    imageUrl: "bg-green-100",
  }
]

export function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Le Journal: Moroccan Heritage</h1>
        <p className="text-lg text-slate-600">
          Immerse yourself in the stories behind the crafts. We chronicle the history, techniques, and lives of the master artisans keeping Moroccan traditions alive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_POSTS.map(post => (
          <Link to={`/blog/${post.id}`} key={post.id} className="group">
            <article className="h-full flex flex-col bg-white border border-slate-100 rounded-t-arch rounded-b-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className={`h-56 ${post.imageUrl} relative overflow-hidden`}>
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-semibold rounded-full text-zellige-900">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <time className="text-xs text-slate-400 mb-2">{post.date}</time>
                <h2 className="text-xl font-heading font-bold mb-3 group-hover:text-terracotta-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <span className="text-sm font-semibold text-zellige-500 uppercase tracking-wide">
                  Read Article →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
