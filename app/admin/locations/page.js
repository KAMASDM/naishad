'use client';

import { useEffect, useState } from 'react';
import { adminDB } from '@/lib/firestore';

export default function LocationsPage() {
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCityForm, setShowCityForm] = useState(false);
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [cityName, setCityName] = useState('');
  const [areaData, setAreaData] = useState({ name: '', city: '' });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const [citiesData, areasData] = await Promise.all([
        adminDB.getAllCities(),
        adminDB.getAllAreas(),
      ]);
      setCities(citiesData);
      setAreas(areasData);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    try {
      await adminDB.createCity({ name: cityName.trim() });
      setCityName('');
      setShowCityForm(false);
      await fetchLocations();
      alert('City added successfully');
    } catch (error) {
      console.error('Error adding city:', error);
      alert('Failed to add city');
    }
  };

  const handleAddArea = async (e) => {
    e.preventDefault();
    if (!areaData.name.trim() || !areaData.city.trim()) return;

    try {
      await adminDB.createArea(areaData);
      setAreaData({ name: '', city: '' });
      setShowAreaForm(false);
      await fetchLocations();
      alert('Area added successfully');
    } catch (error) {
      console.error('Error adding area:', error);
      alert('Failed to add area');
    }
  };

  const handleDeleteCity = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await adminDB.deleteCity(id);
      await fetchLocations();
      alert('City deleted successfully');
    } catch (error) {
      console.error('Error deleting city:', error);
      alert('Failed to delete city');
    }
  };

  const handleDeleteArea = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await adminDB.deleteArea(id);
      await fetchLocations();
      alert('Area deleted successfully');
    } catch (error) {
      console.error('Error deleting area:', error);
      alert('Failed to delete area');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cities & Areas</h1>
        <p className="text-gray-600 mt-2">Manage locations for property listings</p>
      </div>

      {/* Cities Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Cities</h2>
          <button
            onClick={() => setShowCityForm(!showCityForm)}
            className="px-4 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors"
          >
            {showCityForm ? 'Cancel' : '+ Add City'}
          </button>
        </div>

        {showCityForm && (
          <form onSubmit={handleAddCity} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-3">
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="City name (e.g., Mumbai)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors"
              >
                Add
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center py-8">No cities added yet</p>
          ) : (
            cities.map((city) => (
              <div
                key={city.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">{city.name}</span>
                <button
                  onClick={() => handleDeleteCity(city.id, city.name)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Areas Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Areas</h2>
          <button
            onClick={() => setShowAreaForm(!showAreaForm)}
            className="px-4 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors"
          >
            {showAreaForm ? 'Cancel' : '+ Add Area'}
          </button>
        </div>

        {showAreaForm && (
          <form onSubmit={handleAddArea} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                value={areaData.name}
                onChange={(e) => setAreaData({ ...areaData, name: e.target.value })}
                placeholder="Area name (e.g., Bandra)"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                required
              />
              <select
                value={areaData.city}
                onChange={(e) => setAreaData({ ...areaData, city: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors"
            >
              Add Area
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center py-8">No areas added yet</p>
          ) : (
            areas.map((area) => (
              <div
                key={area.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <span className="font-medium text-gray-900 block">{area.name}</span>
                  <span className="text-sm text-gray-600">{area.city}</span>
                </div>
                <button
                  onClick={() => handleDeleteArea(area.id, area.name)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cities</p>
              <p className="text-3xl font-bold text-gray-900">{cities.length}</p>
            </div>
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Areas</p>
              <p className="text-3xl font-bold text-gray-900">{areas.length}</p>
            </div>
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
