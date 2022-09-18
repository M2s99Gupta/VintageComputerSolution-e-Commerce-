import Carousel from "./Carousel";
import GetAllCategories from "../productComponent/GetAllCategories";
import ProductCard from "../productComponent/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    if (categoryId == null) {
      console.log("Category Id is null");
      getAllProducts();
    } else {
      console.log("Category Id is NOT null");
      getProductsByCategory();
    }
  }, [categoryId]);

  const retrieveAllProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/product/all");

    return response.data;
  };

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/category?categoryId=" + categoryId
    );

    return response.data;
  };

  return (
    <div className="container-fluid">
      <Carousel />
      <div className="mt-2">
        <div className="row">
          <div className="col-sm-2">
            <GetAllCategories />
          </div>
          <div className="col-sm-10">
            <div className="row">
              <div class="col-md-12">
                <div className="col-md-3">
                  {products.map((product) => {
                    return <ProductCard item={product} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
