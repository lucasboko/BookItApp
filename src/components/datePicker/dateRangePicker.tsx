
import { DatePicker } from './datePicker'

export const DateRangePicker = () => {

    return (
        <>
            <div>
                <div className="flex flex-row  gap-4">
                    <DatePicker label="From" leftLabel rightIcon />
                    <DatePicker label="To" leftLabel rightIcon />
                </div>
            </div>
        </>
    )
}

