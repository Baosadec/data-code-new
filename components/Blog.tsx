import React from 'react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "Cách chọn hướng nhà hợp tuổi 2025",
      excerpt: "Năm Ất Tỵ 2025 là năm Hỏa, việc chọn hướng nhà cần chú ý đến các yếu tố phong thủy đặc biệt...",
      image: "https://picsum.photos/400/250?random=1",
      date: "10/12/2024"
    },
    {
      title: "Ý nghĩa ngày lễ Tết Hạ Nguyên",
      excerpt: "Tết Hạ Nguyên (Rằm tháng 10) là ngày lễ quan trọng để cầu an, cầu siêu cho người đã khuất...",
      image: "https://picsum.photos/400/250?random=2",
      date: "05/11/2024"
    },
    {
      title: "Văn khấn mùng 1 hàng tháng chuẩn nhất",
      excerpt: "Tổng hợp các bài văn khấn nôm truyền thống dùng cho ngày mùng 1 và ngày rằm...",
      image: "https://picsum.photos/400/250?random=3",
      date: "01/11/2024"
    },
     {
      title: "Sao Thái Bạch năm 2025 chiếu mệnh nào?",
      excerpt: "Sao Thái Bạch là sao xấu nhất trong hệ thống cửu diệu, cần lưu ý những điều sau...",
      image: "https://picsum.photos/400/250?random=4",
      date: "28/10/2024"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Kiến Thức Phong Thủy & Đời Sống</h2>
        <p className="text-gray-600">Cập nhật những thông tin hữu ích mỗi ngày</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
            <div className="h-48 overflow-hidden">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="text-xs text-green-600 font-semibold mb-2">{post.date}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2 hover:text-green-600 cursor-pointer line-clamp-2">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
              <button className="text-green-600 text-sm font-semibold hover:underline">Đọc thêm →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
