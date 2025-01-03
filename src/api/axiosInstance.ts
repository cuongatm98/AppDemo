import axios from 'axios';

// Khởi tạo một instance Axios
const axiosInstance = axios.create({
  baseURL: 'https://api.pandamall.vn/', // Thay thế bằng URL API của bạn
  timeout: 10000, // Giới hạn thời gian chờ (milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào mọi request
axiosInstance.interceptors.request.use(
  config => {
    // const token = 'YOUR_ACCESS_TOKEN'; // Lấy token từ nơi lưu trữ (AsyncStorage, Redux, v.v.)
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // Thêm header 'dpop'
    config.headers.dpop =
      'OVOBdsvQVsOHeM0eEfuFE5ZWYYdxZvhT019283746!@$&*())*&^&$%#^&89123~';
    return config;
  },
  error => Promise.reject(error),
);

// Interceptor để xử lý lỗi phản hồi
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
