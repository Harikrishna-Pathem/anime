
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    teluguName: product?.telugu_name || '',
    description: product?.description || '',
    category_name: product?.category_name || '', // category_id for saving
    basePrice: product?.base_price || '',
    image: product?.image || '',
    ingredients: product?.ingredients || [''],
    weights: product?.variants || [{ weight: 'null', original_price: '', discount_percent: '', stock: '' }],
    spiceLevel: product?.spice_level || 0,
    inStock: product?.in_stock ?? true,
    featured: product?.featured ?? false,
    isActive: product?.is_active ?? true
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formDataImage,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      setFormData((prev) => ({ ...prev, image: data.imageUrl }));

      Swal.fire({
        icon: "success",
        title: "Image uploaded",
        text: "Image successfully uploaded and linked to product.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: err.message || "Something went wrong",
      });
    }
  };


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleWeightChange = (index, field, value) => {
    const newWeights = [...formData.weights];
    newWeights[index] = { ...newWeights[index], [field]: value };
    setFormData((prev) => ({ ...prev, weights: newWeights }));
  };

  const addWeight = () => {
    setFormData((prev) => ({
      ...prev,
      weights: [...prev.weights, { weight: '', original_price: '', discount_percent: '', stock: '' }],
    }));
  };

  const removeWeight = (index) => {
    setFormData((prev) => ({
      ...prev,
      weights: prev.weights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedIngredients = formData.ingredients.filter((i) => i.trim() !== '');
    const cleanedWeights = formData.weights
      .filter((w) => w.original_price && w.stock) // only require price and stock
      .map((w) => ({
        ...w,
        weight: w.weight === '' ? null : w.weight, // convert empty string to null
        original_price: parseFloat(w.original_price),
        discount_percent: w.discount_percent ? parseInt(w.discount_percent) : 0,
        stock: parseInt(w.stock),
      }));


    const parsedBasePrice = parseFloat(formData.basePrice);

    if (!formData.name || !formData.category_name || isNaN(parsedBasePrice)) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const productPayload = {
      name: formData.name,
      telugu_name: formData.teluguName,
      description: formData.description,
      category_name: formData.category_name, // ✅ Use name, not ID
      base_price: parsedBasePrice,           // ✅ Make sure it's a number
      image: formData.image,
      ingredients: cleanedIngredients,
      spice_level: Number(formData.spiceLevel),
      in_stock: formData.inStock,
      is_featured: formData.featured,
      is_active: formData.isActive,
      variants: cleanedWeights,
    };

    if (isNaN(parsedBasePrice)) {
      alert("Please enter a valid base price.");
      return;
    }


    try {
      const response = await fetch(
        product
          ? `http://localhost:5000/api/products/${product.product_id}`
          : 'http://localhost:5000/api/products',
        {
          method: product ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      // Show SweetAlert2 popup
      Swal.fire({
        title: 'Success!',
        text: product ? 'Product updated successfully.' : 'Product created successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      onSave();
    } catch (err) {
      alert(err.message);
    }

  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600">
            {product ? 'Update product information' : 'Create a new product for your catalog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />

            <input
              type="text"
              placeholder="Telugu Name"
              value={formData.teluguName}
              onChange={(e) => handleInputChange('teluguName', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />

            <select
              value={formData.category_name}
              onChange={(e) => handleInputChange('category_name', e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>


            <input
              type="number"
              min="0"
              max="5"
              value={formData.spiceLevel}
              onChange={(e) => handleInputChange('spiceLevel', e.target.value)}
              placeholder="Spice Level (0–5)"
              className="w-full px-3 py-2 border rounded"
            />

            <input
              type="number"
              placeholder="Base Price"
              value={formData.basePrice}
              onChange={(e) => handleInputChange('basePrice', e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />

            <div className="space-y-2">
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full"
              />
            </div>


            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => handleInputChange('inStock', e.target.checked)}
              />
              <span>In Stock</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
              />
              <span>Active</span>
            </label>
          </div>

          {/* Ingredients Section */}
          <div className="bg-white rounded-xl shadow border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex justify-between">
              Ingredients
              <button type="button" onClick={addIngredient} className="text-green-600 flex items-center text-sm">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </h2>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                />
                {formData.ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(index)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Variant Section */}
        <div className="bg-white rounded-xl shadow border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex justify-between">
            Weight Variants
            <button type="button" onClick={addWeight} className="text-green-600 flex items-center text-sm">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </h2>
          {formData.weights.map((w, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <input
                type="text"
                value={w.weight}
                placeholder="Weight (e.g. 250g)"
                onChange={(e) => handleWeightChange(idx, 'weight', e.target.value)}
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                value={w.original_price}
                placeholder="Price (₹)"
                onChange={(e) => handleWeightChange(idx, 'original_price', e.target.value)}
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                value={w.discount_percent}
                placeholder="Discount (%)"
                onChange={(e) => handleWeightChange(idx, 'discount_percent', e.target.value)}
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                value={w.stock}
                placeholder="Stock"
                onChange={(e) => handleWeightChange(idx, 'stock', e.target.value)}
                className="px-3 py-2 border rounded"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            {product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
