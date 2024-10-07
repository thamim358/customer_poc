import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { Field } from 'formik';
import moment from 'moment';
import dayjs from 'dayjs';

export const DateTimePicker = ({
    name,
    disableDate,
    disableTime,
    format,
    disabled,
    title,
}) => {
    // Function to disable previous month dates and dates in the past
    const disabledDateFunction = (current) => {
        const today = moment().startOf('day');
        return current && (current < moment().startOf('month') || current < today);
    };

    const disabledHoursFunction = () => {
        const disabledHours = [];
        for (let i = 0; i < 7; i++) {
            disabledHours.push(i);
        }
        for (let i = 19; i < 24; i++) {
            disabledHours.push(i);
        }
        return disabledHours;
    };

    const renderExtraFooter = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'red', fontFamily:'Poppins'}}>
                Please select hours only between 7am to 6pm
            </div>
        </div>
    );

    return (
        <Field name={name}>
            {({ field, meta, form: { values, setFieldValue } }) => {
                return (
                    <div className="w-full">
                        <p className="modal__form-el-label mb-2">{title}</p>
                        <AntDatePicker
                            showTime={{
                                format: 'H:mm a',
                                use12Hours: false,
                                minuteStep: 5,
                                disabledHours: disabledHoursFunction,
                                // defaultOpenValue={moment('07:00', 'HH:mm')}
                                defaultValue: moment('07:00', 'HH:mm')
                                // defaultValue= 
                            }}

                            format={format || 'MM-DD-YYYY h:mm a'}
                            onChange={(date, dateString) => {
                                setFieldValue(name, dateString);
                            }}
                            value={values?.[name] ? dayjs(values?.[name], "MM-DD-YYYY h:mm a") : ""}
                            popupClassName="custom-date-picker-panel"
                            disabledDate={disableDate || disabledDateFunction}
                            disabledTime={disableTime}
                            disabled={disabled}
                            placeholder="Select Date and Time"
                            className="custom-date-picker w-full h-[48px] rounded-[5px] text-[#92928F] flex items-center justify-between px-[16px]"

                            renderExtraFooter={renderExtraFooter}
                        />
                        {/* {meta.touched && meta.error && <div className="error">{meta.error}</div>} */}
                    </div>
                )
            }}
        </Field>
    );
};
