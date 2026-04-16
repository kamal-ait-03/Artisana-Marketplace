import { useCurrency } from '../context/CurrencyContext';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts, categories as initialCategories, artisans } from '../data/mockData';
import { Filter, X, SlidersHorizontal, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const CatalogPage = () => {
  const { formatPrice, currency } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filter states derived from URL
  const selectedCategories = searchParams.getAll('category');
  const priceRange = Number(searchParams.get('price')) || 5000;
  const selectedCities = searchParams.getAll('city');
  const selectedArtisans = searchParams.getAll('artisan');
  const sortBy = searchParams.get('sort') || 'newest';
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 8;

  const cities = ['Safi', 'Marrakech', 'Fez', 'Meknes', 'Rabat', 'Casablanca'];

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.keys(updates).forEach(key => {
      const value = updates[key];
      if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(v => newParams.append(key, v));
      } else {
        newParams.set(key, value);
      }
    });

    if (!updates.page && newParams.has('page')) {
      newParams.set('page', 1);
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (categoryId) => {
    const newCats = selectedCategories.includes(categoryId) 
      ? selectedCategories.filter(c => c !== categoryId) 
      : [...selectedCategories, categoryId];
    updateParams({ category: newCats });
  };

  const handleCityChange = (city) => {
    const newCities = selectedCities.includes(city) 
      ? selectedCities.filter(c => c !== city) 
      : [...selectedCities, city];
    updateParams({ city: newCities });
  };

  const handleArtisanChange = (artisanId) => {
    const newArts = selectedArtisans.includes(artisanId) 
      ? selectedArtisans.filter(a => a !== artisanId) 
      : [...selectedArtisans, artisanId];
    updateParams({ artisan: newArts });
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchCity = selectedCities.length === 0 || selectedCities.includes(product.artisan.city);
      const matchArtisan = selectedArtisans.length === 0 || selectedArtisans.includes(product.artisan.id);
      const matchPrice = product.price <= priceRange;
      return matchCategory && matchCity && matchArtisan && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return b.reviews - a.reviews; // Fixed reviewCount to reviews based on mockData
      if (sortBy === 'newest') return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
      return 0;
    });
  }, [products, selectedCategories, selectedCities, selectedArtisans, priceRange, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold flex items-center gap-2">
          <Filter size={20} className="text-[var(--color-primary)]" /> Filters
        </h3>
        <button 
          onClick={resetFilters}
          className="text-sm font-body text-gray-500 hover:text-[var(--color-primary)] underline"
        >
          Reset
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-accent text-sm font-bold text-gray-800 tracking-wider mb-4 uppercase">Categories</h4>
        <div className="space-y-3">
          {initialCategories.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleCategoryChange(cat.id)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                selectedCategories.includes(cat.id) 
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                  : 'border-gray-300 group-hover:border-[var(--color-primary)]'
              }`}>
                {selectedCategories.includes(cat.id) && <Check size={12} strokeWidth={4} />}
              </div>
              <span className="font-body text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-accent text-sm font-bold text-gray-800 tracking-wider mb-4 uppercase">Max Price</h4>
        <input 
          type="range" 
          min="0" 
          max="5000" 
          step="50"
          value={priceRange} 
          onChange={(e) => updateParams({ price: e.target.value })}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
          <span>{formatPrice(0)}</span>
          <span className="text-[var(--color-primary)] font-bold">{formatPrice(priceRange)}</span>
        </div>
      </div>

      {/* Cities */}
      <div>
        <h4 className="font-accent text-sm font-bold text-gray-800 tracking-wider mb-4 uppercase">Cities (Artisans)</h4>
        <div className="space-y-3">
          {cities.map(city => (
            <label key={city} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleCityChange(city)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                selectedCities.includes(city) 
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                  : 'border-gray-300 group-hover:border-[var(--color-primary)]'
              }`}>
                {selectedCities.includes(city) && <Check size={12} strokeWidth={4} />}
              </div>
              <span className="font-body text-gray-700">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Artisans */}
      <div>
        <h4 className="font-accent text-sm font-bold text-gray-800 tracking-wider mb-4 uppercase">Filter by Artisan</h4>
        <div className="space-y-3">
          {artisans.map(artisan => (
            <label key={artisan.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleArtisanChange(artisan.id)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                selectedArtisans.includes(artisan.id) 
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                  : 'border-gray-300 group-hover:border-[var(--color-primary)]'
              }`}>
                {selectedArtisans.includes(artisan.id) && <Check size={12} strokeWidth={4} />}
              </div>
              <span className="font-body text-gray-700">{artisan.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-24 pb-20">
      
      {/* Mobile Filter Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-100 sticky top-16 z-30 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 font-medium text-[var(--color-text)]"
        >
          <SlidersHorizontal size={18} /> Filter
        </button>
        <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
      </div>

      {/* Mobile Filter Drawer */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden ${isMobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-xl transition-transform transform ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl font-bold">Filters</h2>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>
          <FilterSidebar />
          <button 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="w-full mt-8 bg-[var(--color-primary)] text-white py-3 rounded-md font-medium"
          >
            Show ({filteredProducts.length})
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">Our Catalog</h1>
          <p className="max-w-2xl mx-auto text-gray-600">Discover the entire collection of Moroccan craftsmanship, carefully selected to offer you the best quality.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-1/4 flex-shrink-0 sticky top-28 self-start bg-white p-6 rounded-xl shadow-sm border border-orange-50">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            
            {/* Top Bar */}
            <div className="hidden lg:flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-orange-50 mb-8">
              <span className="text-gray-600 font-medium">{filteredProducts.length} products found</span>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-500">Sort by:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                  className="border border-gray-200 rounded-md py-1.5 px-3 bg-[var(--color-bg)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Ascending Price</option>
                  <option value="price-desc">Descending Price</option>
                  <option value="popular">Popularity</option>
                </select>
              </div>
            </div>

            {/* Mobile Sort */}
            <div className="lg:hidden mb-6 flex justify-end">
              <select 
                  value={sortBy}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                  className="w-full border border-gray-200 rounded-md py-2 px-3 bg-white shadow-sm focus:outline-none"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="price-asc">Sort: Ascending Price</option>
                  <option value="price-desc">Sort: Descending Price</option>
                  <option value="popular">Sort: Popularity</option>
              </select>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-warm p-4 h-[350px] flex flex-col">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 w-1/2 rounded mb-6"></div>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
                      <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center shadow-sm">
                <div className="text-5xl mb-4">🐪</div>
                <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try modifying your filters to see more results.</p>
                <button 
                  onClick={resetFilters}
                  className="bg-[var(--color-primary)] text-white px-6 py-2 rounded font-medium"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  onClick={() => updateParams({ page: Math.max(1, currentPage - 1) })}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => updateParams({ page: i + 1 })}
                    className={`w-10 h-10 flex items-center justify-center rounded border font-medium ${
                      currentPage === i + 1 
                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => updateParams({ page: Math.min(totalPages, currentPage + 1) })}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
