function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-3 text-xl cursor-pointer hover:bg-[#d1d75a47] rounded-lg bg-[${bgColor}] ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;