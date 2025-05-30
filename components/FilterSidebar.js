import { X } from 'lucide-react';
import { useState } from 'react';

export default function FilterSidebar({ filters, setFilters }) {
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Handle keyword removal
  const removeKeyword = (keyword) => {
    setFilters(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  // Handle tag toggle
  const toggleTag = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // Handle brand toggle
  const toggleBrand = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  // Handle size toggle
  const toggleSize = (size) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  // Handle color selection
  const toggleColor = (color) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const colorOptions = [
    { name: 'white', value: '#ffffff' },
    { name: 'gray', value: '#9ca3af' },
    { name: 'black', value: '#000000' },
    { name: 'red', value: '#ef4444' },
    { name: 'blue', value: '#3b82f6' },
    { name: 'green', value: '#10b981' },
    { name: 'yellow', value: '#f59e0b' },
    { name: 'pink', value: '#ec4899' },
  ];

  const tagOptions = ['Modern', 'Spring', 'Fall', 'Summer', 'Winter', 'Casual', 'Formal'];
  const brandOptions = ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Gap'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="w-80 bg-white p-6 border-r min-h-screen">
      {/* Keywords Section */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {filters.keywords?.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
            >
              {keyword}
              <button
                onClick={() => removeKeyword(keyword)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
        <div className="space-y-2">
          {tagOptions.map((tag) => (
            <label key={tag} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.tags?.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Price</h3>
        <div className="px-2">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => {
              const newMax = parseInt(e.target.value);
              setPriceRange([priceRange[0], newMax]);
              setFilters(prev => ({ ...prev, priceRange: [priceRange[0], newMax] }));
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Color Section */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-8 h-8 rounded-full border-2 ${
                filters.colors?.includes(color.name)
                  ? 'border-green-500 ring-2 ring-green-200'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
        <div className="space-y-2">
          {brandOptions.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Section */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Size</h3>
        <div className="space-y-2">
          {sizeOptions.map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.sizes?.includes(size)}
                onChange={() => toggleSize(size)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 