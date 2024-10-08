import { Modal, Button as AntButton, Checkbox, Radio, Switch } from "antd";
import { Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { object } from "yup";
import { Button, Text } from ".";
import { SingleSelect } from "./SingleSelect";
import { PatternFormat } from "react-number-format";
import TextArea from "antd/es/input/TextArea";
import { TreeSelectDropdown } from "./TreeSelect";
import { classNames } from "../../../utilities";
// import { FollowUpIcon, IntakeIcon } from "src/icons";

const vSchema = object({});
export const ModalComponent = ({
    open,
    sections, // Array of sections with headings and fields
    validationSchema = vSchema,
    initialValues,
    className,
    submitButtonText = "Ok",
    cancelButtonText = "Cancel",
    handleCancel = () => null,
    handleSubmit,
    customBody,
    additionalBody,
    loading,
    centered,
    closable,
    disableSubmit,
    handleRadioButton,
    followUpFlag,
    appointmentTypes,
    updatedEmailsArray,
    setUpdatedEmailsArray,
    getConditionsbyType,
    practitonerEmailTag,
    setShowExistingFlag,
    radioButtonValue,
    show_Practitioner_Email,
    show_Edit_PractitionerEmail,
    // radioOptions,
    // selectedAmPmRadiobutton,
    // setSelectedAmPmRadiobutton,
    sendNow,
}) => {
    const singularDuration = (duration) => {
        switch (duration) {
            case 'Hours':
                return 'Hour';
            case 'Days':
                return 'Day';
            case 'Weeks':
                return 'Week';
            default:
                return duration;
        }
    };

    return (
        <Formik
            initialValues={{
                ...initialValues,
                radioButton: radioButtonValue,
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ errors, touched, resetForm, setFieldValue, values }) => (
                <Modal
                    open={open}
                    onCancel={handleCancel}
                    afterClose={() => resetForm()}
                    className={classNames(`custom-modal`, className ? className : "")}
                    centered={centered}
                    footer={null}
                    maskClosable={false}
                    closable={closable}
                >
                    <div className="modal_background">
                        <Form
                            autoComplete="off"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}>
                            {sections.map((section, index) => (
                                <div
                                    className="modal__header"
                                    key={`section-${index}`}
                                >
                                    <div className="modal__header mb-3">
                                        {section.heading === "radio_group" ? (
                                            <>
                                                <div className="">Add appointments</div>
                                                {followUpFlag && (
                                                    <div className="flex items-center mt-2">
                                                        <span className="font-change">Appointment type</span>
                                                        <span className="ml-3">
                                                            <Radio.Group
                                                                onChange={(e) => {
                                                                    setFieldValue("condition_id", null);
                                                                    setFieldValue("first_name", '')
                                                                    setFieldValue("last_name", '')
                                                                    setFieldValue("preferred_name", "")
                                                                    setFieldValue("phone_text", null)
                                                                    setFieldValue("email_text", '')
                                                                    setFieldValue("birth_date", null);
                                                                    setFieldValue("search_patient_name", null)
                                                                    setShowExistingFlag(false);
                                                                    setUpdatedEmailsArray([]);
                                                                    setFieldValue("radioButton", e.target.value);
                                                                    handleRadioButton(e);
                                                                }}
                                                                value={values.radioButton}
                                                            >
                                                                {appointmentTypes.map(item => (
                                                                    <Radio
                                                                        key={item.value}
                                                                        value={item.value}
                                                                        className={item.value === 1 ? "IntakeIcon" : "FollowUpIcon"}
                                                                    >
                                                                        <div className={`flex ${item.value === 1 ? "intake-radio-outlook" : "followup-radio-outlook"}`}>
                                                                            {/* <span className="mx-1 mt-1">
                                                                                {item.value === 1 ?
                                                                                    <IntakeIcon /> : <FollowUpIcon />}</span> */}
                                                                            <span className="mx-1">{item.label}</span>
                                                                        </div>
                                                                    </Radio>
                                                                ))}
                                                            </Radio.Group>
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        ) : section.heading === "provider_emails" ? (
                                            <>
                                                <div className="items-center">
                                                    <span className="mr-2">Provider notification emails</span>
                                                    {(practitonerEmailTag && show_Practitioner_Email)
                                                        || show_Edit_PractitionerEmail ? (
                                                        <div className="mx-1 doctor-email-item text-sm">
                                                            {getConditionsbyType?.practitioner_emails}
                                                        </div>
                                                    ) : ""}

                                                </div>
                                                <div>

                                                    <div className="flex flex-wrap text-sm font-normal practitioner_emails mt-3 gap-2">
                                                        {updatedEmailsArray?.length > 0 && updatedEmailsArray.map((email, index) => {
                                                            if (email.trim() !== '') {
                                                                return (
                                                                    <div key={index} className="email-item">
                                                                        {email}
                                                                    </div>
                                                                )
                                                            } else {
                                                                return null;
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            </>

                                        ) : section.heading}
                                    </div>
                                    <div className="modal____body">
                                        {customBody ? (
                                            customBody
                                        ) : (
                                            <div className={section.className}>
                                                {section.fields.map(
                                                    (
                                                        {
                                                            type,
                                                            name,
                                                            title,
                                                            helperTitle,
                                                            options,
                                                            placeholder,
                                                            onChange,
                                                            dataIndex,
                                                            dataField,
                                                            dataKey,
                                                            onValueChange,
                                                            onKeyDown,
                                                            onBlur,
                                                            disabled,
                                                            disableDate,
                                                            disableTime,
                                                            className,
                                                            dropdownArrow,
                                                            disabledDate,
                                                            onClick,
                                                            placement,
                                                            extraIcon,
                                                            action,
                                                            ...props
                                                        },
                                                        fieldIndex
                                                    ) => (
                                                        <Fragment key={`${name}-${fieldIndex}`}>
                                                            <div
                                                                className={`${className} modal__form-el`}
                                                                key={name}
                                                            >
                                                                <Text
                                                                    type="p"
                                                                    className={`modal__form-el-label mb-2 ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                >
                                                                    {title}
                                                                </Text>

                                                                {type === "datepicker" ? (
                                                                    // <DatePicker
                                                                    //     name={name}
                                                                    //     disabledDate={disabledDate}
                                                                    //     placement={placement}
                                                                    //     className={className}
                                                                    //     placeholder={placeholder}
                                                                    // />
                                                                    <div className=""></div>
                                                                ) : type === "switch" ? (
                                                                    <Text
                                                                        type="label"
                                                                        className="modal__form-el-label mb-2"
                                                                    >
                                                                        {helperTitle}
                                                                        <Switch
                                                                            className="mx-3"
                                                                            key={name}
                                                                            checked={sendNow}
                                                                            style={{ backgroundColor: "#00000040" }}
                                                                            onChange={onChange ? (value, option) => { onChange(value, option, setFieldValue) } : () => null}
                                                                        />
                                                                    </Text>
                                                                ) : type === "datetimepicker" ? (
                                                                    // <DateTimePicker
                                                                    //     name={name}
                                                                    //     disableDate={disableDate}
                                                                    //     disableTime={disableTime}
                                                                    //     format="MM-DD-YYYY h:mm a"
                                                                    // />
                                                                    <div className=""></div>
                                                                ) : type === "select" ? (
                                                                    <SingleSelect
                                                                        name={name}
                                                                        options={options}
                                                                        placeholder={placeholder}
                                                                        disabled={disabled}
                                                                        className={`single-select ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        popupClassName={props?.popupClassName}
                                                                        onChange={onChange ? (value, option) => { onChange(value, option, setFieldValue) } : () => null}
                                                                        value={values[name]}
                                                                        dropdownArrow={dropdownArrow}
                                                                        error={touched[name] && errors[name]}
                                                                        extraIcon={extraIcon}
                                                                    />
                                                                ) : type === "treeSelect" ? (
                                                                    <TreeSelectDropdown
                                                                        showSearch={true}
                                                                        name={name}
                                                                        options={options}
                                                                        placeholder={placeholder}
                                                                        disabled={disabled}
                                                                        className={`single-select ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        popupClassName={props?.popupClassName}
                                                                        onChange={onChange}
                                                                        value={values[name]}
                                                                    />
                                                                ) : type === "label" ? (
                                                                    <div className="modal__form-el">
                                                                        <Text className={``}>
                                                                            {title}
                                                                        </Text>
                                                                    </div>
                                                                ) : type === "radio" ? (
                                                                    <div>
                                                                        {options.map((option) => (
                                                                            <label
                                                                                key={option.value}
                                                                                className="modal__form-el-radio custom-radio input"
                                                                            >
                                                                                <input
                                                                                    type="radio"
                                                                                    name={name}
                                                                                    value={option.value}
                                                                                    onChange={onChange}
                                                                                // defaultChecked={option.value}
                                                                                // defaultValue={option.value}
                                                                                />
                                                                                {option.label}
                                                                            </label>
                                                                        ))}
                                                                    </div>
                                                                ) : type === "numbertext" ? (
                                                                    <PatternFormat
                                                                        className={`modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        key={name}
                                                                        type={type}
                                                                        name={name}
                                                                        disabled={disabled}
                                                                        placeholder={placeholder}
                                                                        {...props}
                                                                        format="(###) ###-####"
                                                                        allowEmptyFormatting={false}
                                                                        value={values[name] || ""}
                                                                        autoComplete="off"
                                                                        role="presentation"
                                                                        onValueChange={(values) => {
                                                                            if (onChange) {
                                                                                onChange(values.value, setFieldValue)
                                                                                setFieldValue(name, values.value);
                                                                            } else {
                                                                                setFieldValue(name, values.value);
                                                                            }
                                                                        }}
                                                                    />
                                                                ) : type === "dobText" ? (
                                                                    <PatternFormat
                                                                        className={`modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        key={name}
                                                                        type={type}
                                                                        name={name}
                                                                        disabled={disabled}
                                                                        placeholder={placeholder}
                                                                        {...props}
                                                                        format="##-##-####"
                                                                        allowEmptyFormatting={false}
                                                                        value={values[name] || ""}
                                                                        onValueChange={(values) => {
                                                                            if (onChange) {
                                                                                onChange(values.value, setFieldValue)
                                                                                setFieldValue(name, values.value);
                                                                            } else {
                                                                                setFieldValue(name, values.value);
                                                                            }
                                                                        }}
                                                                        autoComplete="off"
                                                                        role="presentation"
                                                                    />
                                                                ) : type === "fieldArray" ? (
                                                                    <div className="flex flex-col mt-4">
                                                                        <div className="flex flex-row border-b-2 border-[#E5E8EB] pb-2 justify-center w-60">
                                                                            <div
                                                                                className="font-medium text-base text-[#667085]">
                                                                                Schedule
                                                                            </div>
                                                                        </div>
                                                                        <>
                                                                            <div className="">
                                                                                {values.notifications?.length > 0 &&
                                                                                    values.notifications.map((notification, index) => (
                                                                                        <div className="" key={index}>
                                                                                            <div className="flex gap-x-4 items-center border-b-2 border-[#E5E8EB] w-60 mt-5">
                                                                                                <div className="text-sm font-normal mb-5 w-40 flex justify-start">
                                                                                                    {index === 0 ? " Default" : `Reminder ${index + 1}`}
                                                                                                </div>
                                                                                                <div className="flex items-center">
                                                                                                    <div className="text-sm font-normal mb-5">
                                                                                                        {notification.number_of}
                                                                                                    </div>
                                                                                                    <div className="text-sm font-normal mb-5 mx-1">
                                                                                                        {notification.number_of === 1 ? singularDuration(notification.duration) : notification.duration || "N/A"}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        </>
                                                                    </div>

                                                                ) : type === "checkBox" ? (
                                                                    <div
                                                                        className={`${className} modal__form-el`}
                                                                        key={name}
                                                                    >
                                                                        <Text
                                                                            type="label"
                                                                            className="modal__form-el-label mb-2"
                                                                        >
                                                                            <Checkbox
                                                                                className="mr-3"
                                                                                key={name}
                                                                                type={type}
                                                                                disabled={disabled}
                                                                                name={name}
                                                                                onChange={(e) => {
                                                                                    e.target.checked
                                                                                        ? setFieldValue(name, true)
                                                                                        : setFieldValue(name, false);
                                                                                }}
                                                                                checked={values[name]}
                                                                            />
                                                                            {helperTitle}
                                                                        </Text>
                                                                        {touched[name] && errors[name] && (
                                                                            <Text
                                                                                type={"error"}
                                                                                className={"error mt-2"}
                                                                            >
                                                                                {errors[name]}
                                                                            </Text>
                                                                        )}
                                                                    </div>
                                                                ) : type === "textarea" ? (
                                                                    <TextArea
                                                                        className="modal__form-el-field-textarea"
                                                                        name={name}
                                                                        placeholder={placeholder}
                                                                        value={values[name]}
                                                                        onChange={(e) => setFieldValue(name, e.target.value)}
                                                                        style={{ resize: "none", }}
                                                                    />
                                                                ) : type === "text" ? (
                                                                    <Field
                                                                        className={`modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        key={name}
                                                                        name={name}
                                                                        disabled={disabled}
                                                                        placeholder={placeholder}
                                                                        value={values[name]}
                                                                        role="presentation"
                                                                        autoComplete="off"
                                                                        onBlur={onBlur}
                                                                        onKeyDown={onKeyDown}
                                                                        onChange={(e) => {
                                                                            if (onChange) {
                                                                                onChange(e, setFieldValue);
                                                                                setFieldValue(name, e.target.value);
                                                                            } else {
                                                                                setFieldValue(name, e.target.value)
                                                                            }
                                                                        }}
                                                                    />
                                                                ) : type === "providerEmails" ? (
                                                                    <Field
                                                                        className={`modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        key={name}
                                                                        name={name}
                                                                        disabled={disabled}
                                                                        placeholder={placeholder}
                                                                        value={values[name] || null}
                                                                        role="presentation"
                                                                        autoComplete="off"
                                                                        onChange={onChange}
                                                                        onKeyDown={onKeyDown}
                                                                    />
                                                                ) : type === "radio_button" ? (
                                                                    <Radio.Group
                                                                        name={name}
                                                                    // onChange={(e) => {
                                                                    //     setSelectedAmPmRadiobutton(e.target.value)
                                                                    //     setFieldValue(name, e.target.value)
                                                                    // }}
                                                                    // className="flex mt-9"
                                                                    // value={selectedAmPmRadiobutton}
                                                                    >
                                                                        {/* {radioOptions?.map((option, index) => (
                                                                            <Radio
                                                                                key={index}
                                                                                value={option.value}
                                                                            >
                                                                                {option.label}
                                                                            </Radio>
                                                                        ))} */}
                                                                    </Radio.Group>

                                                                ) : (
                                                                    <Field
                                                                        className={`modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        key={name}
                                                                        type={type}
                                                                        name={name}
                                                                        disabled={disabled}
                                                                        placeholder={placeholder}
                                                                        {...props}
                                                                        value={values[name] || null}
                                                                        role="presentation"
                                                                        autoComplete="off"
                                                                    />
                                                                )}

                                                                {touched[name] && errors[name] && (
                                                                    <Text
                                                                        type={"error"}
                                                                        className={"error"}
                                                                    >
                                                                        {errors[name]}
                                                                    </Text>
                                                                )}
                                                            </div>
                                                        </Fragment>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {additionalBody ? additionalBody : ""}
                            <div className="modal__form-footer">
                                {cancelButtonText && (
                                    <div className="button-container">
                                        <Button
                                            type="button"
                                            loading={loading}
                                            className="cancel-button"
                                            onClick={() => handleCancel()}
                                        >
                                            {cancelButtonText}
                                        </Button>
                                    </div>
                                )}
                                {submitButtonText && (
                                    <div className="button-container">
                                        <AntButton
                                            htmlType="submit"
                                            loading={loading}
                                            className="submit-button"
                                            disabled={disableSubmit}
                                        >
                                            {submitButtonText}
                                        </AntButton>
                                    </div>
                                )}
                            </div>
                        </Form>
                    </div >
                </Modal >
            )
            }
        </Formik >
    );
};