import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  title: string;
  image?: string;
  logo_url?: string;
  quantity: number;
}

interface Category {
  id: string;
  title: string;
  image?: string;
  products: Product[];
}
interface dateInterface {
    date: string;
    month: string;
    year: string;
}
const dateState = {
    date: "",
    month: "",
    year: new Date().getFullYear().toString()
}
interface sessioInterface {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
}
const SessionState = {
    morning: false,
    afternoon: false,
    evening: false,
}
interface ordertypeInterface {
  pickup: boolean;
  drop: boolean;
}
const ordertypeState = {
  pickup: false,
  drop: false,
}

interface ProductState {
  data: Category[];
  selectedData: Category[]; // This will hold the selected categories and products
  loading: boolean;
  date: dateInterface;
  error: string | null;
  quantities: Record<string, number>; // Store quantities by product ID
  visibleProducts: Record<string, number>;
  session: sessioInterface;
  ordertype: ordertypeInterface;
}

const initialState: ProductState = {
  data: [],
  selectedData: [],
  loading: false,
  error: null,
  quantities: {},
  date: dateState,
  visibleProducts: {},
  session: SessionState,
  ordertype: ordertypeState,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setData(state, action: PayloadAction<Category[]>) {
      state.data = action.payload;
    },
    setSelectedData(state, action: PayloadAction<Category[]>) {
      state.selectedData = action.payload; // Update selected data
    },
    setQuantities(state, action: PayloadAction<Record<string, number>>) {
      state.quantities = action.payload;
    },
    setVisibleProducts(state, action: PayloadAction<Record<string, number>>) {
      state.visibleProducts = action.payload;
    },
    setDate(state, action: PayloadAction<dateInterface>) {
        state.date = action.payload;
    },
    setSession(state, action: PayloadAction<sessioInterface>) {
        state.session = action.payload;
    },
    setOrdertype(state, action: PayloadAction<ordertypeInterface>) {
      state.ordertype = action.payload;
  },
    updateQuantity(state, action: PayloadAction<{ categoryId: string; categoryTitle: string; productId: string; productTitle: string; increment: boolean }>) {
      const { categoryId, categoryTitle, productId, productTitle, increment } = action.payload;
      let category = state.selectedData.find(category => category.id === categoryId);

      if (!category) {
        category = {
          id: categoryId,
          title: categoryTitle,
          products: [],
        };
        state.selectedData.push(category);
      }

      let product = category.products.find(product => product.id === productId);

      if (!product) {
        product = {
          id: productId,
          title: productTitle,
          quantity: 0,
        };
        category.products.push(product);
      }

      const currentQuantity = product.quantity || 0;
      const updatedQuantity = increment ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);
      product.quantity = updatedQuantity;
      
      state.quantities[productId] = updatedQuantity;

      console.log(`Updated quantity for ${productTitle} in category ${categoryTitle}: ${updatedQuantity}`);
    },
  },
});

export const {
  setLoading,
  setError,
  setData,
  setSelectedData,
  setQuantities,
  setVisibleProducts,
  updateQuantity,
  setDate,
  setSession,
  setOrdertype,
} = productSlice.actions;

export default productSlice.reducer;
