import { Link } from "react-router-dom";
import CategoryNavigator from "./CategoryNavigator";

const ProductCard = ({ item, handleDelete }) => {
  const isAdmin = sessionStorage.getItem("active-admin") !== null;

  return (
    <div className="col">
      <div className="card border-color rounded-card card-hover product-card custom-bg h-100">
        <img
          src={`http://localhost:8080/api/product/${item.imageName}`}
          className="card-img-top rounded mx-auto d-block m-2"
          alt={item.title}
          style={{ maxHeight: "270px", maxWidth: "100%", width: "auto" }}
        />

        <div className="card-body text-color">
          <h5 className="card-title d-flex justify-content-between">
            <div>
              <b>{item.title}</b>
            </div>
            <CategoryNavigator
              item={{ id: item.category.id, title: item.category.title }}
            />
          </h5>
          <p className="card-text">
            <b>{item.description}</b>
          </p>
        </div>

        <div className="card-footer">
          <div className="text-center text-color">
            <p>
              <h4>Price : ₹{item.price}</h4>
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <Link
              to={`/product/${item.id}/category/${item.category.id}`}
              className="btn bg-color custom-bg-text"
            >
              Add to Cart
            </Link>

            <p className="text-color">
              <b>Stock : {item.quantity}</b>
            </p>
          </div>

          {isAdmin && (
            <div className="text-center mt-2 d-flex flex-column gap-2">
              <Link
                to={`/updateproduct/${item.id}`}
                className="btn btn-warning btn-sm"
              >
                Update Product
              </Link>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  console.log("Clicked delete for:", item.id);
                  if (
                    window.confirm(
                      "Are you sure you want to delete this product?"
                    )
                  ) {
                    handleDelete(item.id);
                  }
                }}
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
