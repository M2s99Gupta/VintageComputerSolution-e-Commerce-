import { Link } from "react-router-dom";

const CategoryNavigator = (category) => {
  console.log(category);
  return (
    <Link
      to={`/home/product/category/${category.item.id}/${category.item.title}`}
      style={{
        textDecoration: "none",
      }}
      className="custom-bg-text"
    >
      <i>{category.item.title}</i>
    </Link>
  );
};

export default CategoryNavigator;
