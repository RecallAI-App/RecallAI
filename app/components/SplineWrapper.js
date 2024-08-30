"use client";

import Spline from '@splinetool/react-spline/next';

const SplineWrapper = () => {
  return (
    <div>
      <Spline
        scene="https://prod.spline.design/Lgx8o2sXvioJAwOn/scene.splinecode" 
        style={{ width: '100%', height: '100%' }}
        className="lg:scale-100"
      />
    </div>
  );
};

export default SplineWrapper;
