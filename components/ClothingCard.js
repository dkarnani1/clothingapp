import { Heart, MoreHorizontal, Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function ClothingCard({ item, onLike, onEdit, onDelete }) {
  const [isLiked, setIsLiked] = useState(item.liked || false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent triggering edit when clicking like
    setIsLiked(!isLiked);
    onLike?.(item.id, !isLiked);
    console.log("❤️ Item liked:", item.name);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent triggering edit when clicking menu
    setShowMenu(!showMenu);
    console.log("📱 Menu clicked for:", item.name);
  };

  const handleCardClick = () => {
    onEdit?.(item);
    console.log("✏️ Edit item:", item.name);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(item.id);
    setShowMenu(false);
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:border-green-300 group"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="aspect-square bg-gray-200 relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-sm">No Image</span>
          </div>
        )}
        
        {/* Hover overlay with edit icon */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0">
            <Edit3 className="w-5 h-5 text-green-600" />
          </div>
        </div>
        
        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            } shadow-md hover:shadow-lg transition-all transform hover:scale-110`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <div className="relative">
            <button
              onClick={handleMenuClick}
              className="p-2 rounded-full bg-white text-gray-600 shadow-md hover:shadow-lg transition-all transform hover:scale-110"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-10 transform transition-all duration-200 scale-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(item);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Edit Details
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-green-600 transition-colors">{item.name}</h3>
        <p className="text-gray-600 text-sm font-medium">{item.brand}</p>
        {item.price && (
          <p className="text-gray-900 font-semibold mt-2">${item.price}</p>
        )}
        
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded group-hover:bg-green-100 group-hover:text-green-700 transition-colors"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                +{item.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Edit hint text - appears on hover */}
      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
        <p className="text-xs text-green-600 font-semibold text-center bg-white shadow-md py-2 px-3 rounded-md border border-green-200">
          ✏️ Click to edit
        </p>
      </div>
    </div>
  );
} 