import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/home/HeroSection';
import Integration from '@/components/home/Integration';
import React from 'react';

const page = () => {
  return (
    <div className="w-full ">
      <Navbar />
      <HeroSection />
      <Integration />
      <Footer />
    </div>
  );
}

export default page;
