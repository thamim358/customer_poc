import React from "react";
import { Image } from ".";
import { classNames, profileName } from "../../../utilities";

export const ProfileLogo = ({
    base64Image = null,
    name = "? ?",
    className,
    filteredData,
}) => {
   

    return (
        <>
            {base64Image ? (
                <div
                    className={classNames(
                        "profile-picture",
                        className ? className : ""
                    )}
                >
                    <Image
                        className=""
                        src={base64Image}
                        alt="user"
                    />
                </div>
            ) : (
                <div
                    className={classNames(
                        "profile-picture-name flex justify-center items-center",
                        className ? className : ""
                    )}
                  
                >
                    {name && profileName(name)}
                </div>
            )}
        </>
    );
};
