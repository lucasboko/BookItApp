import { Slider, styled } from '@mui/material';

const InputSlider = styled(Slider)({
    color: '#52af77',
    height: 5,
    paddingTop: 4,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 10,
        background: 'unset',
        color: '#52af77',
        width: 10,
        height: 5,
    },
});

type InputSliderProps = {
    width?: string
    range: number
    setRange: React.Dispatch<React.SetStateAction<number>>

    step?: number
    min?: number
    max?: number
}

export const RangeSlider = (props: InputSliderProps) => {

    const { width, range, setRange, step, min, max } = props

    const handleChange = (_, newValue: number | number[]) => {
        setRange(newValue as number);
    };

    return <div className={`${width || "w-65"} pl-[10px]`} >
        <div className="flex text-left text-sm font-medium text-emerald-600 ">
            <div className='grow'>
                Range
            </div>
            <div className='w-[55px] text-right'>
                {range} km
            </div>
        </div>
        <div className='mt-[6px]'>
            <InputSlider
                value={range}
                onChange={handleChange}
                step={step || 1}
                min={min || 1}
                max={max || 50}
            />
        </div>
    </div>

}