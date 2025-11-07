import React, { useEffect, useState, useRef } from 'react';
import { Pencil, Trash2, Plus, Save } from 'lucide-react';
import Swal from 'sweetalert2';

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const newCategoryRef = useRef(null);
  const editInputRef = useRef(null);



  useEffect(() => {
    if (showForm && newCategoryRef.current) {
      newCategoryRef.current.focus();
    }
  }, [showForm]);

  useEffect(() => {
    if (editingCategory !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingCategory]);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_name: newCategory }),
      });
      if (res.ok) {
        setNewCategory('');
        setShowForm(false);
        fetchCategories();
        Swal.fire('Success!', 'Category added successfully!', 'success');
      } else {
        Swal.fire('Error', 'Failed to add category', 'error');
      }
    } catch (err) {
      console.error('Failed to add category:', err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the category permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchCategories();
        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
      } else {
        Swal.fire('Error', 'Failed to delete category', 'error');
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category.category_id);
    setEditedName(category.category_name);
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_name: editedName }),
      });
      if (res.ok) {
        setEditingCategory(null);
        setEditedName('');
        fetchCategories();
        Swal.fire('Updated!', 'Category name has been updated.', 'success');
      } else {
        Swal.fire('Error', 'Failed to update category', 'error');
      }
    } catch (err) {
      console.error('Failed to update category:', err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
        <p className="text-gray-600">Add, edit or remove product categories</p>
      </div>

      {/* Add Category Form Toggle */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-4 h-4 inline-block mr-1" /> Add Category
        </button>
      ) : (
        <div className="flex space-x-2">
          <input
            type="text"
            ref={newCategoryRef}
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => {
              setShowForm(false);
              setNewCategory('');
            }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Category Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Category Name</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.category_id} className="border-t border-gray-100">
                <td className="px-6 py-4">{cat.category_id}</td>
                <td className="px-6 py-4">
                  {editingCategory === cat.category_id ? (
                    <input
                      type="text"
                      ref={editInputRef}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    cat.category_name
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {editingCategory === cat.category_id ? (
                    <button
                      onClick={() => handleSaveEdit(cat.category_id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(cat.category_id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-gray-500 text-center">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManage;
