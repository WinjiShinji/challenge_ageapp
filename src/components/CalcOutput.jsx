import { useContext } from "react"
import FormContext from "../context/FormContext"

const CalcOutput = () => {
  const { outputYear, outputMonth, outputDay, warnSubmit } = useContext(FormContext)

  return (
    <section className="calcOutput">
      <p>{warnSubmit}</p>
      <div className="calcYear">
        {outputYear}
        <p>years</p>
      </div>
      <div className="calcMonth">
        {outputMonth}
        <p>months</p>
      </div>
      <div className="calcDay">
        {outputDay}
        <p>days</p>
      </div>
    </section>
  )
}

export default CalcOutput