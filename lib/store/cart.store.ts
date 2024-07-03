import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Medicine } from "../types";

type Item = Medicine;

type CartStoreProps = {
  items: Item[];
  count: number;
};

type CartStoreActions = {
  addItem: (item: Item) => void;
  removeItem: (itemId: string | number) => void;

  changeCount: (type: "i" | "d") => void;
  resetCount: () => void;
};

type CartStore = CartStoreProps & CartStoreActions;

const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      count: 0,

      addItem: (item) => set((state) => ({ ...state, items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ ...state, items: state.items.filter((item) => item.id !== id) })),

      changeCount: (type) => {
        if (type === "d") {
          set((state) => ({ ...state, count: state.count > 0 ? state.count - 1 : state.count }));
        } else {
          set((state) => ({ ...state, count: state.count + 1 }));
        }
      },
      resetCount: () => set((state) => ({ ...state, count: 0 })),
    }),
    { name: "cart-items" }
  )
);

export default useCart;
