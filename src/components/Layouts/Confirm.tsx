"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/Layouts/Header";
import Stepstwo from "@/components/Layouts/Stepstwo";
import CustomerProfile from "@/components/Layouts/Profile";
import { useSelector } from "react-redux";
import Ordertype from "./Ordertype";

const Confirm = () => {
  const { selectedData, session, date,orderType } = useSelector(
    (state: any) => state.products,
  );
  const totalItems = selectedData.reduce((total, category) => {
    return (
      total +
      category.products.reduce(
        (productTotal, product) => productTotal + product.quantity,
        0,
      )
    );
  }, 0);

  return (
    <fieldset className="px-4 lg:px-0">
      <header className="flex flex-wrap items-center pb-6">
        <Header />
      </header>
      <Stepstwo />
      <div className="basic-detail mb-5">
        <h1 className="text-22 lg:text-34 xl:text-64 hellouser pb-4 uppercase text-primary lg:pb-8">
          CONFIRMATION SUMMARY
        </h1>
        <CustomerProfile />
      </div>
      <div>
        <h3 className="lg:text-24 xl:text-34 userdetails pb-4 text-base font-extrabold text-primary lg:pb-8">
          SELECTED ITEMS FOR DISPOSAL
        </h3>
        <div className="border border-dashed border-primary"></div>
        <div className="relative max-w-full overflow-x-auto py-5">
          <table className="w-full text-left">
            <thead>
              <tr className="text-secondary lg:text-20 xl:text-30 text-left text-base font-extrabold uppercase">
                <th className="productcart py-5">CATEGORY</th>
                <th className="productcart py-5">ITEMS</th>
                <th className="productcart py-5">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((category) => (
                <React.Fragment key={category.id}>
                  <tr className="text-secondary lg:text-22 py-3 text-left text-sm font-semibold uppercase lg:py-5">
                    <td className="productscarditem py-5">{category.title}</td>
                    <td className="productscarditem py-5">
                      {category.products.map((product) => (
                        <span
                          key={product.id}
                          className="productscarditem block"
                        >
                          {product.title}
                        </span>
                      ))}
                    </td>
                    <td className="py-5">
                      {category.products.map((product) => (
                        <span
                          key={product.id}
                          className="productscarditem block"
                        >
                          {product.quantity}
                        </span>
                      ))}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="lg:text-20 xl:text-30 text-secondary border-b border-t border-dashed border-primary pt-4 text-base font-extrabold">
                <td colSpan="2" className="userdetails py-5">
                  TOTAL ITEMS
                </td>
                <td className="userdetails py-5">{totalItems}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="productsitem pt-10">
          <h3 className="lg:text-24 xl:text-34 userdetails pb-4 text-base font-extrabold text-primary lg:pb-8">
            SELECTED DATE & TIME SLOT
          </h3>
          <div className="border border-dashed border-primary"></div>
          <h4 className="text-secondary lg:text-24 xl:text-34 slotconf py-6 lg:py-12">
            {date.date}/{date.month}/{date.year} &nbsp;
            {session.morning
              ? "MORNING"
              : session.afternoon
                ? "AFTERNOON"
                : session.evening
                  ? "EVENING"
                  : null}
          </h4>
        </div>
        <Ordertype/>
      </div>
    </fieldset>
  );
};

export default Confirm;
