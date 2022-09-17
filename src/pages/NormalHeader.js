import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link to="/user/register" class="nav-link active" aria-current="page">
          Register User
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/user/login" class="nav-link active" aria-current="page">
          Login User
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
