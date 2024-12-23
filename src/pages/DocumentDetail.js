import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Comment.css';

const PDF_MAPPING = {
  basic: {
    philosophy: '/Triethoc.pdf',
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
    other_docs: '/default.jpg',
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
  
  // State cho comments
  const [currentComment, setCurrentComment] = useState('');
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        
        // Load comments từ localStorage
        const savedComments = localStorage.getItem(`comments-${category}-${type}`);
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        }

        // Lấy username từ đăng nhập
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
          setUserName(loggedInUser);
          setIsLoggedIn(true);
        }
      } catch (err) {
        setError(err.message);
        setPdfUrl('/default.jpg');
      } finally {
        setLoading(false);
      }
    };

    loadPdfUrl();
  }, [category, type]);

  const handleSubmitComment = () => {
    if (!currentComment.trim() || !userName.trim()) return;

    const newComment = {
      id: Date.now(),
      userName: userName,
      text: currentComment,
      timestamp: new Date().toLocaleString('vi-VN')
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    
    // Lưu comments vào localStorage
    localStorage.setItem(`comments-${category}-${type}`, JSON.stringify(updatedComments));
    
    // Reset cmt
    setCurrentComment('');
  };

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
    <div className="document-container">
      <div className="document-header">
        <h2 className="document-title">{DISPLAY_NAMES[category]?.[type] || type}</h2>
        <p className="document-category">Danh mục: {CATEGORY_NAMES[category] || category}</p>
      </div>
      
      <div className="document-viewer">
        <iframe 
          src={pdfUrl} 
          width="100%" 
          height="800px"
          className="document-iframe"
          title={`${CATEGORY_NAMES[category]} - ${DISPLAY_NAMES[category]?.[type]}`}
        />
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Bình luận</h3>
        
        {isLoggedIn ? (
          <div className="comment-form">
            <div className="form-group">
              <label htmlFor="userName" className="form-label">
                Tên của bạn
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                disabled
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="comment" className="form-label">
                Nội dung bình luận <span className="required">*</span>
              </label>
              <textarea
                id="comment"
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                className="form-textarea"
                placeholder="Viết bình luận của bạn..."
              />
            </div>
            
            <button
              onClick={handleSubmitComment}
              disabled={!currentComment.trim()}
              className="submit-button"
            >
              Gửi bình luận
            </button>
          </div>
        ) : (
          <div className="login-prompt">
            <p>Vui lòng <a href="/login">đăng nhập</a> để bình luận.</p>
          </div>
        )}

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="user-avatar">
                <span>
                    {comment && comment.username
                      ? comment.userName.charAt(0).toUpperCase()
                      : ""}
                  </span>
                </div>
                <div className="comment-info">
                  <h4 className="user-name">{comment.userName}</h4>
                  <p className="comment-time">{comment.timestamp}</p>
                </div>
              </div>
              <div className="comment-content">
                <p>{comment.text}</p>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="no-comments">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;