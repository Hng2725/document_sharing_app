import React from 'react';
import DocumentCategory from './DocumentCategory';
import '../styles/DocumentLayout.css';

const DocumentLayout = () => {
  return (
    <div className="document-layout">
      <div className="document-sidebar">
        <DocumentCategory />
      </div>
      <div className="document-content">
        <div className="welcome-message">
          Vui lòng chọn một chủ đề từ danh mục
        </div>
      </div>
    </div>
  );
};

export default DocumentLayout;