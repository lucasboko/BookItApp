
import { RefObject } from 'react'
import './Input.css'

type InputProps = {
    inputRef?: RefObject<HTMLInputElement>

    label?: string
    initialValue?: string
    id?: string
    name?: string
    type?: string
    autoComplete?: string

    value?: string | number
    onChange: (val: string) => void;
    onFocus?: () => void
    error?: string

    leftLabel?: boolean
    placeholder?: string
    leftIcon?: React.ReactElement | null
    rightIcon?: React.ReactElement | null

    readOnly?: boolean
    className?: string

    width?: string
}

export const Input = (props: InputProps) => {

    const {
        inputRef,

        label,
        id,
        name,
        type,
        autoComplete,
        readOnly,
        onChange,
        onFocus,
        value,
        error,

        leftLabel,
        placeholder,
        leftIcon,
        rightIcon,

        width,
        className,

    } = props;

    return (
        <div className={`${width || "w-65"} justify-self-center ${className}`} >
            {!leftLabel && <div className='text-left text-sm font-medium pb-1 pl-2 text-emerald-600'>{label}</div>}
            <div className={`pl-4 pr-4 py-2 rounded-full border-1 ${error ? 'border-red-700' : 'border-gray-300'}`}>
                <div className="flex flex-row">
                    {leftLabel && <div className='text-left text-sm font-medium text-emerald-600'>{label}</div>}
                    {leftIcon && <div className="w-[25px]">{leftIcon}</div>}
                    <input
                        ref={inputRef}
                        id={id}
                        name={name}
                        type={type || "text"}
                        autoComplete={autoComplete || "off"}
                        placeholder={placeholder}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        readOnly={readOnly}
                        onFocus={onFocus}
                        className="pl-2 grow color-black outline-0 bg-white fill-white text-sm grow"
                    />
                    {rightIcon && <div className="w-[25px]">{rightIcon}</div>}
                </div>
            </div>
            {error && <div className="text-xs text-red-700 pl-[10px]">{error}</div>}
        </div>
    )
}