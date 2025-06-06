import { Heart, MoreVertical } from 'lucide-react';

export default function OutfitCard({ name, images, category, lastWorn, onWearToday, onWillWear, onLike, onMore }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onLike}
            className="rounded-full p-1.5 hover:bg-gray-100"
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            onClick={onMore}
            className="rounded-full p-1.5 hover:bg-gray-100"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Images Grid */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`Outfit item ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Category and Last Worn */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">📁</span>
          <span>{category}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">🕒</span>
          <span>Last Worn {lastWorn}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onWearToday}
          className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          Wear Today
        </button>
        <button
          onClick={onWillWear}
          className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          Will Wear
        </button>
      </div>
    </div>
  );
} 