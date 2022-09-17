import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser = () => {
  let navigate = useNavigate();

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
    sessionStorage.removeItem("active-user");
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link to="/user/mycart" class="nav-link active" aria-current="page">
          My Cart
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/user/myorder" class="nav-link active" aria-current="page">
          My Order
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

export default HeaderUser;
