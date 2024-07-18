import { FC, MouseEvent, useState, useRef, useEffect } from "react";

import { useAddToTableMutation } from "../../store/services/taskApi";

import { addEmailRedux } from "../../store/features/custonDataSlice";
import { addErrorRedux } from "../../store/features/errorSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../store";

import CustomButton from "../UI/button/CustomButton";
import CustomCard from "../UI/card/CustomCard";

import "./SignUp.scss";

export interface IsignUp {
  nextToSecondSlide: () => void;
}

const SignUp: FC<IsignUp> = ({ nextToSecondSlide }) => {
  const dispatch = useDispatch();

  const { roles } = useSelector((state: RootType) => state.rolesSlice);
  const { customEmail } = useSelector(
    (state: RootType) => state.customDataSlice
  );

  const [triggerAddToTable, { isError, isSuccess, isLoading }] =
    useAddToTableMutation();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const selectRef = useRef<HTMLSelectElement>(null);

  const [isExistsDataTable, setIsExistsDataTable] = useState<boolean>(false);

  const signUpHandler = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();

    const role: string = selectRef.current?.value || "";

    if (role && role !== "empty" && firstName && lastName && email) {
      triggerAddToTable({
        first_name: firstName,
        last_name: lastName,
        email,
        role,
      });
    } else {
      dispatch(addErrorRedux("Введите все данные!"));
    }
  };

  useEffect(() => {
    if ((isSuccess || customEmail) && !isError) {
      dispatch(addEmailRedux(email || customEmail));

      setIsExistsDataTable(true);

      setFirstName("");
      setLastName("");
      setEmail("");

      isSuccess && nextToSecondSlide();
    }

    if (isError) dispatch(addErrorRedux("Что-то пошло не так!"));
  }, [isSuccess, isError]);

  return (
    <CustomCard>
      <div className="sign-up">
        <div className="input-wrapper">
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder=" "
            autoComplete="on"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor="first-name">Имя</label>
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="second-name"
            id="second-name"
            placeholder=" "
            autoComplete="on"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <label htmlFor="second-name">Фамилия</label>
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="email"
            id="email"
            placeholder=" "
            autoComplete="on"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="email">Е-маил</label>
        </div>

        <div className="select-wrapper">
          <select name="select-role" id="select-role" ref={selectRef}>
            {roles.length ? (
              roles.map((_l, index) => {
                return (
                  <option value={_l} key={index}>
                    {_l}
                  </option>
                );
              })
            ) : (
              <option value="empty">Запросите роли</option>
            )}
          </select>
        </div>

        {isExistsDataTable ? (
          <CustomButton isOpacity={false}>
            <p>Данные записаны</p>
          </CustomButton>
        ) : isLoading ? (
          <CustomButton isOpacity={false}>
            <span className="loading-button-circle"></span>
          </CustomButton>
        ) : (
          <CustomButton buttonFunction={signUpHandler} isOpacity={true}>
            <p>Записаться в кандидаты</p>
          </CustomButton>
        )}
      </div>
    </CustomCard>
  );
};

export default SignUp;
