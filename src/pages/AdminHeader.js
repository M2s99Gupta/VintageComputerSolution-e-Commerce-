import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link to="/addcategory" class="nav-link active" aria-current="page">
          Add Category
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/addproduct" class="nav-link active" aria-current="page">
          Add Product
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/user/admin/allorder"
          class="nav-link active"
          aria-current="page"
        >
          All Orders
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/user/admin/assigndelivery"
          class="nav-link active"
          aria-current="page"
        >
          Assign Order Delivery
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
          Logout
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
