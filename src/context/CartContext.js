import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    const cartRef = collection(firestore, "carritos", user.uid, "productos");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const cartItems = snapshot.docs.map(doc => {
        return ({
          id: doc.id,
          ...doc.data(),
        })
      });
      setCart(cartItems);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) return;

    const productRef = doc(firestore, "carritos", user.uid, "productos", product.id);
    await setDoc(productRef, { ...product, quantity }, { merge: true });

    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (!user) return;

    const productRef = doc(firestore, "carritos", user.uid, "productos", productId);
    await updateDoc(productRef, { quantity });

    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    const productRef = doc(firestore, "carritos", user.uid, "productos", productId);
    await deleteDoc(productRef);

    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = async () => {
    if (!user) return;

    const cartItems = cart.map(item => item.id);
    const batchPromises = cartItems.map(productId => {
      const productRef = doc(firestore, "carritos", user.uid, "productos", productId);
      return deleteDoc(productRef);
    });

    await Promise.all(batchPromises);
    setCart([]);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};
