import { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeErrorRedux } from "../../store/features/errorSlice";
import { RootType } from "../../store";

import "./Alert.scss";

const Alert: FC = () => {
  const dispatch = useDispatch();

  const { isError, errorMessage } = useSelector(
    (state: RootType) => state.errorSlice
  );
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 3000);

      dispatch(removeErrorRedux());
    }
  }, [isError]);

  return (
    <div className={visible ? "alert visible" : "alert"}>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Alert;
