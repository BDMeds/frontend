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
  count: number;
};

type CartStoreActions = {
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;

  changeCount: (type: "i" | "d") => void;
  resetCount: () => void;
};

type CartStore = CartStoreProps & CartStoreActions;

const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      count: 0,

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
