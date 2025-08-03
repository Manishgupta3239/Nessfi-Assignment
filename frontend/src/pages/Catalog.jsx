import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3); 
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://nessfi-assignment.onrender.com/api/products?page=${page}&limit=${limit}`, {
        withCredentials: true,
      });
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      alert("Failed to fetch products");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`https://nessfi-assignment.onrender.com/api/products/${id}`, {
        withCredentials: true,
      });
      fetchProducts();
    } catch (err) {
      alert("Delete failed");
      console.log(err);
    }
  };

  const handleLogout = async() => {
    try{
        await axios.get("https://nessfi-assignment.onrender.com/api/auth/logout",{
          withCredentials:true
        })
    navigate("/login");
    }catch(error){
      console.log(error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
     

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Product Catalog</h2>
        <button
          onClick={() => navigate("/create")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>
 <button
        onClick={handleLogout}
        className=" top-4  bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600 mb-1">Category: {product.category}</p>
            <p className="text-blue-700 font-bold">₹ {product.price}</p>
            <p className="text-sm text-gray-400 mt-2">SKU: {product.sku}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigate(`/update/${product._id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-4 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
