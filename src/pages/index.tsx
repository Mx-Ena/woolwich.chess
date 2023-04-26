// components/FullScreenLoader.tsx
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import Hero from '@/components/Hero';

interface FullScreenLoaderProps {
  onLoadingFinished: () => void;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ onLoadingFinished }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
      setShowWelcome(true);
    }, 500); // Show loader for 3 seconds

    setTimeout(() => {
      setShowWelcome(false);
      onLoadingFinished();
    }, 1500); // Show welcome message for another 3 seconds
  }, []);

  return (
    <>
   <Transition
        show={showLoader}
        enter="transition-opacity ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 opacity-95 z-50">
          <div className="loader"></div>
          <style jsx>{`
            .loader {
              border: 4px dashed #f3f3f3;
              border-top: 4px dashed #000;
              border-bottom: 4px dashed #000;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              animation: spin 2s linear infinite;
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      </Transition>
      <Transition
        show={showWelcome}
        enter="transition-opacity ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 opacity-95 z-50">
          <div className="text-white text-3xl">Welcome to Woolwich Chess Club</div>
        </div>
      </Transition>
    </>
  );
};

const Home: React.FC = () => {
  const [loadingFinished, setLoadingFinished] = useState(false);

  const handleLoadingFinished = () => {
    setLoadingFinished(true);
  };

  return (
    <div className="relative bg-gray-900 h-screen flex-col">
      <FullScreenLoader onLoadingFinished={handleLoadingFinished} />
      <Transition
        show={loadingFinished}
        enter="transition-opacity ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Hero />
      </Transition>
    </div>
  );
};

export default Home;
