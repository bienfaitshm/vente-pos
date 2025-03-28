
import { create  } from "zustand";

interface Item {
    id: string,
    name: string,
    unitPrice: number,
}

interface ShopingBagStore {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (itemId: string) => void;
    clearBag: () => void;
    isIntheBag: (itemId: string) => boolean;

}

/**
 * A Zustand store for managing a shopping bag.
 */
export const useShopingBagStore = create<ShopingBagStore>((set, get) => ({
    /**
     * The list of items currently in the shopping bag.
     */
    items: [],

    /**
     * Adds an item to the shopping bag.
     * @param item - The item to add to the shopping bag.
     */
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),

    /**
     * Removes an item from the shopping bag by its ID.
     * @param itemId - The ID of the item to remove.
     */
    removeItem: (itemId) => set((state) => ({ items: state.items.filter(item => item.id !== itemId) })),

    /**
     * Clears all items from the shopping bag.
     */
    clearBag: () => set({ items: [] }),

    /**
     * Checks if an item is in the shopping bag by its ID.
     * @param itemId - The ID of the item to check.
     * @returns `true` if the item is in the shopping bag, otherwise `false`.
     */
    isIntheBag(itemId) {
        return !!get().items.find(item => item.id === itemId);
    }
}));