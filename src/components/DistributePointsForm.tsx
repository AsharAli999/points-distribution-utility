import { useState } from 'react';
import { PointsSDK } from 'points-distribution-sdk';
import toast from 'react-hot-toast';

export function DistributePointsForm() {
    const [eventName, setEventName] = useState('');
    const [address, setAddress] = useState('');
    const [points, setPoints] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const apiKey = localStorage.getItem('apiKey');
      
      if (!apiKey) {
        toast.error('Please generate an API key first');
        return;
      }
  
      try {
        const sdk = new PointsSDK(apiKey);
        await sdk.distribute(eventName, [
          { address, points: Number(points) }
        ]);
        toast.success('Points distributed successfully!');
        setEventName('');
        setAddress('');
        setPoints('');
      } catch (error) {
        toast.error('Failed to distribute points');
      }
    };
  
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Distribute Points</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Points
            </label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Distribute Points
          </button>
        </form>
      </div>
    );
  }