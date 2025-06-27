import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "",
    category: "",
    brand: "",
    sku: "",
    stock_quantity: "",
    images: [],
    tags: [],
    is_active: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`, {
          withCredentials:true
        });
        const data = res.data.product;
        setFormData({
          ...data,
          price: data.price.toString(),
          stock_quantity: data.stock_quantity.toString(),
          images: data.images.join(", "),
          tags: data.tags.join(", "),
        });
      } catch (err) {
        alert("Failed to fetch product");
        console.log(err)
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        images: formData.images.split(",").map((url) => url.trim()),
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };
      await axios.put(`http://localhost:3000/api/products/${id}`, payload, {
        withCredentials:true
      });
      alert("Product updated successfully");
      navigate("/");
    } catch (err) {
      alert("Update failed");
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        {Object.entries({
          name: "Product Name",
          description: "Description",
          price: "Price",
          currency: "Currency",
          category: "Category",
          brand: "Brand",
          sku: "SKU",
          stock_quantity: "Stock Quantity",
          images: "Image URLs (comma separated)",
          tags: "Tags (comma separated)",
        }).map(([key, label]) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={label}
            value={formData[key]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required={key !== "brand" && key !== "description" && key !== "images" && key !== "tags"}
          />
        ))}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Active
        </label>
        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
          Update Product
        </button>
      </form>
    </div>
  );
}
