import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = collection(firestore, "categorias");

    const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
      const categoriesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    categories,
    loading,
  };

  return (
    <CategoryContext.Provider value={value}>
      {!loading && children}
    </CategoryContext.Provider>
  );
};
