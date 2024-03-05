import React from "react";
import MobileShortcut from "./common/mobileShortcut";

const Toggle = (props) => {
  const { theme, device, onSwitch } = props;
  const bgcolor = device === "mobile" ? "rgb(154, 190, 178)" : null;
  return (
    <div
      className="sticky-top ml-2 row pt-2"
      style={{ backgroundColor: bgcolor }}
    >
      <i
        className={
          theme === "daytime"
            ? "fa fa-toggle-off fa-2x pointer"
            : "fa fa-toggle-on fa-2x pointer"
        }
        onClick={() => onSwitch(theme)}
      ></i>
      {device === "mobile" && <MobileShortcut theme={theme} />}
    </div>
  );
};
export default Toggle;
