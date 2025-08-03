// src/pages/CreateProduct.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "",
    category: "",
    brand: "",
    sku: "",
    stock_quantity: "",
    images: "",
    tags: "",
    is_active: false,
  });

  const navigate = useNavigate();

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
      console.log(payload)
      await axios.post("https://nessfi-assignment.onrender.com/api/products/", payload, {
        withCredentials:true
      });

      alert("Product created successfully");
      navigate("/");
    }catch (error) {
    const message = error.response?.data?.error || "Failed to create product";
    alert(message); 
    console.error("Error creating product:", error);
}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold mb-4">Create Product</h2>
        {Object.entries({
          name: "Product Name",
          description: "Description",
          price: "Price",
          currency: "Currency (e.g. INR)",
          category: "Category",
          brand: "Brand",
          sku: "SKU (Unique)",
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
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Create Product
        </button>
      </form>
    </div>
  );
}
