import { useId, forwardRef } from "react";

function Select({options=[],label,classname='',...props},ref){
    const id=useId();
    return(
        <div className='w-full'>
            {label && <label htmlFor={id} ></label>}
            <select id="id" ref={ref} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${classname}`} {...props}>
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default forwardRef(Select);