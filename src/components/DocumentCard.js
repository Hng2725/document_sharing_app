import React from 'react';
import '../styles/DocumentCard.css';

const DocumentCard = ({ document }) => {
  return (
    <div className="document-card">
      <h3>{document.title}</h3>
      <p>{document.description}</p>
      <button>View</button>
    </div>
  );
};

export default DocumentCard;
