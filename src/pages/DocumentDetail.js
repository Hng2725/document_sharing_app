import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PDF_MAPPING = {
  basic: {
    philosophy: '/Triet.pdf',
    political_economy: '/Kinhte.pdf',
    law: '/Phapluat.pdf',
  },
  specialized: {
    mysql: '/MySQL.pdf',
    react: '/React.pdf',
    media: '/Dapt.pdf',
  },
  security: {
    basic_it: '/Tinhoc.pdf',
    operating_system: '/Hedieuhanh.pdf',
    network_security: '/Antoan.pdf',
  },
  programming: {
    python: '/Python.pdf',
    cpp: '/C++.pdf',
    java: '/Java.pdf',
  },
  user_upload: {
    other_docs: '/TaiLieuThamKhao.pdf',
  }
};

const DISPLAY_NAMES = {
  basic: {
    philosophy: 'Triết học Mac-Lenin',
    political_economy: 'Kinh tế chính trị',
    law: 'Pháp luật đại cương',
  },
  specialized: {
    mysql: 'Cơ sở dữ liệu',
    react: 'Lập trình Web',
    media: 'Công nghệ đa phương tiện',
  },
  security: {
    basic_it: 'Tin học cơ sở',
    operating_system: 'Hệ điều hành',
    network_security: 'An toàn mạng máy tính',
  },
  programming: {
    python: 'Python',
    cpp: 'C++',
    java: 'Java',
  },
  user_upload: {
    other_docs: 'Tài liệu tham khảo khác',
  }
};

const CATEGORY_NAMES = {
  basic: 'Cơ bản',
  specialized: 'Chuyên ngành',
  security: 'An toàn và bảo mật',
  programming: 'Ngôn ngữ lập trình',
  user_upload: 'Người dùng đăng tải'
};

const DocumentDetail = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category, type } = useParams();

  useEffect(() => {
    const loadPdfUrl = () => {
      setLoading(true);
      setError(null);

      try {
        if (!PDF_MAPPING[category]) {
          throw new Error(`Danh mục "${CATEGORY_NAMES[category] || category}" không tồn tại`);
        }

        if (!PDF_MAPPING[category][type]) {
          throw new Error(
            `Môn học "${DISPLAY_NAMES[category]?.[type] || type}" không tồn tại trong danh mục "${CATEGORY_NAMES[category]}"`
          );
        }

        setPdfUrl(PDF_MAPPING[category][type]);
      } catch (err) {
        setError(err.message);
        setPdfUrl('/default.jpg');
      } finally {
        setLoading(false);
      }
    };

    loadPdfUrl();
  }, [category, type]);

  if (loading) {
    return (
      <div className="document-loading">
        <div className="loader"></div>
        <p>Đang tải tài liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="document-error">
        <p>{error}</p>
        <p>Đang hiển thị tài liệu mặc định</p>
      </div>
    );
  }

  return (
    <div className="document-detail">
      <div className="document-header">
        <h2>{DISPLAY_NAMES[category]?.[type] || type}</h2>
        <p>Danh mục: {CATEGORY_NAMES[category] || category}</p>
      </div>
      
      <div className="document-viewer">
        <iframe 
          src={pdfUrl} 
          width="100%" 
          height="800px"
          style={{
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          title={`${CATEGORY_NAMES[category]} - ${DISPLAY_NAMES[category]?.[type]}`}
        />
      </div>
    </div>
  );
};

export default DocumentDetail;