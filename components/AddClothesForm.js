import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object({
  name: Yup.string().required('Item name is required'),
  brand: Yup.string().required('Brand is required'),
  price: Yup.number().min(0, 'Price must be positive').nullable(),
  size: Yup.string().required('Size is required'),
  color: Yup.string().required('Color is required'),
  tags: Yup.array().min(1, 'At least one tag is required'),
  image: Yup.string().url('Must be a valid URL').nullable(),
});

export default function AddClothesForm({ isOpen, onClose, onSubmit, isSliding, editItem = null }) {
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);
  const isEditing = editItem !== null;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Set image preview when editing
  useEffect(() => {
    if (editItem?.image) {
      setImagePreview(editItem.image);
    } else {
      setImagePreview('');
    }
    setImageError(false);
  }, [editItem]);

  const handleImagePreview = async (url) => {
    if (!url) {
      setImagePreview('');
      setImageError(false);
      return;
    }

    try {
      // Test if the image loads successfully
      const img = new Image();
      img.onload = () => {
        setImagePreview(url);
        setImageError(false);
      };
      img.onerror = () => {
        setImagePreview('');
        setImageError(true);
      };
      img.src = url;
    } catch (error) {
      setImagePreview('');
      setImageError(true);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(`👔 ${isEditing ? 'Updating' : 'Submitting'} clothing item:`, values);
      
      // Format the data
      const formData = {
        ...values,
        price: values.price ? parseFloat(values.price) : null,
        image: values.image || null,
        tags: values.tags || []
      };

      let response;
      if (isEditing) {
        // Update existing item
        response = await fetch(`/api/clothes/${editItem.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new item
        response = await fetch('/api/clothes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${isEditing ? 'update' : 'add'} clothing item`);
      }

      const newItem = await response.json();
      console.log(`✅ Successfully ${isEditing ? 'updated' : 'added'}:`, newItem);
      
      onSubmit(newItem, isEditing);
      resetForm();
      setImagePreview('');
      onClose();
    } catch (error) {
      console.error(`❌ Error ${isEditing ? 'updating' : 'adding'} clothing:`, error);
      alert(error.message || `Failed to ${isEditing ? 'update' : 'add'} clothing item. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const initialValues = editItem ? {
    name: editItem.name || '',
    brand: editItem.brand || '',
    price: editItem.price || '',
    size: editItem.size || '',
    color: editItem.color || '',
    tags: editItem.tags || [],
    image: editItem.image || '',
  } : {
    name: '',
    brand: '',
    price: '',
    size: '',
    color: '',
    tags: [],
    image: '',
  };

  const tagOptions = ['Modern', 'Spring', 'Fall', 'Summer', 'Winter', 'Casual', 'Formal'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = ['white', 'gray', 'black', 'red', 'blue', 'green', 'yellow', 'pink'];

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isSliding ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Slide-in panel */}
      <div 
        className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSliding ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">
              {isEditing ? 'Edit Clothing Item' : 'Add Clothes'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 p-6">
            <p className="text-gray-600 mb-6">
              {isEditing ? 'Update the details for this item' : 'Fill in the necessary items'}
            </p>
            
            <Formik
              key={editItem?.id || 'new'} // Force re-render when editItem changes
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Image Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <div className="space-y-2">
                      <Field
                        name="image"
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="https://example.com/image.jpg"
                        onChange={(e) => {
                          setFieldValue('image', e.target.value);
                          handleImagePreview(e.target.value);
                        }}
                      />
                      {imageError && (
                        <p className="text-red-500 text-sm">Invalid image URL</p>
                      )}
                      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <ImageIcon className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Blue Denim Jacket"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Brand Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <Field
                      as="select"
                      name="brand"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Brand</option>
                      {['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Gap'].map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="brand" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Size Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <Field
                      as="select"
                      name="size"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Size</option>
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="size" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Price Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <Field
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFieldValue('color', color)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            values.color === color
                              ? 'border-green-500 ring-2 ring-green-200'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Tags Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tagOptions.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const newTags = values.tags.includes(tag)
                              ? values.tags.filter(t => t !== tag)
                              : [...values.tags, tag];
                            setFieldValue('tags', newTags);
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            values.tags.includes(tag)
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <ErrorMessage name="tags" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting 
                        ? (isEditing ? 'Updating...' : 'Adding...') 
                        : (isEditing ? 'Update Item' : 'Add Item')
                      }
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
} 