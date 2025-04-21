import React, { useEffect, useState, useMemo } from 'react';

const SpecialSaleBanner = () => {
  // Set waktu target countdown
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bubbles = useMemo(() => (
    [...Array(5)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: `${Math.random() * 10 + 5}rem`,
          height: `${Math.random() * 10 + 5}rem`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5,
        }}
      />
    ))
  ), []);

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden rounded-lg shadow-lg mb-5">
      {/* Static background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {bubbles}
        </div>
      </div>

      <div className="relative z-10 px-6 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side */}
          <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
            <span className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-blue-800 text-xs font-bold tracking-wide mb-3">
              EXCLUSIVE OFFER
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Summer Collection
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                40% OFF
              </span>
              <span className="text-lg font-semibold text-blue-200">
                + Free Shipping
              </span>
            </div>

            <p className="text-blue-100 max-w-md">
              Refresh your summer wardrobe with our latest arrivals. Limited time only.
            </p>
          </div>

          {/* Right Side - Timer */}
          <div className="md:ml-8">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="text-center mb-2">
                <span className="text-sm font-medium text-blue-100">Sale Ends In</span>
              </div>

              <div className="flex justify-center space-x-3">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="bg-blue-800 bg-opacity-60 rounded-lg w-14 h-14 flex items-center justify-center mb-1 backdrop-blur-sm">
                      <span className="text-2xl font-bold">{item.value}</span>
                    </div>
                    <span className="text-xs text-blue-100">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialSaleBanner;
