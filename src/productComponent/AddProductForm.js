import { useState, useEffect } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);

  const retrieveAllCategories = async () => {
    const response = await axios.get("http://localhost:8080/api/category/all");
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories);
      }
    };

    getAllCategories();
  }, []);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
  });

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const saveProduct = () => {
    const formData = new FormData();
    formData.append("image", selectedPhoto);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("categoryId", product.categoryId);

    axios
      .post("http://localhost:8080/api/product/add", formData)
      .then((resp) => {
        let result = resp.data.data;
        alert("Product saved successfully");
      })
      .catch((error) => {
        console.log("Error", error);
        alert("Error saving product");
      });
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Add Product</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  Product Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  name="title"
                  onChange={handleInput}
                  value={product.title}
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Product Description
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={product.description}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>

                <select
                  name="categoryId"
                  value={selectedCategory}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => {
                    return (
                      <option value={category.id}> {category.title} </option>
                    );
                  })}
                </select>
              </div>

              <div class="mb-3 mt-1">
                <label for="quantity" class="form-label">
                  Product Quantity
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  name="quantity"
                  onChange={handleInput}
                  value={product.quantity}
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">
                  Product Price
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  name="price"
                  onChange={handleInput}
                  value={product.price}
                />
              </div>

              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Select Product Image
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  name="photo"
                  value={product.photo}
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                class="btn custom-bg text-color"
                onClick={saveProduct}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
