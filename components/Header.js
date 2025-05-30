import { Plus, Sparkles, Settings } from 'lucide-react';

export default function Header({ onAddClothes, onAIAssistant }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Closet</h1>
            <p className="text-gray-600 mt-1">Elevate your closet with AI</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddClothes}
              className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Clothes
            </button>
            
            <button
              onClick={onAIAssistant}
              className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Assistant
            </button>
            
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 