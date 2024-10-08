import React from 'react';
import { classNames } from '../../../utilities';

export const Logo = (
    {
        id,
        className,
        name,
        onClick,
    }
) => {
    return (
        <div
            className={classNames('logo flex items-center justify-center', className ? className : '')}
            id={id}
            name={name}
            // onClick={onClick ? onClick : ""}
        >
            {/* <LogoIcon id={id} className={'mr-2'}/>
            <div className=''>
                <div type={'span'} className={"text insight-text pr-2"}>INSIGHT</div>
                <div type={'span'} className={"text"}>HEALTH</div>
            </div> */}

            {/* <NewInsightIcon id={id} className={'mr-2'}/> */}
            <div className="text-xl font-semibold">Logo</div>

        </div>
    )
}

