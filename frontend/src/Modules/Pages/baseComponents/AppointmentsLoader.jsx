import React from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'src/utilities';
import { Text } from '.';
import { LogoIcon } from 'src/icons';

export const AppointmentLoader = (
    {
        id,
        className,
        name,
        onClick,
    }
) => {
    const navigate = useNavigate();
    return (
        <div
            className={classNames('logo cursor-pointer flex items-center', className ? className : '')}
            id={id}
            name={name}
            onClick={onClick ? onClick : () => navigate('/')}
        >
            <LogoIcon id={id} className={'pr-2'} />
            {/* <Text type={'span'} className={'text insight-text pr-2'}>Careplan</Text> */}
            <Text type={'span'} className={'text insight-text pr-2'}>Loading</Text>
        </div>
    )
}

