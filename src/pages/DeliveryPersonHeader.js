import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryPersonHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-delivery"));
  console.log(user);

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-delivery");
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/user/delivery/myorders"
          class="nav-link active"
          aria-current="page"
        >
          My Deliveries
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/user/admin/searchOrder"
          class="nav-link active"
          aria-current="page"
        >
          Update Order Delivery
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          Logout
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default DeliveryPersonHeader;
