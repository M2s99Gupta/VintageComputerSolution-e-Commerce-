import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const priceToPay = location.state.priceToPay;

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });

  const handleCardInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const payAndOrder = () => {
    fetch("http://localhost:8080/api/user/order?userId=" + user.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);
      });
    });
  };

  const payForOrder = (e) => {
    payAndOrder();
    navigate("/home");
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Payment Details</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name on Card
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="cardName"
                  onChange={handleCardInput}
                  value={card.cardName}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="cardNumber" class="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  onChange={handleCardInput}
                  value={card.cardNumber}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="validThrough" class="form-label">
                  Valid Through
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validThrough"
                  name="validThrough"
                  onChange={handleCardInput}
                  value={card.validThrough}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="cvv" class="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="cvv"
                  name="cvv"
                  onChange={handleCardInput}
                  value={card.cvv}
                  required
                />
              </div>

              <button
                type="submit"
                class="btn custom-bg text-color"
                onClick={payForOrder}
              >
                Pay &#8377; {priceToPay}/-
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;
