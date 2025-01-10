import React, { useEffect, useRef } from 'react';
import { embedDashboard } from "@superset-ui/embedded-sdk";

const SupersetDashboard = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    // Kiểm tra containerRef.current có phải là null không trước khi gọi embedDashboard
    if (containerRef.current) {
      embedDashboard({
        id: '07493a36-64c7-48ac-90e5-72d8ff7998e7', // ID của dashboard từ UI của Superset
        supersetDomain: 'http://ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com/', // Domain của Superset
        mountPoint: containerRef.current, // Gắn vào phần tử HTML này
        fetchGuestToken: () =>
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJmaXJzdF9uYW1lIjoiYWRtaW4iLCJsYXN0X25hbWUiOiJhZG1pbiJ9LCJyZXNvdXJjZXMiOlt7InR5cGUiOiJkYXNoYm9hcmQiLCJpZCI6IjA3NDkzYTM2LTY0YzctNDhhYy05MGU1LTcyZDhmZjc5OThlNyJ9XSwicmxzX3J1bGVzIjpbXSwiaWF0IjoxNzM2NDM1NzU2LjY0NDE4MDgsImV4cCI6MTczNjQzNjA1Ni42NDQxODA4LCJhdWQiOiJodHRwOi8vMC4wLjAuMDo4MDgwLyIsInR5cGUiOiJndWVzdCJ9.ywP-a6Fddl05tQ7fw_Qql4tkyBrcDeKoCiXCIYNjJ6I', // Token khách
        dashboardUiConfig: {} // Cấu hình UI tùy chọn
      });
    }
  }, [containerRef]);
  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
      {/* Nếu bạn muốn sử dụng iframe, có thể để lại iframe như này */}
      {/* <iframe
        width="600"
        height="400"
        seamless
        frameBorder="0"
        scrolling="no"
        src="http://ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com/superset/explore/p/eJ13rpekyLR/?standalone=1&height=400"
      ></iframe> */}
    </div>
  );
};

export default SupersetDashboard;
