// src/components/Productsthree.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Image from 'next/image';
import { setLoading, setError, setData, updateQuantity, setVisibleProducts } from '../../redux/productsSlice';
import { RootState } from '../../redux/store';

const Productsthree = () => {
  const dispatch = useDispatch();
  const { data, loading, error, quantities, visibleProducts } = useSelector((state: RootState) => state.products);

  const fetchData = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(setError('Authentication error. Please log in.'));
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${process.env.API_URL || ''}category`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data.data[0].products[0].state[0]);


      if (Array.isArray(response.data.data)) {
        dispatch(setData(response.data.data));
      } else {
        dispatch(setError('Failed to fetch products. Please try again.'));
      }
    } catch (err) {
      dispatch(setError('Failed to fetch products. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantityChange = (categoryId: string, categoryTitle: string, productId: string, productTitle: string, increment: boolean, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateQuantity({ categoryId, categoryTitle, productId, productTitle, increment }));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);  // Try to create a URL object
      return true;    // If successful, it's a valid URL
    } catch (e) {
      return false;   // If it throws an error, it's not a valid URL
    }
  };

  const handleShowMore = (category: string) => {
    dispatch(setVisibleProducts({
      ...visibleProducts,
      [category]: (visibleProducts[category] || 5) + 5,
    }));
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-2 md:gap-5 xl:gap-10 border-b mb-4 md:mb-8 lg:mb-16 productborder">
      {data.map((category) => {
        // Check if category.products is not null and has products

        if (category.products.length === 0 || !category.products) return null;
        // if (category.products.length === 0 || category.products.some((prd) => !Array.isArray(prd.state) || prd.state.length === 0)) {
        //   return null;
        // }
        

        const visibleCount = visibleProducts[category.id] || 5;
        const displayedProducts = category.products.slice(0, visibleCount);
        const categoryImage = category?.image && isValidUrl(category.image) 
        ? category.image 
        : "/images/default-image.jpg";
        return (
          <div key={category.title} className="pb-5 md:pb-10 xl:pb-20">
            <Image
              src={categoryImage}
              alt={`${category.title} Icon`}
              height={180}
              width={180}
              className="mx-auto"
            />
            <h6 className="uppercase font-extrabold text-primary text-sm md:text-base xl:text-22 px-3 productstepper">{category.title}</h6>
            <div className="float-left">
            {displayedProducts.map((product) => {
  // Skip rendering this product if the state array is empty
  if (product.state.length === 0) return null;

  return (
    <div key={product.id} className="flex justify-between items-center pt-2">
      <div className="flex items-center">
        <Image
          src={product.logo_url || '/images/default-product.jpg'}
          alt={product.title || 'Unnamed Product'}
          width={20}
          height={20}
        />
        <label className="text-sm md:text-base xl:text-20 uppercase productsitem pl-2" htmlFor="ripple-two">
          {product.title || 'Unnamed Product'}
        </label>
      </div>
      <div className="flex items-center space-x-2 pl-8">
        <button
          onClick={(e) => handleQuantityChange(category.id, category.title, product.id, product.title, false, e)}
          className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
        >
          -
        </button>
        <input
          type="number"
          value={quantities[product.id] || 0}
          readOnly
          name="qty"
          className="w-16 h-7 bg-light-gray-qty p-1 text-sm text-primary font-bold text-center"
        />
        <button
          onClick={(e) => handleQuantityChange(category.id, category.title, product.id, product.title, true, e)}
          className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
        >
          +
        </button>
      </div>
    </div>
  );
})}

              {category.products.length > visibleCount && (
                <button
                  onClick={() => handleShowMore(category.id)}
                  className="text-primary mt-2 px-3 py-1 border border-primary rounded hover:bg-primary hover:text-white transition duration-300"
                >
                  View More
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Productsthree;
