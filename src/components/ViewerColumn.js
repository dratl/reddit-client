import React from 'react';

const ViewerColumn = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 min-h-[80vh]">
      {children}
    </div>
  );
};

export default ViewerColumn;