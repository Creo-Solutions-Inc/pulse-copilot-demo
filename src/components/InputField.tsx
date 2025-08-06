import type React from "react";

interface InputFieldProps {
    label?: string;
    type?: "text" | "email" | "password" | "number" | "time";
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
    multiline?: boolean;
    rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error,
    className = "",
    multiline = false,
    rows = 3,
}) => {
    const baseClasses =
        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-500";
    const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";
    const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white";

    return (
        <div className={`${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    className={`${baseClasses} ${errorClasses} ${disabledClasses} resize-vertical`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
                />
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default InputField;
