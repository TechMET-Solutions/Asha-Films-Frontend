function CastingCard({ 
  image, 
  badge, 
  title, 
  subtitle, 
  description, 
  footer, 
  children 
}) {
  return (
    <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transform transition duration-300 hover:scale-[1.02] hover:border-4 hover:border-primary">
      {/* Image */}
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover"
          />
          {badge && (
            <span className="absolute bottom-2 right-2 bg-white border border-primary text-primary text-xs px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {title && (
          <h2 className="font-semibold text-gray-800 text-sm">{title}</h2>
        )}
        {description && (
          <p className="text-gray-600 text-xs mt-2 line-clamp-3">
            {description}
          </p>
        )}

        {/* Extra Content */}
        {children && <div className="mt-3">{children}</div>}

        {/* Footer (status, buttons, etc.) */}
        {footer && <div className="mt-4 flex justify-between items-center">{footer}</div>}
      </div>
    </div>
  );
}

export default CastingCard;
