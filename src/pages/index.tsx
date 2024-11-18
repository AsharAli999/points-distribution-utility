import { useState } from 'react';
import { PointsSDK } from 'points-distribution-sdk';
import { Toaster } from 'react-hot-toast';
import { ApiKeyForm } from '../components/ApiKeyForm';
import { DistributePointsForm } from '../components/DistributePointsForm';
import { PointsLookup } from '../components/PointsLookup';

export default function Home() {
  const [activeTab, setActiveTab] = useState('generateApiKey');

  const renderContent = () => {
    switch (activeTab) {
      case 'generateApiKey':
        return <ApiKeyForm />;
      case 'distributePoints':
        return <DistributePointsForm />;
      case 'pointsLookup':
        return <PointsLookup />;
      default:
        return <ApiKeyForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Points Distribution System
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('generateApiKey')}
              className={`w-1/3 py-4 px-4 text-center ${
                activeTab === 'generateApiKey'
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-600'
              } font-medium hover:text-indigo-600`}
            >
              Generate API Key
            </button>
            <button
              onClick={() => setActiveTab('distributePoints')}
              className={`w-1/3 py-4 px-4 text-center ${
                activeTab === 'distributePoints'
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-600'
              } font-medium hover:text-indigo-600`}
            >
              Distribute Points
            </button>
            <button
              onClick={() => setActiveTab('pointsLookup')}
              className={`w-1/3 py-4 px-4 text-center ${
                activeTab === 'pointsLookup'
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-600'
              } font-medium hover:text-indigo-600`}
            >
              Points Lookup
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
