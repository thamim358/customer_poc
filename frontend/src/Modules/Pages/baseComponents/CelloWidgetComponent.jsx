import { useAuth } from "@frontegg/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

window.cello = window.cello || { cmd: [] };

export const CelloWidgetComponent = () => {
  const { settingsOrgValue } = useSelector((state) => state?.appointmentState);
  const { user } = useAuth();

  useEffect(() => {
    if (settingsOrgValue?.cello_token && user && !window.cello.cmd.length) {
      window.cello.cmd.push(async function (cello) {
        try {
          await cello.boot({
            productId: import.meta.env.VITE_CELLO_PRODUCT_ID,
            token: settingsOrgValue.cello_token,
            language: "en",
            productUserDetails: {
              firstName: settingsOrgValue.practitioner_first_name,
              lastName: settingsOrgValue.practitioner_last_name,
              fullName: settingsOrgValue.practitioner_name,
              email: user.email,
            },
          });
        } catch (error) {
          console.error("Failed to boot cello:", error);
        }
      });
    }
  }, [settingsOrgValue?.cello_token, user]);

  return null;
};
