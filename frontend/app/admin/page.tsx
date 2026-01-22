"use client";
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';

const AdminDashboard = () => {
  const [sweets, setSweets] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newSweet, setNewSweet] = useState({ name: '', price: '', stock: '', category: 'Traditional', description: 'Delicious sweet' });

  const fetchSweets = async () => {
    try {
      const { data } = await api.get('/sweets');
      setSweets(data);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleAddSweet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/sweets', newSweet);
      fetchSweets();
      setIsFormOpen(false);
      setNewSweet({ name: '', price: '', stock: '', category: 'Traditional', description: 'Delicious sweet' });
    } catch (error) {
      console.error('Error adding sweet:', error);
      alert('Failed to add sweet');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await api.delete(`/sweets/${id}`);
        fetchSweets();
      } catch (error) {
        console.error('Error deleting sweet:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-beige py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-primary-maroon mb-8">Admin Dashboard</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Product Management</h2>
            <button 
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-primary-green text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              {isFormOpen ? 'Cancel' : 'Add New Sweet'}
            </button>
          </div>

          {isFormOpen && (
            <form onSubmit={handleAddSweet} className="mb-6 p-4 border rounded bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                 <input 
                   type="text" 
                   placeholder="Name" 
                   className="p-2 border rounded" 
                   value={newSweet.name} 
                   onChange={e => setNewSweet({...newSweet, name: e.target.value})} 
                   required
                 />
                 <input 
                   type="number" 
                   placeholder="Price" 
                   className="p-2 border rounded" 
                   value={newSweet.price} 
                   onChange={e => setNewSweet({...newSweet, price: e.target.value})} 
                   required
                 />
                 <input 
                   type="number" 
                   placeholder="Stock" 
                   className="p-2 border rounded" 
                   value={newSweet.stock} 
                   onChange={e => setNewSweet({...newSweet, stock: e.target.value})} 
                   required
                 />
              </div>
              <button type="submit" className="bg-primary-maroon text-white px-4 py-2 rounded">Save</button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sweets.map(sweet => (
                  <tr key={sweet._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{sweet.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{sweet.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sweet.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(sweet._id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
