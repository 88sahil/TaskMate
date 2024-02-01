import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './Menu.css'
const Calendar =()=>{
    const [value, setValue] = React.useState(dayjs(Date.now()));
    return(
        <div className='calendar'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    <DemoItem>
                     <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}

export default  Calendar