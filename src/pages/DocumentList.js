import React, { useEffect, useState } from 'react';
import DocumentCard from '../components/DocumentCard';
import DocumentCategory from '../components/DocumentCategory';


const DocumentList = () => {
  return (
    <div className="document-list">
      <h2>Danh sách tài liệu</h2>
      <DocumentCategory />
      {/* Nội dung khác của danh sách tài liệu */}
    </div>
  );
};

export default DocumentList;

