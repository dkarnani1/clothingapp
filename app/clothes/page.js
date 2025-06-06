import Layout from '@/components/Layout';
import { Search } from 'lucide-react';

export default function ClothesPage() {
  return (
    <Layout>
      <div className="flex gap-6">
        {/* Filters Section */}
        <div className="w-64 flex-shrink-0">
          {/* Keywords */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">Keywords</h3>
            <div className="mb-2 flex flex-wrap gap-1">
              <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
                Spring
                <span className="text-gray-500">×</span>
              </button>
              <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
                Smart
                <span className="text-gray-500">×</span>
              </button>
              <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
                Modern
                <span className="text-gray-500">×</span>
              </button>
              <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
                Casual
                <span className="text-gray-500">×</span>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">Tags</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" checked />
                <span className="text-sm">Modern</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" checked />
                <span className="text-sm">Spring</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm">Fall</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" checked />
                <span className="text-sm">Casual</span>
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">Price</h3>
            <div className="px-1">
              <input
                type="range"
                min="0"
                max="100"
                className="h-1 w-full appearance-none rounded-full bg-gray-200"
              />
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-gray-500">$0</span>
                <span className="text-xs text-gray-500">$100</span>
              </div>
            </div>
          </div>

          {/* Color */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {['white', 'gray', 'black', 'red', 'blue', 'green', 'yellow', 'pink'].map((color) => (
                <button
                  key={color}
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">Brand</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" checked />
                <span className="text-sm">H&M</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" checked />
                <span className="text-sm">Gymshark</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" checked />
                <span className="text-sm">Nike</span>
              </label>
            </div>
          </div>

          {/* Size Sections */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-medium">Garment Size</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" checked />
                  <span className="text-sm">S</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" checked />
                  <span className="text-sm">M</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" checked />
                  <span className="text-sm">L</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Accessory Size</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" checked />
                  <span className="text-sm">16</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Shoe Size</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" checked />
                  <span className="text-sm">10</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" checked />
                  <span className="text-sm">11</span>
                </label>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-500">
            Filter
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filters */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-sm"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500">
                All Items (3)
              </button>
              <button className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                Shoes (1)
              </button>
              <button className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                Tank (1)
              </button>
              <button className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                Jewelery (1)
              </button>
            </div>
          </div>

          {/* Clothes Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Add your clothes cards here */}
          </div>
        </div>
      </div>
    </Layout>
  );
} 