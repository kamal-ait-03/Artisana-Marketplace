import PropTypes from 'prop-types';

const CategoryBadge = ({ category, className = '' }) => {
  const badgeColors = {
    carpets: 'bg-amber-100 text-amber-800 border-amber-200',
    pottery: 'bg-orange-100 text-orange-800 border-orange-200',
    leather: 'bg-stone-200 text-yellow-900 border-yellow-300',
    clothing: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    decoration: 'bg-purple-100 text-purple-800 border-purple-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const categoryNames = {
    carpets: 'Tapis',
    pottery: 'Poterie',
    leather: 'Cuir',
    clothing: 'Vêtements',
    decoration: 'Décoration',
  };

  const colorClass = badgeColors[category] || badgeColors.default;
  const displayName = categoryNames[category] || category;

  return (
    <span className={`font-accent text-[10px] tracking-wider uppercase px-2 py-1 rounded border ${colorClass} ${className}`}>
      {displayName}
    </span>
  );
};

CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default CategoryBadge;
