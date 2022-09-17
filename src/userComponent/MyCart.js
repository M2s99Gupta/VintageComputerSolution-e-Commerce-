import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const [totatPrice, setTotalPrice] = useState("");
  const [myCartData, setMyCartData] = useState([]);

  useEffect(() => {
    const getMyCart = async () => {
      const myCart = await retrieveMyCart();
      if (myCart) {
        console.log("cart data is present :)");
        console.log(myCart.totalCartPrice);
        console.log(myCart.cartData);
        setTotalPrice(myCart.totalCartPrice);
        setMyCartData(myCart.cartData);
      }
    };

    getMyCart();
  }, []);

  const retrieveMyCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/mycart?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteProductFromCart = (cartId, e) => {
    const response = axios.get(
      "http://localhost:8080/api/user/mycart/remove?cartId=" + cartId
    );

    console.log(response);
  };

  const checkout = () => {
    console.log("CHECKOUT PAGE REQUEST");
    navigate("/user/order/payment", { state: { priceToPay: totatPrice } });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5"
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header text-center bg-color">
          <h2>My Cart</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover custom-bg-text text-center">
              <thead className="bg-color table-bordered border-color">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {myCartData.map((cartData) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            cartData.productImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>{cartData.productName}</td>
                      <td>{cartData.productDescription}</td>
                      <td>{cartData.quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteProductFromCart(cartData.cartId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-color">
          <div className="float-right">
            <div
              className="custom-bg-text me-2"
              style={{
                textAlign: "right",
              }}
            >
              <h6>Total Price: &#8377; {totatPrice}/-</h6>
            </div>

            <div className="float-end me-2">
              <button
                type="submit"
                className="btn custom-bg text-color mb-3"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
