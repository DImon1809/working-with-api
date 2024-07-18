import { FC, MouseEvent, useState, useEffect } from "react";

import { RootType } from "../../store";
import { useSelector, useDispatch } from "react-redux";

import { addErrorRedux } from "../../store/features/errorSlice";
import {
  addCodeRedux,
  addTokenRedux,
} from "../../store/features/custonDataSlice";

import { useLazyGetCodeQuery } from "../../store/services/taskApi";

import { useGenCode } from "../../hooks/useGenCode";

import CustomCard from "../UI/card/CustomCard";

import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import "./GetCode.scss";

export interface IGetCode {
  nextToThirdSlide: () => void;
}

const GetCode: FC<IGetCode> = ({ nextToThirdSlide }) => {
  const dispatch = useDispatch();

  const { customEmail, customCode, customToken } = useSelector(
    (state: RootType) => state.customDataSlice
  );
  const { isError: alertError } = useSelector(
    (state: RootType) => state.errorSlice
  );

  const [triggerGetCode, { isError, isLoading, isSuccess, data }] =
    useLazyGetCodeQuery();

  const { genTokenObj } = useGenCode();

  const [existsCode, setExistsCode] = useState<boolean>(false);

  const [code, setCode] = useState<string>("Запросите код");

  const [token, setToken] = useState<string>("Сгенерируйте токен");

  const [isOpenEyeCode, setIsOpenEyeCode] = useState<boolean>(false);
  const [isOpenEyeToken, setIsOpenEyeToken] = useState<boolean>(false);

  const getCodeHandler = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!customEmail) !alertError && dispatch(addErrorRedux("Получите е-маил"));

    if (customEmail) triggerGetCode(customEmail);
  };

  const genTokenHandler = (): void => {
    if (!existsCode) !alertError && dispatch(addErrorRedux("Получите код"));

    if (existsCode) {
      const _token: string = genTokenObj.genTokenMethod(
        customEmail,
        customCode
      );

      setToken(genTokenObj.encryptCode(_token));

      dispatch(addTokenRedux(_token));

      setTimeout(() => {
        nextToThirdSlide();
      }, 2000);
    }
  };

  const codeEyeHandler = (): void => {
    if (!isOpenEyeCode) {
      setIsOpenEyeCode(true);

      setCode(customCode);
    }

    if (isOpenEyeCode) {
      setIsOpenEyeCode(false);

      setCode(genTokenObj.encryptCode(customCode));
    }
  };

  const tokenEyeHandler = (): void => {
    if (!isOpenEyeToken) {
      setIsOpenEyeToken(true);

      setToken(customToken);
    }

    if (isOpenEyeToken) {
      setIsOpenEyeToken(false);

      setToken(genTokenObj.encryptCode(customToken));
    }
  };

  useEffect(() => {
    if ((isSuccess || customCode) && !isError) {
      setCode(genTokenObj.encryptCode(data || customCode));

      dispatch(addCodeRedux(data || customCode));

      setExistsCode(true);
    }

    if (isError) dispatch(addErrorRedux("Что-то пошло не так!"));
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (customToken && token === "Сгенерируйте токен")
      setToken(genTokenObj.encryptCode(customToken));
  }, [token]);

  return (
    <CustomCard>
      <div className="get-code">
        <div className="item-wrapper">
          <input
            type="text"
            name="custom-email"
            id="custom-email"
            className="custom-email"
            value={customEmail || "Здесь пока ничего нет"}
            onChange={() => {}}
            disabled
          />
          <label htmlFor="custom-email">Ваш е-маил:</label>
        </div>
        <div className="item-wrapper">
          <input
            type="text"
            name="code"
            id="code"
            className="code"
            value={code}
            onChange={() => {}}
            disabled
          />
          <label htmlFor="code">Ваш код:</label>

          {existsCode ? (
            <div className="button-exists-code-token">
              <p>Код получен</p>
            </div>
          ) : isLoading ? (
            <div className="button-gen-code">
              <span className="loading-button-circle"></span>
            </div>
          ) : (
            <div className="button-gen-code" onClick={getCodeHandler}>
              <p>Получить код</p>
            </div>
          )}

          {customCode && (
            <div className="eye-wrapper" onClick={codeEyeHandler}>
              {isOpenEyeCode ? (
                <IoIosEyeOff size="100%" />
              ) : (
                <IoMdEye size="100%" />
              )}
            </div>
          )}
        </div>

        <div className="item-wrapper">
          <textarea
            name="token"
            id="token"
            className="token"
            value={token}
            onChange={() => {}}
            disabled
          ></textarea>
          <label htmlFor="token">Ваш токен:</label>

          <span className="token-line"></span>

          {customToken ? (
            <div className="button-exists-code-token">
              <p>Токен получен</p>
            </div>
          ) : (
            <div className="button-get-token" onClick={genTokenHandler}>
              <p>Сгенерировать токен</p>
            </div>
          )}

          {customToken && (
            <div className="eye-wrapper" onClick={tokenEyeHandler}>
              {isOpenEyeToken ? (
                <IoIosEyeOff size="100%" />
              ) : (
                <IoMdEye size="100%" />
              )}
            </div>
          )}
        </div>
      </div>
    </CustomCard>
  );
};

export default GetCode;
