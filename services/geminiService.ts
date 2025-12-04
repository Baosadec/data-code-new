import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askAssistant = async (prompt: string): Promise<string> => {
  if (!apiKey) return "Vui lòng cấu hình API Key để sử dụng tính năng này.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "Bạn là một trợ lý ảo thông thái về văn hóa, lịch sử, phong thủy và đời sống Việt Nam. Hãy trả lời ngắn gọn, thân thiện và hữu ích. Định dạng văn bản dễ đọc.",
      }
    });
    return response.text || "Xin lỗi, tôi không thể trả lời ngay lúc này.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Đã có lỗi xảy ra khi kết nối với trợ lý ảo.";
  }
};

export const checkCompatibility = async (name1: string, date1: string, name2: string, date2: string): Promise<string> => {
  if (!apiKey) return "Vui lòng cấu hình API Key.";

  const prompt = `
    Hãy đóng vai một chuyên gia bói toán và phong thủy vui vẻ.
    Phân tích độ hợp nhau giữa hai người sau:
    1. Tên: ${name1}, Ngày sinh: ${date1}
    2. Tên: ${name2}, Ngày sinh: ${date2}
    
    Hãy đưa ra:
    - Điểm số hợp nhau (thang 100).
    - Phân tích ngắn gọn về ngũ hành, cung mệnh.
    - Lời khuyên cho mối quan hệ.
    Hãy dùng giọng văn hài hước, tích cực nhưng có vẻ "huyền bí".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Không thể phân tích lúc này.";
  } catch (error) {
    return "Lỗi kết nối.";
  }
};
