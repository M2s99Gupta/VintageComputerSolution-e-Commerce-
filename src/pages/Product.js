import GetAllCategories from "../productComponent/GetAllCategories";
import CategoryNavigator from "../productComponent/CategoryNavigator";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../productComponent/ProductCard";

const Product = () => {
  const { productId, categoryId } = useParams();

  let user = JSON.parse(sessionStorage.getItem("active-user"));

  const [quantity, setQuantity] = useState("");

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    quantity: "",
    price: "",
    imageName: "",
    category: { id: "", title: "" },
  });

  const retrieveProduct = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/id?productId=" + productId
    );

    return response.data;
  };

  const retrieveToShowReviewButton = async () => {
    console.log("TRYING To call show REVIEW API!!!");

    const response = await axios.post(
      "http://localhost:8080/api/user/order/product/showreview?productId=" +
        productId +
        "&userId=" +
        user.id
    );

    console.log(response.data.isToShow);

    return response.data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const retrievedProduct = await retrieveProduct();

      setProduct(retrievedProduct);
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    getProduct();
    getProductsByCategory();
  }, [productId]);

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/category?categoryId=" + categoryId
    );
    console.log(response.data);
    return response.data;
  };

  const saveProductToCart = (userId) => {
    fetch("http://localhost:8080/api/user/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        userId: userId,
        productId: productId,
      }),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  const addToCart = (e) => {
    if (user == null) {
      alert("Please login to buy the products!!!");
      e.preventDefault();
    } else {
      saveProductToCart(user.id);
      setQuantity("");
      e.preventDefault();
    }
  };

  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-sm-2 mt-2">
          <GetAllCategories />
        </div>
        <div class="col-sm-3 mt-2 admin">
          <div class="card form-card border-color">
            <img
              src={"http://localhost:8080/api/product/" + product.imageName}
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
                width: "auto",
              }}
              class="card-img-top rounded mx-auto d-block m-2"
              alt="img"
            />
          </div>
        </div>
        <div class="col-sm-7 mt-2">
          <div class="card form-card border-color">
            <div class="card-header bg-color">
              <div className="d-flex justify-content-between">
                <h1 className="custom-bg-text">{product.title}</h1>
                <CategoryNavigator
                  item={{
                    id: product.category.id,
                    title: product.category.title,
                  }}
                />
              </div>
            </div>

            <div class="card-body text-left">
              <div class="text-left mt-3">
                <h3 className="custom-bg-text">Description :</h3>
              </div>
              <h4 class="card-text custom-bg-text">{product.description}</h4>
            </div>

            <div class="card-footer bg-color">
              <div className="text-center">
                <p>
                  <span>
                    <b
                      style={{
                        color: "green",
                      }}
                    >
                      Price : &#8377;{product.price}
                    </b>
                  </span>

                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    <s>&#8377;1199.00</s>/-
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <form class="row g-3">
                    <div class="col-auto">
                      <input
                        type="number"
                        class="form-control"
                        id="addToCart"
                        placeholder="Enter Quantity..."
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        required
                      />
                    </div>
                    <div class="col-auto">
                      <button
                        type="submit"
                        className="btn custom-bg text-color mb-3"
                        onClick={addToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </form>
                </div>

                <p class="ml-2">Stock : {product.quantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-2"></div>

        <div className="col-sm-10">
          <h2>Related Products:</h2>
          <div class="row">
            <div class="card-group">
              {products.map((product) => {
                return <ProductCard item={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
