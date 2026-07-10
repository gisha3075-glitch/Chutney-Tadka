import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { RatingBadge } from '../common/RatingBadge';
import { handleImageError } from '../../lib/images';

export function RestaurantCard({ restaurant }) {
  const { id, name, image, rating, reviewCount, deliveryTime, costForTwo, offer, cuisines, promoted, pureVeg } = restaurant;

  return (
    <Link to={`/restaurant/${id}`} className="block group">
      {/* 16:9 image with gradient overlay */}
      <div className="relative w-full overflow-hidden rounded-2xl aspect-video bg-gray-200">
        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Offer text */}
        {offer && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-white font-extrabold text-base sm:text-lg drop-shadow-lg tracking-tight">
              {offer}
            </span>
          </div>
        )}
        {/* Promoted badge */}
        {promoted && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
            Promoted
          </div>
        )}
        {/* Pure Veg badge */}
        {pureVeg && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-green-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-600" />
            Pure Veg
          </div>
        )}
      </div>

      {/* Info below image */}
      <div className="mt-3 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight group-hover:text-brand-500 transition-colors line-clamp-1">
            {name}
          </h3>
          <RatingBadge rating={rating} />
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
          {cuisines.join(' • ')}
        </p>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            <span className="font-medium">{deliveryTime}</span>
          </div>
          <span className="font-medium">₹{costForTwo} for two</span>
        </div>
      </div>
    </Link>
  );
}
