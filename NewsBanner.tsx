import React from "react";
import { ChevronRight } from "lucide-react";

interface NewsBannerProps {
  title: string;
  description: string;
  imageUrl: string;
}

const NewsBanner: React.FC<NewsBannerProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="w-full group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 mb-6">
      <img
        src={imageUrl}
        alt={title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "default-image.jpg";
        }}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 mb-4 line-clamp-2">
          {description}
        </p>
        <button
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          aria-label="Read more about this news"
        >
          <span>Read more</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default NewsBanner;