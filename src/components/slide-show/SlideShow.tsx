import { FC, useRef } from "react";

import SignUp from "../sign-up/SignUp";
import GetCode from "../get-code/GetCode";
import SetStatus from "../set-status/SetStatus";

import "./SlideShow.scss";

const SlideShow: FC = () => {
  const secondSlideInp = useRef<HTMLInputElement>(null);
  const thirdSlideInp = useRef<HTMLInputElement>(null);

  const nextToSecondSlide = (): void => {
    secondSlideInp.current?.click();
  };

  const nextToThirdSlide = (): void => {
    thirdSlideInp.current?.click();
  };

  return (
    <div className="slide-show">
      <input type="radio" name="btn" id="btn-1" className="btn" />
      <input
        type="radio"
        name="btn"
        id="btn-2"
        className="btn"
        ref={secondSlideInp}
      />
      <input
        type="radio"
        name="btn"
        id="btn-3"
        className="btn"
        ref={thirdSlideInp}
      />

      <div className="slider first">
        <SignUp nextToSecondSlide={nextToSecondSlide} />
      </div>
      <div className="slider second">
        <GetCode nextToThirdSlide={nextToThirdSlide} />
      </div>
      <div className="slider third">
        <SetStatus />
      </div>

      <div className="slider-buttons">
        <label htmlFor="btn-1"></label>
        <label htmlFor="btn-2"></label>
        <label htmlFor="btn-3"></label>
      </div>
    </div>
  );
};

export default SlideShow;
