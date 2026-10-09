
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '@constants/student';

export type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
};
type CartState = {
    items: CartItem[];
    add: (item: Omit<CartItem, 'quantity'>) => void;
    remove: (id: string) => void;
    changeQty: (id: string, quantity: number) => void;
    totalQuantity: () => number;
    totalAmount: () => number;
};
export const useCartStore = create<CartState>()(
    persist((set, get) => ({
        items: [],
        add: (item) => set(s => {
            const found = s.items.find(x => x.id === item.id);
            return { items: found ? s.items.map(x => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x) : [...s.items, { ...item, quantity: 1 }] };
        }),
        remove: (id) => set(s => ({ items: s.items.filter(x => x.id !== id) })),
        changeQty: (id, quantity) => set(s => ({
            items: s.items.map(x => x.id === id ? { ...x, quantity } : x).filter(x => x.quantity > 0),
        })),
        totalQuantity: () => get().items.reduce((sum, x) => sum + x.quantity, 0),
        totalAmount: () => get().items.reduce((sum, x) => sum + x.price * x.quantity, 0),
    }), {
        name: `ktxgo-cart-${STUDENT.mssv}`,
        storage: createJSONStorage(() => AsyncStorage),
        partialize: s => ({ items: s.items }),
    })
);
