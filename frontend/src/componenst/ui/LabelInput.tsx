import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  heading?: string;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputProps>(
  ({ heading, className, ...props }, ref) => {
    return (
      <div className="mt-1">
        {heading && (
          <label className="font-medium font-inter sm:text-base text-sm">
            {heading}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={`w-full rounded-md border border-gray-200 px-2 py-2 sm:text-base text-xs sm:mt-2 sm:mb-2 shadow-sm bg-white text-black focus:outline-none ${className ?? ""}`}
        />
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
