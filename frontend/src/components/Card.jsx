/**
 * Reusable Card component designed with Tailwind CSS
 * @param {object} props
 * @param {string} props.title - The title of the card
 * @param {string} props.description - Brief description text
 * @param {string} [props.image] - Optional image URL path
 * @param {React.ReactNode} [props.action] - Optional action button or element
 */
function Card({ title, description, image, action }) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-white/5 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-black/30 hover:border-white/10 hover:shadow-violet-600/5 transition-all duration-300">
      {/* Optional Card Image */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden border-b border-white/5 bg-slate-950">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
          />
        </div>
      )}

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-6 text-left">
        <h3 className="text-lg font-bold text-white mb-2 font-heading tracking-tight">
          {title}
        </h3>
        
        <p className="flex-1 text-sm text-gray-400 leading-relaxed mb-6">
          {description}
        </p>

        {/* Optional Action Button/Link */}
        {action && (
          <div className="mt-auto pt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
