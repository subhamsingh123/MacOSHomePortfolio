import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Sun, Moon, Battery, Wifi, Volume2 } from 'lucide-react';
import Image from 'next/image';

const DesktopIcon = ({ icon, label, initialPosition }) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      initial={initialPosition}
      className="absolute flex flex-col items-center justify-center w-24 h-24 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div onPointerDown={(e) => dragControls.start(e)}>
        {icon}
        <span className="mt-2 text-sm text-white">{label}</span>
      </div>
    </motion.div>
  );
};

const TopBar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center z-20">
      <div>
        {/* Apple logo */}
        <span className="font-bold"></span>
      </div>
      <div className="flex space-x-4">
        <Battery />
        <Wifi />
        <Volume2 />
        <span>{time}</span>
      </div>
    </div>
  );
};

const MacOSHome = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/images/macos-big-sur.jpg"
        alt="macOS Big Sur Wallpaper"
        layout="fill"
        objectFit="cover"
        quality={100}
        className={`${isDark ? 'brightness-75' : 'brightness-100'} transition-all duration-500`}
      />
      <div className="relative z-10">
        <TopBar />
        <div className="relative w-full h-screen pt-12">
          <DesktopIcon
            icon={<div className="w-16 h-16 bg-yellow-500 rounded-lg" />}
            label="Documents"
            initialPosition={{ x: 20, y: 20 }}
          />
          <DesktopIcon
            icon={<div className="w-16 h-16 bg-purple-500 rounded-lg" />}
            label="Applications"
            initialPosition={{ x: 20, y: 120 }}
          />
          {/* Add more desktop icons as needed */}
        </div>
        <motion.button
          className="fixed top-16 right-4 bg-white bg-opacity-20 rounded-full p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun /> : <Moon />}
        </motion.button>
      </div>
    </div>
  );
};

export default MacOSHome;