import React, { useState, useEffect } from 'react';
import '../styles/DocumentUpload.css';

const DocumentUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/documents') // Gọi API từ backend
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error('Error fetching documents:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Vui lòng chọn một file pdf!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const newDocument = await response.json();
      setDocuments((prev) => [...prev, newDocument]);
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="document-upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      <div className="uploaded-documents">
        <h2>Đăng tải tài liệu của bạn</h2>
        {documents.length > 0 ? (
          <ul>
            {documents.map((doc, index) => (
              <li key={index} className="document-item">
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <embed
                  src={doc.fileUrl}
                  type="application/pdf"
                  width="700"
                  height="400"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
