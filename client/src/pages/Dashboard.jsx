import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import ImageInput from '../components/ImageInput';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config';

// Schema configurations for CRUD sections
const SCHEMAS = {
  hero: {
    title: 'Hero Section',
    api: `${API_BASE}/api/hero`,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'imageUrl', label: 'Image', type: 'image', required: true },
      { name: 'buttonText', label: 'Button Text', type: 'text', required: true }
    ],
    columns: [
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description' }
    ]
  },
  about: {
    title: 'About Project',
    api: `${API_BASE}/api/about`,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'imageUrl', label: 'Image', type: 'image', required: true }
    ],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description' }
    ]
  },
  services: {
    title: 'Services',
    api: `${API_BASE}/api/services`,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true }
    ],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description' }
    ]
  },
  properties: {
    title: 'Properties / Floor Plans',
    api: `${API_BASE}/api/properties`,
    fields: [
      { name: 'propertyName', label: 'Property Name', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text', required: true },
      { name: 'price', label: 'Price', type: 'text', required: true },
      { name: 'bedrooms', label: 'Bedrooms', type: 'number', required: true },
      { name: 'bathrooms', label: 'Bathrooms', type: 'number', required: true },
      { name: 'area', label: 'Area (e.g. 450 sq.ft)', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'imageUrl', label: 'Image', type: 'image', required: true }
    ],
    columns: [
      { key: 'propertyName', label: 'Name' },
      { key: 'price', label: 'Price' },
      { key: 'area', label: 'Area' },
      { key: 'bedrooms', label: 'Bedrooms' }
    ]
  },
  projects: {
    title: 'Projects / Gallery',
    api: `${API_BASE}/api/projects`,
    fields: [
      { name: 'projectName', label: 'Project Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'imageUrl', label: 'Image', type: 'image', required: true }
    ],
    columns: [
      { key: 'projectName', label: 'Project Name' },
      { key: 'description', label: 'Description' }
    ]
  },
  contact: {
    title: 'Contact Details',
    api: `${API_BASE}/api/contact`,
    fields: [
      { name: 'address', label: 'Address', type: 'textarea', required: true },
      { name: 'phone', label: 'Phone', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true }
    ],
    columns: [
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address' }
    ]
  }
};

function Dashboard() {
  return (
    <div className="flex bg-beige-light min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/:section" element={<DashboardContent />} />
          <Route path="/" element={<Navigate to="/admin/hero" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const isCustomSection = section === 'inquiries';

  const schema = SCHEMAS[section];
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Auth headers for write operations
  const authHeaders = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  // Fetch list data (inquiries require auth; other sections are public)
  const loadData = async () => {
    setLoading(true);
    try {
      const apiEndpoint = isCustomSection 
        ? `${API_BASE}/api/inquiries` 
        : schema?.api;
        
      if (!apiEndpoint) return;
      // GET /api/inquiries is protected — pass auth token
      const res = isCustomSection
        ? await axios.get(apiEndpoint, authHeaders())
        : await axios.get(apiEndpoint);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    setFormOpen(false);
    setEditItem(null);
    setFormData({});
    setSubmitError('');
  }, [section]);

  const handleOpenAdd = () => {
    const initialForm = {};
    schema.fields.forEach(f => {
      initialForm[f.name] = f.type === 'number' ? 0 : '';
    });
    setFormData(initialForm);
    setEditItem(null);
    setSubmitError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormData({ ...item });
    setEditItem(item);
    setSubmitError('');
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const apiEndpoint = isCustomSection 
        ? `${API_BASE}/api/inquiries/${id}` 
        : `${schema.api}/${id}`;
        
      await axios.delete(apiEndpoint, authHeaders());
      loadData();
    } catch (err) {
      if (err.response?.status === 401) { logout(); return; }
      alert('Error deleting record: ' + err.message);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    try {
      if (editItem) {
        // PUT update
        await axios.put(`${schema.api}/${editItem._id}`, formData, authHeaders());
      } else {
        // POST create
        await axios.post(schema.api, formData, authHeaders());
      }
      setFormOpen(false);
      loadData();
    } catch (err) {
      if (err.response?.status === 401) { logout(); return; }
      setSubmitError(err.response?.data?.message || 'Error processing request.');
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center space-y-4">
        <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-xs uppercase font-bold tracking-widest text-primary/70">Fetching items...</span>
      </div>
    );
  }

  // Handle inquiry page separately
  if (isCustomSection) {
    return (
      <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-accent/25 pb-4">
          <div>
            <h1 className="text-primary text-2xl font-bold tracking-tight uppercase">Customer Inquiries</h1>
            <p className="text-primary/60 text-xs mt-1">Review contact requests submitted from the landing page form.</p>
          </div>
        </div>

        <div className="bg-white border border-accent/20 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-primary text-white uppercase tracking-wider font-semibold">
                <th className="p-4 border-r border-primary-light/20">Name</th>
                <th className="p-4 border-r border-primary-light/20">Email</th>
                <th className="p-4 border-r border-primary-light/20">Phone</th>
                <th className="p-4 border-r border-primary-light/20">Message</th>
                <th className="p-4 border-r border-primary-light/20">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/15">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id} className="hover:bg-beige-light/40 transition-colors text-primary">
                    <td className="p-4 border-r border-accent/10 font-bold">{item.name}</td>
                    <td className="p-4 border-r border-accent/10">{item.email}</td>
                    <td className="p-4 border-r border-accent/10">{item.phone}</td>
                    <td className="p-4 border-r border-accent/10 font-light leading-relaxed max-w-md break-all">{item.message}</td>
                    <td className="p-4 border-r border-accent/10 whitespace-nowrap">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 font-bold uppercase tracking-wider"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-primary/50 italic">
                    No client inquiries have been received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!schema) {
    return <div className="p-12 text-center text-red-600">Invalid CMS Section.</div>;
  }

  return (
    <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-accent/25 pb-4">
        <div>
          <h1 className="text-primary text-2xl font-bold tracking-tight uppercase">{schema.title}</h1>
          <p className="text-primary/60 text-xs mt-1">Manage database records directly for this web section.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
        >
          Add New Item
        </button>
      </div>

      {formOpen ? (
        <div className="bg-white border border-accent/20 p-8 shadow-sm space-y-6">
          <h3 className="text-primary text-lg font-bold uppercase tracking-wider border-b border-accent/15 pb-2">
            {editItem ? 'Edit Item' : 'Add New Item'}
          </h3>
          
          {submitError && (
            <div className="p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs rounded-sm">
              {submitError}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {schema.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-primary/70 mb-1">
                  {field.label} {field.required && '*'}
                </label>
                {field.type === 'image' ? (
                  <ImageInput
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleFormChange}
                    token={token}
                    required={field.required}
                  />
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    rows={4}
                    value={formData[field.name] || ''}
                    onChange={handleFormChange}
                    className="w-full bg-beige-light border border-accent/25 px-4 py-2.5 text-xs focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name] ?? ''}
                    onChange={handleFormChange}
                    className="w-full bg-beige-light border border-accent/25 px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                  />
                )}
              </div>
            ))}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 text-xs uppercase font-bold tracking-widest transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="bg-beige hover:bg-beige-dark text-primary border border-accent/25 px-6 py-3 text-xs uppercase font-bold tracking-widest transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-accent/20 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-primary text-white uppercase tracking-wider font-semibold">
                {schema.columns.map((col) => (
                  <th key={col.key} className="p-4 border-r border-primary-light/20">
                    {col.label}
                  </th>
                ))}
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/15">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id} className="hover:bg-beige-light/40 transition-colors text-primary">
                    {schema.columns.map((col) => {
                      const val = item[col.key];
                      const isImage = typeof val === 'string' && (
                        val.startsWith('http') ||
                        val.startsWith('/uploads/') ||
                        val.includes('.jpg') ||
                        val.includes('.png') ||
                        val.includes('.webp')
                      );
                      const imgSrc = typeof val === 'string' && val.startsWith('/uploads/')
                        ? `${API_BASE}${val}`
                        : val;
                      return (
                        <td key={col.key} className="p-4 border-r border-accent/10 max-w-sm truncate">
                          {isImage ? (
                            <img src={imgSrc} alt="preview" className="h-10 w-16 object-cover border border-accent/20" />
                          ) : (
                            String(val || '')
                          )}
                        </td>
                      );
                    })}
                    <td className="p-4 space-x-3">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-accent hover:text-primary font-bold uppercase tracking-wider"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 font-bold uppercase tracking-wider"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={schema.columns.length + 1} className="p-8 text-center text-primary/50 italic">
                    No records found. Click 'Add New Item' to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
