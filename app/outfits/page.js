'use client';

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import OutfitCard from '@/components/OutfitCard';
import CreateOutfitModal from '@/components/CreateOutfitModal';

export default function OutfitsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Outfits');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data for demonstration
  const outfits = [
    {
      id: 1,
      name: 'Outfit Name',
      category: 'Work',
      lastWorn: '3 Weeks ago',
      images: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
    },
    // Add more outfits as needed
  ];

  const filters = [
    { name: 'All Outfits', count: 1 },
    { name: 'Casual', count: 1 },
  ];

  const handleCreateOutfit = (outfitData) => {
    // Handle outfit creation
    console.log('Creating outfit:', outfitData);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Closet</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            <Plus className="h-5 w-5" />
            Add Clothes
          </button>
          <button className="rounded-lg border border-green-500 px-4 py-2 text-green-500">
            AI Assistant
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">⚙️</button>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-8 flex items-center gap-8 rounded-lg bg-gray-50 p-4">
        <button className="flex items-center gap-2">
          <span>👕</span>
          Clothes
        </button>
        <button className="flex items-center gap-2">
          <span>👔</span>
          Outfits
        </button>
        <button className="flex items-center gap-2">
          <span>📊</span>
          Analytics
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border pl-10 pr-4 py-2"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`rounded-full px-4 py-1 ${
                activeFilter === filter.name
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Outfits Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            {...outfit}
            onWearToday={() => console.log('Wear today:', outfit.id)}
            onWillWear={() => console.log('Will wear:', outfit.id)}
            onLike={() => console.log('Like:', outfit.id)}
            onMore={() => console.log('More:', outfit.id)}
          />
        ))}
      </div>

      {/* Create Outfit Modal */}
      <CreateOutfitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateOutfit}
      />
    </div>
  );
} 