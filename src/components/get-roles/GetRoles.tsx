import { FC, MouseEvent, useEffect, useState } from "react";

import { useLazyGetRolesQuery } from "../../store/services/taskApi";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../store";
import { setRolesRedux } from "../../store/features/rolesSlice";
import { addErrorRedux } from "../../store/features/errorSlice";

import Role from "../role/Role";

import CustomButton from "../UI/button/CustomButton";
import CustomCard from "../UI/card/CustomCard";

import "./GetRoles.scss";

const GetRoles: FC = () => {
  const dispatch = useDispatch();

  const rolesRedux = useSelector((state: RootType) => state.rolesSlice.roles);
  const { isError: alertError } = useSelector(
    (state: RootType) => state.errorSlice
  );

  const [isFetchRoles, setIsFetchRoles] = useState<boolean>(false);
  const [isAnimation, setIsAnimation] = useState<boolean>(false);

  const [getRoles, { isError, isLoading, isSuccess, data }] =
    useLazyGetRolesQuery();

  const [roles, setRoles] = useState<string[]>([]);

  const getRolesHandler = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();

    getRoles();
  };

  useEffect(() => {
    if (isFetchRoles) {
      setRoles(data?.roles || rolesRedux);

      dispatch(setRolesRedux(data?.roles || rolesRedux));

      setIsAnimation(true);

      setTimeout(() => {
        setIsAnimation(false);
      }, 1000);
    }
  }, [isFetchRoles, data]);

  useEffect(() => {
    if (isSuccess || rolesRedux.length) setIsFetchRoles(true);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) !alertError && dispatch(addErrorRedux("Ошибка запроса!"));
  }, [isError]);

  return (
    <>
      <CustomCard>
        <div className="role-card">
          <div className="role-title">
            <h3>Контейнер ролей</h3>
          </div>
          {isFetchRoles && (
            <div
              className={
                isAnimation ? "roles-wrapper animation" : "roles-wrapper"
              }
            >
              {roles.map((name, index) => {
                return <Role name={name} nodeTime={index * 200} key={index} />;
              })}
            </div>
          )}
          {isFetchRoles ? (
            <CustomButton isOpacity={false}>
              <p>все что есть)</p>
            </CustomButton>
          ) : isLoading ? (
            <CustomButton isOpacity={true}>
              <span className="loading-button-circle"></span>
            </CustomButton>
          ) : (
            <CustomButton isOpacity={true} buttonFunction={getRolesHandler}>
              <p>получить роли</p>
            </CustomButton>
          )}
        </div>
      </CustomCard>
    </>
  );
};

export default GetRoles;
