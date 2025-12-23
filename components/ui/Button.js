export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 active:scale-95 transform';
  
  const variants = {
    primary: 'bg-gold-600 text-white hover:bg-gold-700 hover:shadow-lg focus:ring-gold-300 disabled:bg-gray-400 hover:scale-105',
    secondary: 'bg-white text-gold-600 border-2 border-gold-600 hover:bg-gold-50 hover:shadow-lg focus:ring-gold-300 hover:scale-105',
    outline: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:shadow-lg focus:ring-gray-300 hover:scale-105',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-300 hover:scale-105',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg focus:ring-green-300 hover:scale-105',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
