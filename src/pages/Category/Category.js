import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Category.scss";
import CategorySelector from "../../components/CategorySelector/CategorySelector";
import InfoSection from "../../components/InfoSection/InfoSection";

export default function Category() {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState({
    category: {},
    products: [],
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const [categoryResponse, productsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/categories/${categoryId}`),
          axios.get(
            `http://localhost:8080/api/products/category/${categoryId}`
          ),
        ]);

        setCategoryData({
          category: categoryResponse.data,
          products: productsResponse.data,
        });
        console.log(productsResponse.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const { category, products } = categoryData;

  const handleItemClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="category">
      <div className="category__name-container">
        <h1 className="category__name">{category.name}</h1>
      </div>
      {products.map((product) => (
        <article className="category__product-card" key={product.id}>
          <img
            className="category__product-img"
            src={product.preview_images.mobile}
            alt={product.name}
          />
          <h2 className="category__product-name">{product.name}</h2>
          <p className="category__product-description">{product.description}</p>
          <Link
            to={`/product/${product.slug}`}
            className="category__product-btn"
            onClick={handleItemClick}
          >
            See Product
          </Link>
        </article>
      ))}

      <CategorySelector />
      <InfoSection />
    </section>
  );
}
