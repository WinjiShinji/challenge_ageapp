import CalcInputFields from "./CalcInputFields"
import CalcOutput from "./CalcOutput"
import { FormProvider } from "../context/FormContext";

const AgeCalc = () => {

  return (
    <div className="ageCalc">
      <FormProvider>
        <CalcInputFields />
        <CalcOutput />
      </FormProvider>
    </div>
  )
}

export default AgeCalc