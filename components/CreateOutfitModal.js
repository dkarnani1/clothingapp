import { useState } from 'react';
import { X, Search } from 'lucide-react';

export default function CreateOutfitModal({ isOpen, onClose, onSubmit }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('top');

  if (!isOpen) return null;

  // Mock data for demonstration
  const clothingItems = [
    {
      id: 1,
      name: 'Air Force One',
      brand: 'Nike',
      type: 'Shoes',
      image: '/path/to/image1.jpg',
      color: ['white']
    },
    {
      id: 2,
      name: 'Onyx V5',
      brand: 'Gymshark',
      type: 'Tank',
      image: '/path/to/image2.jpg',
      color: ['black', 'red']
    },
    // Add more items as needed
  ];

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Create Outfit</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Side - Selected Items */}
          <div>
            <div className="mb-4">
              <h3 className="mb-2 font-medium">Top (3)</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedItems
                  .map(id => clothingItems.find(item => item.id === id))
                  .filter(item => item?.type === 'Top')
                  .map(item => (
                    <div key={item.id} className="relative aspect-square rounded-lg border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-600">Brand</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Bottom (0)</h3>
              <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
                <p className="text-center text-gray-500">
                  Drop and drop, choose form your clothing items
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Item Selection */}
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type Outfit Name"
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <select className="w-full rounded-lg border px-4 py-2">
                <option value="">Choose Category</option>
                <option value="work">Work</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border pl-10 pr-4 py-2"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-2">
              {['All Items (3)', 'Shoes (1)', 'Tank (1)', 'Jewelery (1)'].map((filter, index) => (
                <button
                  key={index}
                  className={`rounded-full px-4 py-1 ${
                    index === 0 ? 'bg-green-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {clothingItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg border p-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {item.color.map((color, index) => (
                      <div
                        key={index}
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border px-4 py-2 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 