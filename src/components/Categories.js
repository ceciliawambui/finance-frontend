import React, { useState, useEffect } from 'react';
import { fetchCategories, createCategory } from '../api/finance';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory) {
      const category = await createCategory(newCategory);
      setCategories([...categories, category]);
      setNewCategory('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Categories</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2"
          placeholder="New category name"
        />
        <button onClick={handleAddCategory} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="py-2">{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
