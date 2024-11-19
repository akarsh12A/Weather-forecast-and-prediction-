import React from "react";
import { ChevronRight } from "lucide-react";

const About: React.FC = () => {
  const aboutDetails = [
    {
      title: "Quantum Computing in Weather Forecasting",
      description:
        "Discover how quantum algorithms enhance accuracy and precision in weather forecasting, unlocking possibilities that were previously unimaginable.",
      imageUrl:
        "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Quantum Neural Networks",
      description:
        "Learn about advanced quantum neural networks used to simulate complex atmospheric patterns and predict weather with unmatched accuracy.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQejqeOTu2lsLDSNB6gpc8xcghYFUA2dqAJGQ&s",
    },
    {
      title: "Backend Powered by Flask",
      description:
        "Understand how Flask powers the backend infrastructure, seamlessly integrating quantum technologies with user interfaces.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS7A9gjFpvumkChG3RNh3NFhPAX98i6DCYEw&s",
    },
  ];

  return (
    <div className="max-w-full mx-auto px-4 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
        About QuantaWeather
      </h1>

      {/* Introduction Section */}
      <div className="mb-12 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          QuantaWeather leverages cutting-edge technologies to transform weather forecasting. Combining the power of quantum computing, quantum neural networks, and a robust backend powered by Flask, we aim to revolutionize climate modeling and provide unparalleled precision in predicting extreme weather events.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Our approach bridges the gap between technology and science, creating a platform that offers actionable insights for shaping effective climate policies and responding to a changing world.
        </p>
      </div>

      {/* Original Content */}
      <div className="space-y-8 mb-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Revolutionizing Climate Modeling
        </h2>
        <div className="flex justify-center items-center space-x-6">
          <img
            src="https://cdn.pixabay.com/photo/2021/11/08/17/09/iceberg-6779681_1280.jpg"
            alt="Climate change illustration"
            className="w-full md:w-3/4 lg:w-1/2 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-7xl mx-auto px-4">
          As the impacts of climate change intensify, the demand for more accurate and efficient climate modeling has become critical. Traditional models, constrained by the limitations of classical computing, often struggle to accurately simulate the complex interactions within the Earth's climate systems.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12">
          Harnessing Quantum Power
        </h2>
        <div className="flex justify-center items-center space-x-6">
          <img
            src="https://t3.ftcdn.net/jpg/09/31/29/96/240_F_931299620_Mf7uXB0njxwG74C9cosuVzmhKpkqk0wt.jpg"
            alt="Quantum computing illustration"
            className="w-full md:w-3/4 lg:w-1/2 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-7xl mx-auto px-4">
          QuantaWeather seeks to overcome these challenges by harnessing the power of quantum computing to revolutionize climate prediction. Utilizing quantum algorithms, QuantaWeather aims to model climate dynamics with unprecedented precision, enabling more accurate predictions of extreme weather events and offering valuable insights for shaping effective climate policies.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12">
          A Fusion of Technology and Science
        </h2>
        <div className="flex justify-center items-center space-x-6">
          <img
            src="https://media.istockphoto.com/id/1466134653/photo/nuclear-fusion-power-generator-concept-image-3d-rendering.jpg?s=612x612&w=0&k=20&c=qzZq29f0lziHSb8-Kvbq8jv8rbAkYVuVlDLiKI0carI="
            alt="Technology and science fusion illustration"
            className="w-full md:w-3/4 lg:w-1/2 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-7xl mx-auto px-4">
          This project represents a groundbreaking fusion of quantum technology and climate science, poised to enhance our understanding of climate change and inform better decision-making in a rapidly changing world.
        </p>
      </div>

      {/* About Details (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutDetails.map((item, index) => (
          <div
            key={index}
            className="w-full group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://via.placeholder.com/300";
              }}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 mb-4 line-clamp-2">
                {item.description}
              </p>
              <button
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                aria-label={`Read more about ${item.title}`}
              >
                <span>Read more</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
