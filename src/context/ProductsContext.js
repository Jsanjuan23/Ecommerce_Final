import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "productos"), (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    products,
    loading,
  };

  return (
    <ProductContext.Provider value={value}>
      {!loading && children}
    </ProductContext.Provider>
  );
};
