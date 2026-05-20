const VARIANT_CLASSES = {
  primary: 'bg-[#1a2332] hover:bg-[#243447] text-white',
  danger:  'bg-red-600 hover:bg-red-700 text-white',
  warning: 'bg-orange-500 hover:bg-orange-600 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  teal:    'bg-teal-600 hover:bg-teal-700 text-white',
  blue:    'bg-blue-500 hover:bg-blue-600 text-white',
  outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
};

export default function ActionButton({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  children,
  type = 'button',
  className = '',
}) {
  const variantCls = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;
  const sizeCls = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variantCls} ${sizeCls} ${className}`}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
