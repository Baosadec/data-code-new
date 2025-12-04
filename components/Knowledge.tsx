import React from 'react';

const Knowledge: React.FC = () => {
  const categories = [
    {
      title: "Phong Thủy Nhà Ở",
      icon: "🏠",
      articles: ["Cách xem hướng nhà hợp tuổi", "Bố trí phòng bếp hút tài lộc", "Cây phong thủy nên trồng trước nhà"]
    },
    {
      title: "Văn Khấn Cổ Truyền",
      icon: "🙏",
      articles: ["Văn khấn mùng 1 hàng tháng", "Văn khấn ngày rằm", "Văn khấn tạ mộ cuối năm"]
    },
    {
      title: "Sao Hạn & Tử Vi",
      icon: "⭐",
      articles: ["Bảng sao hạn năm 2025", "Cách cúng dâng sao giải hạn", "Tuổi Tam Tai năm Ất Tỵ"]
    },
    {
      title: "Phong Tục Tập Quán",
      icon: "🏮",
      articles: ["Ý nghĩa ngày Tết Hàn Thực", "Lễ cúng ông Công ông Táo", "Tục lệ xông đất đầu năm"]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Kho Tàng Kiến Thức</h1>
        <p className="opacity-90 text-lg">Phong thủy, Tâm linh & Văn hóa Việt Nam</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl">
                   {cat.icon}
                 </div>
                 <h3 className="text-xl font-bold text-gray-800">{cat.title}</h3>
              </div>
              <ul className="space-y-3">
                {cat.articles.map((article, aIdx) => (
                  <li key={aIdx} className="flex items-center text-gray-600 hover:text-green-600 cursor-pointer group">
                    <svg className="w-4 h-4 mr-2 text-green-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="text-sm font-medium">{article}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-right">
               <button className="text-sm text-green-700 font-semibold hover:underline">Xem tất cả &rarr;</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Featured Quote or Tip */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
         <h4 className="text-yellow-800 font-bold mb-2 uppercase text-sm tracking-wide">Lời khuyên hôm nay</h4>
         <p className="text-gray-700 italic text-lg">"Tâm an vạn sự an, tâm động vạn sự phiền. Hãy giữ tâm thái bình thản trước mọi biến cố của cuộc đời."</p>
      </div>
    </div>
  );
};

export default Knowledge;
