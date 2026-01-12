
import { useState } from 'react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers'
import { Input } from '..'
import { useClickOutside } from '../../utilities/useClickOutside'
import { DatePickerProps } from '../../types';

export const DatePicker = (props: DatePickerProps) => {

    const { label, initialValue, width, leftLabel, name, onChange, value, error } = props;

    const [open, setOpen] = useState<boolean>(false)
    const [calValue, setValue] = useState<Dayjs | null>(dayjs(initialValue || new Date()));

    const calendarRef = useClickOutside(() => setOpen(false))

    const datePickerChange = (newValue:Dayjs | null) => {

        onChange(newValue ? newValue.unix().toString() : '')
        setValue(newValue)
    }

    const todayUnix = dayjs(new Date()).unix()
    const formatDate = (val : number) => dayjs.unix(val)?.format('ll')

    return (
        <>
            <div ref={calendarRef} className={width || "w-65"}>
                <Input
                    width="w-full"
                    label={label}
                    leftLabel={leftLabel}
                    name={name}
                    placeholder={value ? formatDate(value) : formatDate(todayUnix)}
                    value={value ? formatDate(value) : ''}
                    onChange={onChange}
                    // rightIcon={<CalendarDaysIcon className="flex-none size-5 text-gray-400" />}
                    error={error}
                    onFocus={() => setOpen(true)}
                    readOnly
                />
                <div className={`border-1 border-gray-100 w-80 mt-1 absolute bg-white shadow-md rounded-lg ${open ? 'block' : 'hidden'} `}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={calValue} onChange={(newValue) => datePickerChange(newValue)} />
                    </LocalizationProvider>
                </div>
            </div>
        </>
    )
}

