import React, { useState } from 'react';
import TeacherList from './TeacherList';
import TeacherPositionList from './TeacherPositionList';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('teachers');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'teachers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Danh sách Giáo viên
            </button>
            <button
              onClick={() => setActiveTab('positions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'positions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vị trí công tác
            </button>
          </nav>
        </div>
      </div>

      <div>
        {activeTab === 'teachers' && <TeacherList />}
        {activeTab === 'positions' && <TeacherPositionList />}
      </div>
    </div>
  );
};

export default Navigation;