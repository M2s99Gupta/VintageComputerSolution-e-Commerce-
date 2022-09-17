import jeans_images from "../images/fitjeans.jpg";
import { Link } from "react-router-dom";
import CategoryNavigator from "./CategoryNavigator";

const ProductCard = (product) => {
  return (
    <div class="card border-color rounded-card card-hover product-card">
      <img
        src={"http://localhost:8080/api/product/" + product.item.imageName}
        class="card-img-top rounded mx-auto d-block m-2"
        alt="img"
        style={{
          maxHeight: "270px",
          maxWidth: "100%",
          width: "auto",
        }}
      />

      <div class="card-body">
        <h5 class="card-title d-flex justify-content-between">
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
            className="custom-bg-text"
          >
            {product.item.title}
          </Link>
          <CategoryNavigator
            item={{
              id: product.item.category.id,
              title: product.item.category.title,
            }}
          />
        </h5>
        <p className="card-text custom-bg-text">{product.item.description}</p>
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
                Price : &#8377;{product.item.price}
              </b>
            </span>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <Link
            to={`/product/${product.item.id}/category/${product.item.category.id}`}
            className="btn custom-bg text-color"
          >
            Add to Cart
          </Link>

          <p class="custom-bg-text">
            <b>
              <i>Stock :</i> {product.item.quantity}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
