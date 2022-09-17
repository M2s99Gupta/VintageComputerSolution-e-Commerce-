import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const MyOrder = () => {
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const [myOrderData, setMyOrderData] = useState([]);

  useEffect(() => {
    const getMyOrder = async () => {
      const myOrder = await retrieveMyOrder();
      if (myOrder) {
        console.log("my order data is present :)");

        setMyOrderData(myOrder);
      }
    };

    getMyOrder();
  }, []);

  const retrieveMyOrder = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/myorder?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
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
          <h2>My Orders</h2>
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
                  <th scope="col">Order Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Delivery Date</th>
                  <th scope="col">Delivery Status</th>
                  <th scope="col">Delivery Person</th>
                  <th scope="col">Delivery Mobile No</th>
                </tr>
              </thead>
              <tbody>
                {myOrderData.map((orderData) => {
                  return (
                    <tr>
                      <td>{orderData.orderId}</td>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            orderData.productImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>{orderData.productName}</td>
                      <td>{orderData.productDescription}</td>
                      <td>{orderData.quantity}</td>
                      <td>{orderData.totalPrice}</td>
                      <td>{orderData.orderDate}</td>
                      <td>{orderData.deliveryDate}</td>
                      <td>{orderData.deliveryStatus}</td>
                      <td>{orderData.deliveryPersonName}</td>
                      <td>{orderData.deliveryPersonContact}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
