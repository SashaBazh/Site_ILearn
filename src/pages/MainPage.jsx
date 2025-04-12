import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';

const MainPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {isMobileMenuOpen && <div className="mobile-menu-overlay"></div>}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      <Content />
    </> 
  );
};

export default MainPage;