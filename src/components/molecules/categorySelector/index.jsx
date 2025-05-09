import React, { useState, useEffect } from 'react';
import SelectField from '../../atoms/selectField';
import api from '../../../api/api';

const CategorySelector = ({ category, setCategory, subcategory, setSubcategory }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await api.get('/categories');
        setCategories(response.data.categories);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories based on selected category
  useEffect(() => {
    if (!category) return;

    const fetchSubcategories = async () => {
      setLoadingSubcategories(true);
      try {
        const response = await api.get(`/category/${category}/subcategories`);
        setSubcategories(response.data.subcategories);
      } catch (err) {
        setError('Failed to fetch subcategories');
        console.error(err);
      } finally {
        setLoadingSubcategories(false);
      }
    };

    fetchSubcategories();
  }, [category]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
      {/* Category selector */}
      <div style={{ flex: 1 }}>
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SelectField
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory('');
            }}
            options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
          />
        )}
      </div>

      {/* Subcategory selector */}
      <div style={{ flex: 1 }}>
        {loadingSubcategories ? (
          <p>Loading subcategories...</p>
        ) : (
          <SelectField
            label="Subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            options={subcategories.map((sub) => ({ value: sub.id, label: sub.name }))}
            disabled={!subcategories.length}
          />
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
