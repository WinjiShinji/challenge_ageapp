import { useContext } from 'react'
import arrow from '../icon-arrow.svg'
import FormContext from '../context/FormContext'

const CalcInputFields = () => {
  const {   
    calcDay, setCalcDay, dayWarn,
    calcMonth, setCalcMonth, monthWarn,
    calcYear, setCalcYear, yearWarn,
    handleSubmit
  } = useContext(FormContext)

  return (
    <section className="calcInput">
      <form>
          <div>
            <label 
              htmlFor="calcDay" className={`${dayWarn ? "warn" : ""}`}>Day</label>
            <input
              id='calcDay' 
              type="number"
              required
              placeholder="DD"
              value={calcDay}
              onChange={e => setCalcDay(e.target.value.slice(0,2))}
              className={`${dayWarn ? "warn" : ""}`}
              maxLength={2}
            />
            <p>{dayWarn}</p>
          </div>
          <div>
            <label 
              htmlFor="calcMonth" className={`${monthWarn ? "warn" : ""}`}>Month</label>
            <input 
              id='calcMonth'
              type="number" 
              required
              placeholder="MM"
              value={calcMonth}
              onChange={e => setCalcMonth(e.target.value.slice(0,2))}
              className={`${monthWarn ? "warn" : ""}`}
            />
            <p>{monthWarn}</p>
          </div>
          <div>
            <label htmlFor="calcYear" className={`${yearWarn ? "warn" : ""}`}>Year</label>
            <input 
              id='calcYear'
              type="number" 
              required
              placeholder="YYYY"
              value={calcYear}
              onChange={e => setCalcYear(e.target.value.slice(0,4))}
              className={`${yearWarn ? "warn" : ""}`}
            />
            <p>{yearWarn}</p>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <img src={arrow} alt="arrow" />
          </button>
      </form>
    </section>
  )
}

export default CalcInputFields