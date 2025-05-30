import ClothingCard from './ClothingCard';

export default function ClothingGrid({ items, onLike, onEdit, onDelete }) {
  console.log("👔 Displaying clothing items:", items?.length || 0);

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <div className="text-6xl mb-4">👔</div>
        <h3 className="text-lg font-medium mb-2">No clothes found</h3>
        <p className="text-sm">Try adjusting your filters or add some clothes to your closet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <ClothingCard
          key={item.id}
          item={item}
          onLike={onLike}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
} 