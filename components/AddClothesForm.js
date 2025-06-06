import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { X, Upload, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { HexColorPicker } from 'react-colorful';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  category: Yup.string().required('Category is required'),
  brand: Yup.string().required('Brand is required'),
  sizeType: Yup.string().required('Size type is required'),
  size: Yup.string().required('Size is required'),
  price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
  color: Yup.string().required('Color is required'),
  tags: Yup.array().of(Yup.string()),
  image: Yup.string().when('uploadType', {
    is: 'link',
    then: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    otherwise: Yup.string()
  }),
});

const sizeOptions = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  shoes: Array.from({ length: 15 }, (_, i) => (i + 6).toString()), // US 6-20
  accessories: Array.from({ length: 20 }, (_, i) => (i + 1).toString()), // 1-20
};

export default function AddClothesForm({ isOpen, onClose, onSubmit }) {
  const [uploadType, setUploadType] = useState('upload');
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickerColor, setPickerColor] = useState("#ffffff");
  const [availableColors, setAvailableColors] = useState([
    'white', 'gray', 'black', 'red', 'blue', 'green', 'yellow', 'pink'
  ]);
  
  // Convert arrays to react-select format
  const [brandOptions, setBrandOptions] = useState([
    { value: 'Nike', label: 'Nike' },
    { value: 'Adidas', label: 'Adidas' },
    { value: 'H&M', label: 'H&M' },
    { value: 'Zara', label: 'Zara' },
    { value: 'Gymshark', label: 'Gymshark' }
  ]);

  const [tagOptions, setTagOptions] = useState([
    { value: 'Spring', label: 'Spring' },
    { value: 'Smart', label: 'Smart' },
    { value: 'Modern', label: 'Modern' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Formal', label: 'Formal' }
  ]);

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

  const handleFileUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFieldValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = (url, setFieldValue) => {
    setImagePreview(url);
    setFieldValue('image', url);
  };

  const handleAddCustomColor = () => {
    if (pickerColor && !availableColors.includes(pickerColor)) {
      setAvailableColors([...availableColors, pickerColor]);
      setShowColorPicker(false);
      setPickerColor("#ffffff");
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '0.5rem',
      borderColor: '#E5E7EB',
      minHeight: '42px',
      '&:hover': {
        borderColor: '#E5E7EB'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#10B981' : state.isFocused ? '#F3F4F6' : 'white',
      '&:active': {
        backgroundColor: '#10B981'
      }
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#F3F4F6',
      borderRadius: '9999px',
      padding: '2px'
    }),
    multiValueLabel: (base) => ({
      ...base,
      fontSize: '0.875rem'
    }),
    multiValueRemove: (base) => ({
      ...base,
      ':hover': {
        backgroundColor: '#E5E7EB',
        color: '#4B5563'
      },
      borderRadius: '9999px'
    })
  };

  const initialValues = {
    name: '',
    category: '',
    brand: '',
    sizeType: '',
    size: '',
    price: 50,
    color: '',
    tags: [],
    image: '',
    uploadType: uploadType,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-[480px] bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-2xl font-semibold">Add Clothes</h2>
            <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <p className="mb-6 text-gray-600">Fill in the necessary items</p>

            {/* Upload Type Tabs */}
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg border p-1">
              <button
                type="button"
                className={`rounded-md py-2 text-center ${
                  uploadType === 'upload' ? 'bg-gray-100 font-medium' : ''
                }`}
                onClick={() => setUploadType('upload')}
              >
                Upload
              </button>
              <button
                type="button"
                className={`rounded-md py-2 text-center ${
                  uploadType === 'link' ? 'bg-gray-100 font-medium' : ''
                }`}
                onClick={() => setUploadType('link')}
              >
                Embed Link
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className="space-y-6">
                  {/* Image Upload/URL Field */}
                  {uploadType === 'upload' ? (
                    <div>
                      <label className="mb-1 block text-sm">Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, setFieldValue)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-gray-50"
                      >
                        <div className="space-y-1">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <span className="block text-sm font-medium text-green-600">Upload File</span>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label className="mb-1 block text-sm">Image URL</label>
                      <Field
                        name="image"
                        type="url"
                        placeholder="Insert Image Url"
                        className="w-full rounded-lg border px-4 py-2"
                        onChange={(e) => handleImageUrl(e.target.value, setFieldValue)}
                      />
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm">Name</label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Type Name"
                      className="w-full rounded-lg border px-4 py-2"
                    />
                  </div>

                  {/* Category Field */}
                  <div>
                    <label htmlFor="category" className="mb-1 block text-sm">Category</label>
                    <Field
                      id="category"
                      as="select"
                      name="category"
                      className="w-full rounded-lg border px-4 py-2"
                    >
                      <option value="">Choose Category</option>
                      <option value="tops">Tops</option>
                      <option value="bottoms">Bottoms</option>
                      <option value="shoes">Shoes</option>
                      <option value="accessories">Accessories</option>
                    </Field>
                  </div>

                  {/* Brand Field with Creatable Select */}
                  <div>
                    <label htmlFor="brand" className="mb-1 block text-sm">Brand</label>
                    <CreatableSelect
                      id="brand"
                      name="brand"
                      options={brandOptions}
                      onChange={(newValue) => {
                        setFieldValue('brand', newValue.value);
                        if (!brandOptions.find(opt => opt.value === newValue.value)) {
                          setBrandOptions([...brandOptions, newValue]);
                        }
                      }}
                      styles={customStyles}
                      placeholder="Select or create brand"
                      formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                    />
                  </div>

                  {/* Size Type Field */}
                  <div>
                    <label htmlFor="sizeType" className="mb-1 block text-sm">Size Type</label>
                    <Field
                      id="sizeType"
                      as="select"
                      name="sizeType"
                      className="w-full rounded-lg border px-4 py-2"
                      onChange={(e) => {
                        setFieldValue('sizeType', e.target.value);
                        setFieldValue('size', ''); // Reset size when type changes
                      }}
                    >
                      <option value="">Select Size Type</option>
                      <option value="clothing">Clothing (XS-XXL)</option>
                      <option value="shoes">Shoes (US)</option>
                      <option value="accessories">Accessories</option>
                    </Field>
                  </div>

                  {/* Dynamic Size Field */}
                  <div>
                    <label htmlFor="size" className="mb-1 block text-sm">Size</label>
                    <Field
                      id="size"
                      as="select"
                      name="size"
                      className="w-full rounded-lg border px-4 py-2"
                      disabled={!values.sizeType}
                    >
                      <option value="">Select Size</option>
                      {values.sizeType && sizeOptions[values.sizeType].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Field>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="mb-1 block text-sm">Price</label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">$0</span>
                      <span className="text-sm text-gray-500">$100</span>
                    </div>
                    <Field
                      type="range"
                      name="price"
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="mb-1 block text-sm">Color</label>
                    <div className="relative">
                      <div className="grid grid-cols-8 gap-2">
                        {availableColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`h-8 w-8 rounded-full ${
                              values.color === color ? 'ring-2 ring-offset-2 ring-green-500' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setFieldValue('color', color)}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => setShowColorPicker(true)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-gray-300 hover:border-gray-400"
                        >
                          <Plus className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Color Picker Popover */}
                      {showColorPicker && (
                        <div className="absolute right-0 top-10 z-10 rounded-lg border bg-white p-4 shadow-lg">
                          <div className="mb-4">
                            <HexColorPicker color={pickerColor} onChange={setPickerColor} />
                          </div>
                          <div className="flex justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => setShowColorPicker(false)}
                              className="flex-1 rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddCustomColor}
                              className="flex-1 rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-500"
                            >
                              Add Color
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags with Creatable Select */}
                  <div>
                    <label htmlFor="tags" className="mb-1 block text-sm">Tags</label>
                    <CreatableSelect
                      isMulti
                      id="tags"
                      name="tags"
                      options={tagOptions}
                      value={values.tags.map(tag => ({ value: tag, label: tag }))}
                      onChange={(newValue) => {
                        const tags = newValue.map(item => item.value);
                        setFieldValue('tags', tags);
                        // Add any new tags to options
                        newValue.forEach(item => {
                          if (!tagOptions.find(opt => opt.value === item.value)) {
                            setTagOptions([...tagOptions, item]);
                          }
                        });
                      }}
                      styles={customStyles}
                      placeholder="Select or create tags"
                      formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-2 font-medium text-white hover:bg-green-500"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
} 