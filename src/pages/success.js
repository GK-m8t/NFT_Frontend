import {Subtitle, Title} from "src/components/common";
import UITexts from "src/constants/interfaceText/success.json";

export default function Success() {
  return (
    <>
      <div className="success_div">
        <Title title={UITexts.title} buttonText={UITexts.buttonText}/>
        <Subtitle subTitle={UITexts.subTitle}/>
      </div>
    </>
  )
}