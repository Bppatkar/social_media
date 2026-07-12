const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL!,
};
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Socket URL:', process.env.NEXT_PUBLIC_SOCKET_URL);

export default env;