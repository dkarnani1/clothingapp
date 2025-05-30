'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import FilterSidebar from '@/components/FilterSidebar';
import SearchBar from '@/components/SearchBar';
import ClothingGrid from '@/components/ClothingGrid';
import AddClothesForm from '@/components/AddClothesForm';

export default function Home() {
  const [activeTab, setActiveTab] = useState('clothes');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [clothes, setClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  
  const [filters, setFilters] = useState({
    keywords: [],
    tags: [],
    priceRange: [0, 100],
    colors: [],
    brands: [],
    sizes: []
  });

  // Fetch clothes from the database
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await fetch('/api/clothes');
        if (!response.ok) {
          throw new Error('Failed to fetch clothes');
        }
        const data = await response.json();
        setClothes(data);
        console.log("👕 Fetched clothes:", data.length);
      } catch (error) {
        console.error('❌ Error fetching clothes:', error);
        alert('Failed to load clothes. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClothes();
  }, []);

  // Filter clothes based on search and filters
  const filteredClothes = clothes.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = filters.tags.length === 0 || 
      filters.tags.some(tag => item.tags.includes(tag));
    
    const matchesColors = filters.colors.length === 0 || 
      filters.colors.includes(item.color);
    
    const matchesBrands = filters.brands.length === 0 || 
      filters.brands.includes(item.brand);
    
    const matchesSizes = filters.sizes.length === 0 || 
      filters.sizes.includes(item.size);
    
    const matchesPrice = !item.price || (
      item.price >= filters.priceRange[0] && 
      item.price <= filters.priceRange[1]
    );

    return matchesSearch && matchesTags && matchesColors && 
           matchesBrands && matchesSizes && matchesPrice;
  });

  const handleAddClothes = () => {
    console.log("🔥 Add clothes clicked");
    setEditingItem(null); // Clear any editing item
    setShowAddForm(true);
    setTimeout(() => setIsSliding(true), 50);
  };

  const handleCloseForm = () => {
    setIsSliding(false);
    setTimeout(() => {
      setShowAddForm(false);
      setEditingItem(null); // Clear editing item when closing
    }, 300);
  };

  const handleAIAssistant = () => {
    console.log("🤖 AI Assistant clicked");
    alert("AI Assistant feature coming soon! 🚀");
  };

  const handleAddItem = (newItem, isEditing = false) => {
    if (isEditing) {
      // Update existing item in the list
      setClothes(prev => prev.map(item => 
        item.id === newItem.id ? newItem : item
      ));
      console.log("✅ Item updated in catalog:", newItem.name);
    } else {
      // Add new item to the beginning of the list
      setClothes(prev => [newItem, ...prev]);
      console.log("✅ New item added to catalog:", newItem.name);
    }
  };

  const handleLike = async (itemId, liked) => {
    try {
      const response = await fetch(`/api/clothes/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }

      const updatedItem = await response.json();
      setClothes(prev => prev.map(item => 
        item.id === itemId ? updatedItem : item
      ));
    } catch (error) {
      console.error('❌ Error updating like status:', error);
      alert('Failed to update like status. Please try again.');
    }
  };

  const handleEdit = (item) => {
    console.log("✏️ Edit item:", item.name);
    setEditingItem(item);
    setShowAddForm(true);
    setTimeout(() => setIsSliding(true), 50);
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/api/clothes/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setClothes(prev => prev.filter(item => item.id !== itemId));
      console.log("🗑️ Item deleted");
    } catch (error) {
      console.error('❌ Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddClothes={handleAddClothes} onAIAssistant={handleAIAssistant} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          {activeTab === 'clothes' && (
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <ClothingGrid 
                items={filteredClothes}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          )}
          
          {activeTab === 'outfits' && (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-4">👗</div>
              <h3 className="text-lg font-medium mb-2">Outfits coming soon!</h3>
              <p className="text-sm">Create amazing outfit combinations</p>
            </div>
          )}
        </main>
      </div>

      <AddClothesForm 
        isOpen={showAddForm}
        onClose={handleCloseForm}
        onSubmit={handleAddItem}
        isSliding={isSliding}
        editItem={editingItem}
      />
    </div>
  );
}
