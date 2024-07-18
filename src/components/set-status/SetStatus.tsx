import { FC, MouseEvent, useState, useEffect } from "react";

import { useSetStatusMutation } from "../../store/services/taskApi";

import { RootType } from "../../store";
import { useSelector, useDispatch } from "react-redux";

import { addStatusRedux } from "../../store/features/custonDataSlice";
import { addErrorRedux } from "../../store/features/errorSlice";

import CustomCard from "../UI/card/CustomCard";
import CustomButton from "../UI/button/CustomButton";

import "./SetStatus.scss";

const SetStatus: FC = () => {
  const dispatch = useDispatch();

  const { customStatus, customToken } = useSelector(
    (state: RootType) => state.customDataSlice
  );
  const { isError: alertError } = useSelector(
    (state: RootType) => state.errorSlice
  );

  const [triggerSetStatus, { isError, isLoading, isSuccess, data }] =
    useSetStatusMutation();

  const [status, setStatus] = useState<boolean>(false);

  const setStatusHandler = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();

    if (customToken) {
      triggerSetStatus(customToken);

      dispatch(addStatusRedux());
    }

    if (!customToken)
      !alertError && dispatch(addErrorRedux("Завершите предыдущие шаги"));
  };

  useEffect(() => {
    if ((isSuccess || customStatus) && !isError) {
      setStatus(true);

      console.log(data);
    }
  }, [isSuccess, isError]);

  return (
    <CustomCard>
      <div className="set-status">
        <div className="set-status-title">
          {status ? (
            <p>Ваш статус установлен в значение increased</p>
          ) : (
            <p>Для завершения регистрации вам осталось установить статус</p>
          )}
        </div>
        {status ? (
          <div className="surprise">
            <p>Ура! Вы успешно прошли регистрацию!)</p>
          </div>
        ) : (
          ""
        )}
        {status ? (
          <CustomButton isOpacity={false}>
            <p>статус установлен</p>
          </CustomButton>
        ) : isLoading ? (
          <CustomButton isOpacity={false}>
            <span className="loading-button-circle"></span>
          </CustomButton>
        ) : (
          <CustomButton isOpacity={true} buttonFunction={setStatusHandler}>
            <p>установить статус</p>
          </CustomButton>
        )}
      </div>
    </CustomCard>
  );
};

export default SetStatus;
