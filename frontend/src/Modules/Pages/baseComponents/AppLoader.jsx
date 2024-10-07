import React from 'react'
import { CarePlanLoader, Logo } from '.'
import { Bars } from 'react-loader-spinner'

export const AppLoaderPage = (
    {

    }
) => {
    return (
        <div className='loader-wrapper flex flex-col items-center justify-center w-[100vw] h-[100vh]'>
            <CarePlanLoader />
            <Bars
                height="25"
                width="25"
                color="#00D090"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="pt-1 sm:pt-2"
                visible={true}
            />
        </div>
    )
}