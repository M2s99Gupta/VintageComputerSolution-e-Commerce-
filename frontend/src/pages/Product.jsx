import GetAllCategories from "../productComponent/GetAllCategories";
import CategoryNavigator from "../productComponent/CategoryNavigator";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../productComponent/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { productId, categoryId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));

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
      `http://localhost:8080/api/product/id?productId=${productId}`
    );
    return response.data;
  };

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/product/category?categoryId=${categoryId}`
    );
    return response.data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const retrievedProduct = await retrieveProduct();

      if (
        retrievedProduct &&
        retrievedProduct.products &&
        retrievedProduct.products.length > 0
      ) {
        const productData = retrievedProduct.products[0];

        // ✅ Check if deleted is false
        if (!productData.deleted) {
          setProduct(productData);
        } else {
          toast.error("This product has been deleted.", {
            position: "top-center",
            autoClose: 2000,
          });
          navigate("/home"); // or to a category view
        }
      } else {
        toast.error("Product not found.", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/home"); // or any fallback page
      }
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts && Array.isArray(allProducts.products)) {
        setProducts(allProducts.products);
      }
    };

    getProduct();
    getProductsByCategory();
  }, [productId, categoryId]);

  const saveProductToCart = (userId) => {
    fetch("http://localhost:8080/api/user/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity, userId, productId }),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => navigate("/user/mycart"), 2000);
          } else {
            toast.error(res.responseMessage || "Failed to add to cart", {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => window.location.reload(true), 2000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => window.location.reload(true), 1000);
      });
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login as Customer to buy the products!", {
        position: "top-center",
        autoClose: 1500,
      });
    } else {
      saveProductToCart(user.id);
      setQuantity("");
    }
  };

  const handleDelete = async (productIdToDelete) => {
    const token = sessionStorage.getItem("admin_jwtToken");

    try {
      const res = await fetch(
        `http://localhost:8080/api/product/products/${productIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultText = await res.text();

      if (res.ok) {
        toast.success("Product deleted successfully!", {
          position: "top-center",
          autoClose: 1500,
        });

        //  Option 1: Redirect away to avoid showing deleted product
        setTimeout(() => {
          navigate("/home"); // or navigate to category page
        }, 1500);
      } else {
        toast.error(`Failed to delete product: ${resultText}`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting product.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 mt-2">
          <GetAllCategories />
        </div>
        <div className="col-sm-3 mt-2 admin">
          <div className="card form-card border-color custom-bg">
            <img
              src={`http://localhost:8080/api/product/${product.imageName}`}
              style={{ maxHeight: "500px", maxWidth: "100%", width: "auto" }}
              className="card-img-top rounded mx-auto d-block m-2"
              alt="img"
            />
          </div>
        </div>
        <div className="col-sm-7 mt-2">
          <div className="card form-card border-color custom-bg">
            <div className="card-header bg-color">
              <div className="d-flex justify-content-between">
                <h1 className="custom-bg-text">{product.title}</h1>
              </div>
            </div>
            <div className="card-body text-left text-color">
              <div className="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <h4 className="card-text">{product.description}</h4>
            </div>
            <div className="card-footer custom-bg">
              <div className="text-center text-color">
                <p>
                  <span>
                    <h4>Price : ₹{product.price}</h4>
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <form className="row g-3" onSubmit={addToCart}>
                  <div className="col-auto">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Quantity..."
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                      required
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="submit"
                      className="btn bg-color custom-bg-text mb-3"
                      value="Add to Cart"
                    />
                    <ToastContainer />
                  </div>
                </form>
                <p className="ml-2 text-color">
                  <b>Stock : {product.quantity}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <h2>Related Products:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
