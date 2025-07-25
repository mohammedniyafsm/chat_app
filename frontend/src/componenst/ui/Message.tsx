import type { ReactElement } from "react"

interface ButttonProps {
    variant : "primary" | "secondary",
    size    :  "xs" | "sm" | "md" | "lg",
    startIcon ?: ReactElement,
    endIcon ?: ReactElement,
    text    : string,
    onclick ?: ()=>void,
}


const sizeStyle = {
  xs: "py-1.5 px-3 text-sm",
  sm: "py-1.5 px-4 sm:text-sm text-xs",
  md: "py-2 px-6 sm:text-base text-sm",
  lg: "py-2 w-96 sm:text-base text-sm"
};

const variantStyle = {
    primary : "bg-black text-white border border-gray-200 hover:bg-gray-900",
    secondary : "bg-green-500 text-white border border-gray-200 hover:bg-green-400",
}

const baseStyle = "m-2 flex  justify-center items-center font-center font-medium rounded-md cursor-pointer transition-colors duration-200 font-inter"


export const Message =({
    variant,
    size,
    startIcon,
    endIcon,
    onclick,
    text
 }: ButttonProps)=>{
    return (
      <button onClick={onclick} className={` ${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]}`} >
        {startIcon && <span className="pr-2">{startIcon}</span>}
        {text}
        {endIcon && <span className="pr-2">{endIcon}</span>}
      </button>
    )
}