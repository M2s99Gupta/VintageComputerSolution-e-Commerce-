import { useState } from "react";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveCategory = () => {
    let data = { title, description };

    fetch("http://localhost:8080/api/category/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.warn("result", result);
      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Add Category</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  Category Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="enter title.."
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Category Description
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  placeholder="enter description.."
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>

              <button
                type="submit"
                onClick={saveCategory}
                class="btn custom-bg text-color"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
