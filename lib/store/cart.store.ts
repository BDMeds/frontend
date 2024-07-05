import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Medicine } from "../types";
import { toastError, toastSuccess } from "../utils/toast";

type Item = {
  item: Medicine;
  qty: number;
};

type CartStoreProps = {
  items: Item[];
};

type CartStoreActions = {
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;

  resetCart: () => void;
};

type CartStore = CartStoreProps & CartStoreActions;

const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exist = state.items.find((i) => i.item._id === item.item._id);
          if (exist) {
            toastError("Item has already been added.");
            return state;
          }

          toastSuccess("Item added", { id: "item-added" });

          return { ...state, items: [...state.items, item] };
        }),

      removeItem: (id) => set((state) => ({ ...state, items: state.items.filter((item) => item.item._id !== id) })),

      resetCart: () =>
        set({
          items: [],
        }),
    }),
    { name: "cart-items" }
  )
);

export default useCart;
