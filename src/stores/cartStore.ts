
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
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    changeQty: (id: string, quantity: number) => void;
    totalQuantity: () => number;
    totalAmount: () => number;
};
export const useCartStore = create<CartState>()(
    persist((set, get) => ({
        items: [],
        addItem: item => set(state => {
            const found = state.items.find(x => x.id === item.id);
            return { items: found ? state.items.map(x => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x) : [...state.items, { ...item, quantity: 1 }] };
        }),
        removeItem: id => set(state => ({ items: state.items.filter(x => x.id !== id) })),
        changeQty: (id, quantity) => set(state => ({
            items: state.items.map(x => x.id === id ? { ...x, quantity } : x).filter(x => x.quantity > 0),
        })),
        totalQuantity: () => get().items.reduce((sum, x) => sum + x.quantity, 0),
        totalAmount: () => get().items.reduce((sum, x) => sum + x.price * x.quantity, 0),
    }), {
        name: `ktxgo-cart-${STUDENT.mssv}`,
        storage: createJSONStorage(() => AsyncStorage),
        partialize: state => ({ items: state.items }),
    })
);
