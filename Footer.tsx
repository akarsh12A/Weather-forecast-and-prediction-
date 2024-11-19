import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 px-6 lg:px-12 space-y-10 transition-all duration-500 ease-in-out transform hover:shadow-lg border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left animate-fadeIn">
        {/* Contact Info */}
        <div className="space-y-3 transform transition duration-300 ease-in-out hover:-translate-y-1">
          <h2 className="text-lg font-semibold text-white">Contact Us</h2>
          <p className="flex items-center justify-center md:justify-start space-x-2">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-blue-500 transition-transform transform hover:scale-125"
            />
            <span>Team: QuantWeather</span>
          </p>
          <p className="flex items-center justify-center md:justify-start space-x-2">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-blue-500 transition-transform transform hover:scale-125"
            />
            <span>Dhruv <br />Akarsh <br />Hemanth <br />Zayn</span>
          </p>
          <p className="flex items-center justify-center md:justify-start space-x-2">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-blue-500 transition-transform transform hover:scale-125"
            />
            <span>info@quantweather.com</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 transform transition duration-300 ease-in-out hover:-translate-y-1">
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li className="transition-transform transform hover:translate-x-1 hover:text-blue-400">
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="transition-transform transform hover:translate-x-1 hover:text-blue-400">
              <a href="#services" className="hover:underline">
                Our Services
              </a>
            </li>
            <li className="transition-transform transform hover:translate-x-1 hover:text-blue-400">
              <a href="#blog" className="hover:underline">
                Blog
              </a>
            </li>
            <li className="transition-transform transform hover:translate-x-1 hover:text-blue-400">
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="space-y-3 transform transition duration-300 ease-in-out hover:-translate-y-1">
          <h2 className="text-lg font-semibold text-white">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-125"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-125"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-125"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-125"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>&copy; 2024 QuantWeather. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
