import { FC, ReactNode } from "react";

import "./CustomCard.scss";

export interface ICustomCard {
  children: ReactNode;
}

const CustomCard: FC<ICustomCard> = ({ children }) => {
  return <div className="custom-card">{children}</div>;
};

export default CustomCard;
