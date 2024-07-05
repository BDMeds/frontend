const CartItemSkeleton = () => {
  return (
    <>
      <div className="flex gap-3">
        <div className="size-20 relative overflow-hidden border animate-skeleton rounded-lg"></div>
        <div className="w-32 h-5 rounded-lg animate-skeleton"></div>
      </div>

      <div className="space-y-1 flex flex-col items-end">
        <div className="w-20 h-5 rounded-lg animate-skeleton"></div>
        <div className="w-16 h-4 rounded-lg animate-skeleton"></div>
      </div>
    </>
  );
};

export default CartItemSkeleton;
