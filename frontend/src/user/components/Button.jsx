// src/components/Button.jsx
export default function Button({ children, variant = "default", size = "md", className = "", ...props }) {
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border-2 border-current bg-transparent hover:bg-indigo-600 hover:text-white"
  };
  
  return (
    <button
      className={`font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}