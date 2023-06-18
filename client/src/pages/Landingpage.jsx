import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Landingpage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Deutsch');
  const dropdownRef = useRef(null);

  const navigate = useNavigate()

  const navigateme = () => {
    navigate("/signup")
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    // Hier kannst du zusätzliche Logik hinzufügen, um die Zustimmung zu speichern oder andere Aktionen auszuführen
  };

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countdownDate = new Date('2023-09-01'); // Setze das Datum, auf das der Countdown enden soll
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        // Hier kannst du die Animation oder Reaktion auslösen, wenn der Countdown abgelaufen ist
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const availableLanguages = ['Deutsch', 'English', 'Español', 'Français'];

  return (
    <div className="flex h-screen bg-gradient-to-b from-rose-500 via-pink-300 to-purple-500 p-6">
      <div className="flex h-full w-full bg-[#F7F7F7]/50  p-4 rounded-xl">
        {!isAccepted && (
          <div
            className="absolute bottom-0 left-0 w-full bg-white p-4 text-center"
            style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
          >
            <p>
              Diese Website verwendet Cookies, um Ihnen ein besseres Nutzererlebnis zu bieten. Durch die Nutzung dieser
              Website stimmen Sie unserer Verwendung von Cookies zu.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-700"
              onClick={handleAccept}
            >
              Cookies akzeptieren
            </button>
          </div>
        )}

        <div className="flex flex-col p-2 border-2 border-[#F7F7F7] w-full rounded-xl">
          <div className="mb-2 p-2">
            <div className="relative">
              <button
                className="p-2 bg-[#F7F7F7] text-pink-500 font-bold rounded-lg transition duration-300 hover:bg-blue-700"
                onClick={toggleDropdown}
              >
                {selectedLanguage}
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg"
                  style={{ width: '200px', maxHeight: '200px', overflow: 'auto' }}
                >
                  <ul className="p-2">
                    {availableLanguages.map((language) => (
                      <li
                        key={language}
                        className="mb-2 cursor-pointer"
                        onClick={() => handleLanguageSelection(language)}
                      >
                        {language}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

            <div className="flex-1 flex-col p-4">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text">
                        TAMS
                    </h1>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
                        .AI
                    </h1>
                </div>

                <div className="flex flex-col mt-2">
                    <div className="flex justify-center w-full">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
                            Künstliche Intelligenz
                        </h1>
                    </div>

                    <div className="flex justify-center mt-1">
                        <div className="flex flex-col">
                            <h1 className="font-bold bg-gradient-to-r from-pink-700 to-blue-500 text-transparent bg-clip-text">
                                programmiert als Autopilot
                            </h1>
                            <h1 className="flex justify-center font-bold bg-gradient-to-r from-pink-800 to-blue-600 text-transparent bg-clip-text">
                                für Vertriebler.
                            </h1>
                        </div>
                    </div>

                    <h1 className="flex justify-center font-semibold text-3xl mt-6
                    bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
                        Release day
                    </h1>

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex p-5 bg-pink-400">
                            <span className="text-2xl font-bold text-[#F7F7F7]">2023</span>
                        </div>

                        <div className="flex p-5 bg-pink-400">
                            <span className="text-2xl font-bold text-[#F7F7F7]">Sep</span>
                        </div>

                        <div className="flex p-5 bg-pink-400">
                            <span className="text-2xl font-bold text-[#F7F7F7]">01</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                        <form className="w-full">
                            <button onClick={navigateme} className="flex justify-center p-3 w-full bg-pink-500 rounded-xl text-white font-semibold">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>

          <div className="p-4">
            <div
              className={`absolute bottom-0 left-0 w-full bg-white p-4 text-center ${
                isAccepted ? 'hidden' : ''
              }`}
              style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
            >
              <p>
                Diese Website verwendet Cookies, um Ihnen ein besseres Nutzererlebnis zu bieten. Durch die Nutzung dieser
                Website stimmen Sie unserer Verwendung von Cookies zu.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-700"
                onClick={handleAccept}
              >
                Cookies akzeptieren
              </button>
            </div>
          </div>


          <div className="p-2">
            asdasd
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
