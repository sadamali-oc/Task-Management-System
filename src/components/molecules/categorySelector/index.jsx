import React, { useState, useEffect } from 'react';
import SelectField from '../../atoms/selectField'; // Assuming SelectField is a reusable component

const CategorySelector = ({ category, setCategory, subcategory, setSubcategory }) => {
  const [subcategories, setSubcategories] = useState([]);

  const companyCategories = React.useMemo(() => [
    {
      value: 'Client',
      label: 'Client',
      subcategories: ['Client Onboarding', 'Client Meeting', 'Client Feedback', 'Contract Negotiation'],
    },
    {
      value: 'Technical',
      label: 'Technical',
      subcategories: ['Software Development', 'System Maintenance', 'Quality Assurance', 'Infrastructure Setup'],
      
    },
    {
      value: 'HR',
      label: 'HR',
      subcategories: ['Recruitment', 'Employee Relations', 'Training & Development', 'Payroll Management'],
    },
    {
      value: 'Operations',
      label: 'Operations',
      subcategories: ['Logistics', 'Inventory Management', 'Supplier Relations', 'Production Planning'],
    },
    {
      value: 'Support',
      label: 'Support',
      subcategories: ['Customer Support', 'Technical Support', 'Product Documentation', 'Service Desk'],
    },
    {
      value: 'Sales',
      label: 'Sales',
      subcategories: ['Lead Generation', 'Client Presentations', 'Negotiations', 'Sales Reporting'],
    },
    {
      value: 'Finance',
      label: 'Finance',
      subcategories: ['Budgeting', 'Accounts Payable', 'Accounts Receivable', 'Tax Filing'],
    },
  ], []);

  useEffect(() => {
    const selectedCategory = companyCategories.find((cat) => cat.value === category);
    
    if (selectedCategory) {
      // Reset subcategory when category is changed
      setSubcategories(selectedCategory.subcategories);
      setSubcategory(''); // Clear the subcategory when the category changes
    } else {
      setSubcategories([]); // Clear subcategories if category is invalid
      setSubcategory(''); // Ensure subcategory is cleared if no valid category
    }
  }, [category, companyCategories, setSubcategory]);

  useEffect(() => {
    if (category === 'Technical' && subcategory) {
      const selectedCategory = companyCategories.find((cat) => cat.value === category);
      const detailedSubcategories = selectedCategory?.subcategoriesDetails?.[subcategory] || [];
      setSubcategories(detailedSubcategories.length > 0 ? detailedSubcategories : selectedCategory.subcategories);
    }
  }, [subcategory, category, companyCategories]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
      {/* Category selector */}
      <div style={{ flex: 1 }}>
        <SelectField
          label="Category"
          value={category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            setCategory(selectedCategory); // Update category
            setSubcategory(''); // Reset subcategory on category change
          }}
          options={companyCategories.map((cat) => ({ value: cat.value, label: cat.label }))}
        />
      </div>

      {/* Subcategory selector */}
      <div style={{ flex: 1 }}>
        <SelectField
          label="Subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          options={subcategories.map((sub) => ({ value: sub, label: sub }))}
          disabled={!subcategories.length} // Disable subcategory if no options available
        />
      </div>
    </div>
  );
};

export default CategorySelector;
