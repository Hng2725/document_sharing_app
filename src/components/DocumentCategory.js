import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DocumentCategory.css';

const DocumentCategory = () => {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isSpecializedOpen, setIsSpecializedOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isUserUploadOpen, setIsUserUploadOpen] = useState(false);
  const [isProgrammingOpen, setIsProgrammingOpen] = useState(false);
  
  const basicTimeoutRef = useRef(null);
  const specializedTimeoutRef = useRef(null);
  const securityTimeoutRef = useRef(null);
  const userUploadTimeoutRef = useRef(null);
  const programmingTimeoutRef = useRef(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (basicTimeoutRef.current) clearTimeout(basicTimeoutRef.current);
      if (specializedTimeoutRef.current) clearTimeout(specializedTimeoutRef.current);
      if (securityTimeoutRef.current) clearTimeout(securityTimeoutRef.current);
      if (userUploadTimeoutRef.current) clearTimeout(userUploadTimeoutRef.current);
      if (programmingTimeoutRef.current) clearTimeout(programmingTimeoutRef.current);
    };
  }, []);

  const closeAllExcept = (exceptState) => {
    if (exceptState !== 'basic') setIsBasicOpen(false);
    if (exceptState !== 'specialized') setIsSpecializedOpen(false);
    if (exceptState !== 'security') setIsSecurityOpen(false);
    if (exceptState !== 'userUpload') setIsUserUploadOpen(false);
    if (exceptState !== 'programming') setIsProgrammingOpen(false);
  };

  const toggleBasic = () => {
    setIsBasicOpen(!isBasicOpen);
    closeAllExcept('basic');
  };
  
  const toggleSpecialized = () => {
    setIsSpecializedOpen(!isSpecializedOpen);
    closeAllExcept('specialized');
  };

  const toggleSecurity = () => {
    setIsSecurityOpen(!isSecurityOpen);
    closeAllExcept('security');
  };

  const toggleUserUpload = () => {
    setIsUserUploadOpen(!isUserUploadOpen);
    closeAllExcept('userUpload');
  };

  const toggleProgramming = () => {
    setIsProgrammingOpen(!isProgrammingOpen);
    closeAllExcept('programming');
  };

  const handleMouseEnter = (timeoutRef) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseLeave = (timeoutRef, setIsOpen) => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleTopicSelect = (category, type) => {
    navigate(`/document/${category}/${type}`);
  };

  return (
    <div className="document-category">
      <div className="category-container">
        {/* Danh mục Cơ bản */}
        <div className="category">
          <h3 onClick={toggleBasic} className={`category-header ${isBasicOpen ? 'active' : ''}`}>
            Cơ bản
            <span className={`arrow ${isBasicOpen ? 'down' : ''}`}>▸</span>
          </h3>
          {isBasicOpen && (
            <ul 
              className="subcategory-list"
              onMouseEnter={() => handleMouseEnter(basicTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(basicTimeoutRef, setIsBasicOpen)}
            >
              <li onClick={() => handleTopicSelect('basic', 'philosophy')}>
                Triết học Mac-Lenin
              </li>
              <li onClick={() => handleTopicSelect('basic', 'political_economy')}>
                Kinh tế chính trị
              </li>
              <li onClick={() => handleTopicSelect('basic', 'law')}>
                Pháp luật đại cương
              </li>
            </ul>
          )}
        </div>

        {/* Danh mục Chuyên ngành */}
        <div className="category">
          <h3 onClick={toggleSpecialized} className={`category-header ${isSpecializedOpen ? 'active' : ''}`}>
            Chuyên ngành
            <span className={`arrow ${isSpecializedOpen ? 'down' : ''}`}>▸</span>
          </h3>
          {isSpecializedOpen && (
            <ul 
              className="subcategory-list"
              onMouseEnter={() => handleMouseEnter(specializedTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(specializedTimeoutRef, setIsSpecializedOpen)}
            >
              <li onClick={() => handleTopicSelect('specialized', 'mysql')}>
                Cơ sở dữ liệu
              </li>
              <li onClick={() => handleTopicSelect('specialized', 'react')}>
                Lập trình Web
              </li>
              <li onClick={() => handleTopicSelect('specialized', 'media')}>
                Công nghệ đa phương tiện
              </li>
            </ul>
          )}
        </div>

        {/* Danh mục An toàn và bảo mật */}
        <div className="category">
          <h3 onClick={toggleSecurity} className={`category-header ${isSecurityOpen ? 'active' : ''}`}>
            An toàn và bảo mật
            <span className={`arrow ${isSecurityOpen ? 'down' : ''}`}>▸</span>
          </h3>
          {isSecurityOpen && (
            <ul 
              className="subcategory-list"
              onMouseEnter={() => handleMouseEnter(securityTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(securityTimeoutRef, setIsSecurityOpen)}
            >
              <li onClick={() => handleTopicSelect('security', 'basic_it')}>
                Tin học cơ sở
              </li>
              <li onClick={() => handleTopicSelect('security', 'operating_system')}>
                Hệ điều hành
              </li>
              <li onClick={() => handleTopicSelect('security', 'network_security')}>
                An toàn mạng máy tính
              </li>
            </ul>
          )}
        </div>

        {/* Danh mục Ngôn ngữ lập trình */}
        <div className="category">
          <h3 onClick={toggleProgramming} className={`category-header ${isProgrammingOpen ? 'active' : ''}`}>
            Ngôn ngữ lập trình
            <span className={`arrow ${isProgrammingOpen ? 'down' : ''}`}>▸</span>
          </h3>
          {isProgrammingOpen && (
            <ul 
              className="subcategory-list"
              onMouseEnter={() => handleMouseEnter(programmingTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(programmingTimeoutRef, setIsProgrammingOpen)}
            >
              <li onClick={() => handleTopicSelect('programming', 'python')}>
                Python
              </li>
              <li onClick={() => handleTopicSelect('programming', 'cpp')}>
                C++
              </li>
              <li onClick={() => handleTopicSelect('programming', 'java')}>
                Java
              </li>
            </ul>
          )}
        </div>

        {/* Danh mục Người dùng đăng tải */}
        <div className="category">
          <h3 onClick={toggleUserUpload} className={`category-header ${isUserUploadOpen ? 'active' : ''}`}>
            Người dùng đăng tải
            <span className={`arrow ${isUserUploadOpen ? 'down' : ''}`}>▸</span>
          </h3>
          {isUserUploadOpen && (
            <ul 
              className="subcategory-list"
              onMouseEnter={() => handleMouseEnter(userUploadTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(userUploadTimeoutRef, setIsUserUploadOpen)}
            >
              <li onClick={() => handleTopicSelect('user_upload', 'other_docs')}>
                Tài liệu tham khảo khác
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCategory;