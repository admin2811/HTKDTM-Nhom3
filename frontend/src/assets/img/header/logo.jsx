import React from 'react';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Hình tròn màu cam */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#FF7235"/>
      </svg>
      
      {/* Icon bên trong hình tròn */}
      <ImportContactsOutlinedIcon style={{ fontSize: 24, color: 'white', position: 'absolute' }} />
      
      {/* Tên "Eduweb" */}
      <span style={{ fontSize: '1.5rem', fontWeight: 'bold' , color: '#FF7235'}}>Eduweb</span>
    </div>
  );
};

export default Logo;
