import { FC, useEffect, useState } from "react";

import "./Role.scss";

export interface IRole {
  name: string;
  nodeTime: number;
}
const Role: FC<IRole> = ({ name, nodeTime }) => {
  const [isAnimation, setIsAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (!isAnimation) {
      setTimeout(() => {
        setIsAnimation(true);
      }, nodeTime);
    }
  }, [isAnimation]);

  return (
    <div className={isAnimation ? "role visible" : "role"}>
      <p>Роль:</p>
      <p>{name}</p>
    </div>
  );
};

export default Role;
