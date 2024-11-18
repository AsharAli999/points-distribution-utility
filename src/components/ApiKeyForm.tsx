import { useState } from 'react';
import { PointsSDK } from 'points-distribution-sdk';
import toast from 'react-hot-toast';

export function ApiKeyForm() {
  const [projectName, setProjectName] = useState('');
  const [projectEmail, setProjectEmail] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const registration = await PointsSDK.register(projectName, projectEmail);
      setApiKey(registration.apiKey);
      toast.success('API Key generated successfully!');
      localStorage.setItem('apiKey', registration.apiKey);
    } catch (error) {
      toast.error('Failed to generate API key');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {/* <FaKey className="text-indigo-600" /> */}
        Generate API Key
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Email
          </label>
          <input
            type="email"
            value={projectEmail}
            onChange={(e) => setProjectEmail(e.target.value)}
            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate API Key
        </button>
      </form>

      {apiKey && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Your API Key
          </label>
          <div className="mt-2 flex justify-between items-center">
            <code className="text-sm text-black bg-gray-100 p-2 rounded">{apiKey}</code>
            <button
              onClick={() => navigator.clipboard.writeText(apiKey)}
              className="text-sm text-indigo-600 hover:underline"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}