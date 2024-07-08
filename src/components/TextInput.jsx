import React from "react";

export default function TextInput({ className, ...props }) {
	return (
		<input
			className={`text-slate-700 border border-slate-300 px-4 py-2 rounded-lg shadow-sm ${className}`}
			type="text"
			{...props}
		/>
	);
}
