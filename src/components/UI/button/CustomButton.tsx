import { FC, ReactNode, MouseEvent } from "react";

import "./CustomButton.scss";

export interface ICustomButton {
  children: ReactNode;
  isOpacity: boolean;
  buttonFunction?: (event: MouseEvent<HTMLDivElement>) => Promise<void>;
}

const CustomButton: FC<ICustomButton> = ({
  children,
  isOpacity,
  buttonFunction,
}) => {
  return (
    <div
      className={isOpacity ? "custom-button opacity" : "custom-button"}
      onClick={buttonFunction}
    >
      {children}
    </div>
  );
};

export default CustomButton;
