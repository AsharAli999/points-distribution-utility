import { useState } from 'react';
import { PointsSDK } from 'points-distribution-sdk';
import toast from 'react-hot-toast';

export function PointsLookup() {
    const [address, setAddress] = useState('');
    const [eventName, setEventName] = useState('');
    const [results, setResults] = useState<any>(null);
  
    const handleLookup = async (type: 'all' | 'event' | 'total') => {
      const apiKey = localStorage.getItem('apiKey');
      if (!apiKey) {
        toast.error('Please generate an API key first');
        return;
      }
  
      try {
        const sdk = new PointsSDK(apiKey);
        let data;
        
        switch (type) {
          case 'all':
            data = await sdk.getPointsByAddress(address);
            break;
          case 'event':
            data = await sdk.getPointsByAddressAndEvent(address, eventName);
            break;
          case 'total':
            data = await sdk.getTotalPointsByAddress(address);
            break;
        }
        
        setResults(data);
        toast.success('Points retrieved successfully!');
      } catch (error) {
        toast.error('Failed to retrieve points');
      }
    };
  
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Points Lookup</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name (Optional)
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
  
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleLookup('all')}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get All Points
            </button>
            <button
              onClick={() => handleLookup('event')}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Points by Event
            </button>
            <button
              onClick={() => handleLookup('total')}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Total Points
            </button>
          </div>
        </div>
  
        {results && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Results</h3>
            <pre className="bg-gray-50 text-gray-800 p-4 rounded-md overflow-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }