// import Swal from 'sweetalert2';
// import React, { useState, useEffect } from 'react';
// import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
// import ProductForm from './ProductForm';

// const ProductsView = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/products');
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       console.error('Failed to fetch products:', err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/categories');
//       const data = await res.json();
//       setCategories(data);
//     } catch (err) {
//       console.error('Failed to fetch categories:', err);
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category_name?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       !selectedCategory || selectedCategory === 'All' || product.category_name === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   const handleAddProduct = () => {
//     setEditingProduct(null);
//     setShowForm(true);
//   };

//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setShowForm(true);
//   };

//   const handleDeleteProduct = async (productId) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'This product will be permanently deleted.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#aaa',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     // if (result.isConfirmed) {
//     //   try {
//     //     const res = await fetch(http://localhost:5000/api/products/${productId}, {
//     //       method: 'DELETE',
//     //     });

//     //     if (!res.ok) throw new Error('Failed to delete the product');

//     //     Swal.fire('Deleted!', 'Product has been deleted.', 'success');

//     //     // Optionally: refresh product list
//     //     fetchProducts(); // or update your state
//     //   } catch (err) {
//     //     Swal.fire('Error', err.message, 'error');
//     //   }
//     // }
//   };
  
//   const handleToggleStatus = (productId) => {
//     setProducts((prev) =>
//       prev.map((p) =>
//         p.product_id === productId ? { ...p, is_active: !p.is_active } : p
//       )
//     );
//   };

//   const handleSaveProduct = async () => {
//     await fetchProducts();
//     setShowForm(false);
//     setEditingProduct(null);
//   };

//   if (showForm) {
//     return (
//       <ProductForm
//         product={editingProduct}
//         onSave={handleSaveProduct}
//         onCancel={() => setShowForm(false)}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//           <p className="text-gray-600">Manage your product catalog</p>
//         </div>
//         <button
//           onClick={handleAddProduct}
//           className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Add Product</span>
//         </button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Filter className="w-5 h-5 text-gray-400" />
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             >
//               <option value="">All</option>
//               {categories.map((cat) => (
//                 <option key={cat.category_id} value={cat.category_name}>
//                   {cat.category_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.product_id}
//             className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
//           >
//             <div className="aspect-video bg-gray-100 relative">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-3 right-3 flex space-x-2">
//                 <button
//                   onClick={() => handleToggleStatus(product.product_id)}
//                   className={p-2 rounded-full ${product.is_active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}}
//                 >
//                   {product.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>
//             <div className="p-4 space-y-2">
//               <div className="flex items-start justify-between">
//                 <h3 className="font-semibold text-gray-900">{product.name}</h3>
//                 <span className={px-2 py-1 text-xs rounded-full ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}}>
//                   {product.is_active ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//               {product.telugu_name && <div className="text-sm text-gray-500 italic">Telugu Name: {product.telugu_name}</div>}
//               <p className="text-sm text-gray-600">{product.description}</p>
//               <div className="text-sm text-gray-500">Category: {product.category_name}</div>
//               {product.spice_level !== undefined && <div className="text-sm text-gray-500">Spice Level: {product.spice_level}/5</div>}
//               <div className="text-sm text-gray-500">Featured: {product.is_featured ? 'Yes' : 'No'}</div>
//               <div className="text-sm text-gray-500">In Stock: {product.in_stock ? 'Yes' : 'No'}</div>
//               <div className="text-sm text-gray-500">Ingredients: {product.ingredients?.join(', ')}</div>
//               <div className="text-sm text-gray-500">Base Price: ₹{product.base_price}</div>
//               <div className="text-sm text-gray-500">Variants:</div>
//               <ul className="text-sm text-gray-600 list-disc ml-5">
//                 {product.variants?.map((v, idx) => (
//                   <li key={idx}>Weight: {v.weight}, Price: ₹{v.original_price}, Discount: {v.discount_percent}%, Stock: {v.stock}</li>
//                 ))}
//               </ul>
//               <div className="flex space-x-2 pt-2">
//                 <button
//                   onClick={() => handleEditProduct(product)}
//                   className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                 >
//                   <Edit className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteProduct(product.product_id)}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredProducts.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No products found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsView;

import React from 'react'

const ProductsView = () => {
  return (
    <div>
      
    </div>
  )
}

export default ProductsView
