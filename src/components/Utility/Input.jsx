import { useId, forwardRef } from "react";

const Input=forwardRef(
    function Input({
        label, type='text', className='', ...props
    },ref){
        const id= useId()
        return (
            <div className='w-full'>
                {label && <label htmlFor={id} className='inline-block mb-1 pl-1'> {label}</label>}
                <input
                    id={id}
                    type={type}
                    ref={ref}
                    className={`w-full px-4 py-2 border border-[#d1d75a47] rounded-md focus:ring focus:ring-[#d1d75a47] focus:outline-none ${className}`}
                    {...props}/>
            </div>
        )
    }
)
export default Input