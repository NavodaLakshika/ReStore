import { createContext, useContext, useState } from "react";
import { Basket } from "../../models/basket";
import { PropsWithChildren } from "react";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket | null) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("Oooops - we do not seem to be inside a StoreProvider");
  }
  return context;
};

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) return;

    const items = [...basket.items];
    const itemIndex = items.findIndex(i => i.productId === productId);

    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;

      if (items[itemIndex].quantity === 0) {
        items.splice(itemIndex, 1);
      }

      setBasket(prevState => ({
        ...prevState!,
        items,
      }));
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
