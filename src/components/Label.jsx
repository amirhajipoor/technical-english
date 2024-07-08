import React from "react"

export default function Label({ children, title, ...attributes })
{
   return (
      <label className="block font-medium text-sm text-slate-700" {...attributes}>{children ?? title}</label>
   )
}