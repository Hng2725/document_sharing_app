import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{backgroundColor: '#eaebc2'}}>
      <h2 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px'}}>Welcome to Document Sharing PTIT</h2>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Slider {...settings}>
          <div>
            <img 
              src="/CNTT.jpg" 
              alt="Image 1" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
            />
          </div>
          <div>
            <img 
              src="/maxresdefault (1).jpg" 
              alt="Image 2" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
            />
          </div>
          <div>
            <img 
              src="/maxresdefault.jpg" 
              alt="Image 3" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
            />
          </div>
        </Slider>
      </div>

      {/* Mô tả và ảnh */}
      <div style={{ width: '80%', margin: '20px auto', textAlign: 'justify' }}>
        <img 
          src="/Krystal-Banner-003.jpg"
          alt="Description Image" 
          style={{
            width: '300px',
            height: 'auto',
            float: 'left',
            marginRight: '20px',
            borderRadius: '10px',
          }}
        />
        <p style={{ fontSize: '20px'}}>
        Document Sharing PTIT là một nền tảng trực tuyến được thiết kế dành riêng cho sinh viên và giảng viên tại
        Học viện Công nghệ Bưu chính Viễn thông. Trang web này cung cấp một không gian tiện lợi để tham khảo và chia sẻ tài 
        liệu học tập thuộc các môn học đại cương, kỹ thuật, và chuyên ngành. Với mục tiêu hỗ trợ cộng đồng học thuật, 
        Document Sharing PTIT không chỉ giúp người dùng tiết kiệm thời gian tìm kiếm tài liệu mà còn tạo điều kiện kết nối
        và trao đổi kiến thức hiệu quả. Các tài liệu được đăng tải trên trang đều được phân loại rõ ràng, dễ dàng tìm kiếm và 
        đáp ứng nhu cầu học tập đa dạng của người dùng.
        </p>
      </div>

      <div style={{ width: '80%', margin: '50px auto', textAlign: 'justify' }}>
        <img 
          src="/anh_home_page.jpg"
          alt="Description Image" 
          style={{
            width: '300px',
            height: 'auto',
            float: 'right',
            marginLeft: '20px',
            borderRadius: '10px',
          }}
        />
        <p style={{ fontSize: '20px'}}>
        Document Sharing PTIT là một nền tảng trực tuyến được thiết kế dành riêng cho sinh viên và giảng viên tại
        Học viện Công nghệ Bưu chính Viễn thông. Trang web này cung cấp một không gian tiện lợi để tham khảo và chia sẻ tài 
        liệu học tập thuộc các môn học đại cương, kỹ thuật, và chuyên ngành. Với mục tiêu hỗ trợ cộng đồng học thuật, 
        Document Sharing PTIT không chỉ giúp người dùng tiết kiệm thời gian tìm kiếm tài liệu mà còn tạo điều kiện kết nối
        và trao đổi kiến thức hiệu quả. Các tài liệu được đăng tải trên trang đều được phân loại rõ ràng, dễ dàng tìm kiếm và 
        đáp ứng nhu cầu học tập đa dạng của người dùng.
        </p>
      </div>
    </div>
  );
};

export default Home;
