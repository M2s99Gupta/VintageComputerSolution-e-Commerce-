import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: ""
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true); // ← loading state

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${productId}`)
      .then((res) => {
        const { name, description, price } = res.data;
        setProduct({
          name: name || "",
          description: description || "",
          price: price || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.name); // Backend expects "title"

    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("categoryId", product.categoryId);


    if (selectedPhoto) {
      formData.append("image", selectedPhoto); // Adjust key as per backend
    }

    axios
      .put(`http://localhost:8080/api/product/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        alert("Product updated successfully");
        navigate("/productlist");
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <div className="container mt-4">Loading product details...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Update Product</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Update Product Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setSelectedPhoto(e.target.files[0])}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
