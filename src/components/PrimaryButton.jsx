import React, { Children } from "react";

export default function PrimaryButton({
    className,
    disabled,
    children,
    ...props
}) {
    return (
        <button
            disabled={disabled}
            className={`px-4 py-3 bg-teal-600 hover:bg-teal-600/80 transition-all duration-200 disabled:bg-teal-600/60 text-white text-sm rounded-lg shadow-sm flex items-center justify-center gap-x-2 ${className}`}
            {...props}
        >
            {disabled &&  <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>}
            {children}
        </button>
    );
}
