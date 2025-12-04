import React, { useState } from 'react';
import { checkCompatibility } from '../services/geminiService';

const LoveFortune: React.FC = () => {
  const [name1, setName1] = useState('');
  const [date1, setDate1] = useState('');
  const [name2, setName2] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!name1 || !date1 || !name2 || !date2) return;
    setLoading(true);
    const res = await checkCompatibility(name1, date1, name2, date2);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden">
        <div className="bg-pink-500 p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">💘 Bói Duyên Tình Yêu</h2>
          <p className="opacity-90">Xem mức độ hòa hợp giữa bạn và người ấy</p>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
               <div className="text-center font-bold text-pink-500 border-b pb-2 mb-4">Người thứ nhất (Nam/Nữ)</div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                 <input 
                   type="text" 
                   value={name1}
                   onChange={(e) => setName1(e.target.value)}
                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                   placeholder="Nguyễn Văn A"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                 <input 
                   type="date" 
                   value={date1}
                   onChange={(e) => setDate1(e.target.value)}
                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                 />
               </div>
            </div>

            <div className="space-y-4">
               <div className="text-center font-bold text-pink-500 border-b pb-2 mb-4">Người thứ hai (Nam/Nữ)</div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                 <input 
                   type="text" 
                   value={name2}
                   onChange={(e) => setName2(e.target.value)}
                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                   placeholder="Trần Thị B"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                 <input 
                   type="date" 
                   value={date2}
                   onChange={(e) => setDate2(e.target.value)}
                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                 />
               </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={handleCheck}
              disabled={loading || !name1 || !name2 || !date1 || !date2}
              className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-pink-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? 'Đang kết nối vũ trụ...' : 'Xem Kết Quả'}
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-pink-50 rounded-xl border border-pink-100">
               <h3 className="font-bold text-xl text-pink-700 mb-4 text-center">Kết Quả Phân Tích</h3>
               <div className="prose prose-pink max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                 {result}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoveFortune;
