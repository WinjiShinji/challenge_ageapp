import { createContext, useEffect, useMemo, useState } from "react";

const FormContext = createContext({})

export const FormProvider = ({ children }) => {
  
  const [calcDay, setCalcDay] = useState("")
  const [calcMonth, setCalcMonth] = useState("")
  const [calcYear, setCalcYear] = useState("")
  const [dayWarn, setDayWarn] = useState("")
  const [monthWarn, setMonthWarn] = useState("")
  const [yearWarn, setYearWarn] = useState("")
  const [outputDay, setOutputDay] = useState("--")
  const [outputMonth, setOutputMonth] = useState("--")
  const [outputYear, setOutputYear] = useState("--")
  const [formValid, setFormValid] = useState(false)
  const [warnSubmit, setWarnSubmit] = useState("")

  const months = useMemo(() => [31,28,31,30,31,30,31,31,30,31,30,31], [])

  // Handle Validation Warnings
  // Inputs Validity Check
  useEffect(() => {
    if (
      calcDay &&
      calcMonth &&
      calcYear 
    ) {
      try {
        // Valid Inputs
        if (
          calcDay > 0 &&
          calcDay <= months[calcMonth - 1] &&
          calcMonth > 0 &&
          calcMonth < 13 &&
          calcYear > 1000 &&
          calcYear < new Date().getFullYear()
          ) {
            setFormValid(true)
            setDayWarn("")
            setMonthWarn("")
            setYearWarn("")
          }
        // Invalid Inputs
        else if (
          calcDay < 1 ||
          calcDay >= months[calcMonth - 1]
          ) {
            setFormValid(false)
            setDayWarn("Must be a valid day!")
          } else if (
          calcMonth < 1 ||
          calcMonth >= 13 
          ) {
            setFormValid(false)
            setMonthWarn("Must be a valid month!")
          } else if (
          calcYear > new Date().getFullYear()
          ) {
            setFormValid(false)
            setYearWarn("Must be in the past")
        } 
      } catch (error) {
        console.error(error)
      } finally {
        console.log(formValid)
      }
    }
  }, [calcDay, calcMonth, calcYear, months, formValid])
  
  // Handle Button Event
  const handleSubmit = () => {
    const currentDate = {
      year : new Date().getFullYear(),
      month : new Date().getMonth() + 1,
      day : new Date().getDate()
    }
    
    const inputDate = {
      year : Number(calcYear),
      month : Number(calcMonth),
      day : Number(calcDay)
    }
    
    // Calculate totals
    let totalYear = 0
    let totalMonth = 0
    let totalDay = 0
                  
    // Calculate Output Logic
    try {
      if (inputDate.year < currentDate.year) {totalYear = currentDate.year - inputDate.year}
      if (inputDate.month > currentDate.month) {
        totalMonth = 12 - (inputDate.month - currentDate.month)
        totalYear = totalYear - 1
      }
      if (inputDate.month < currentDate.month) {totalMonth = currentDate.month - inputDate.month}
      if (inputDate.day > currentDate.day) {
        totalDay = months[inputDate.month - 1] - (inputDate.day - currentDate.day)
        totalMonth = totalMonth - 1
      }
      if (inputDate.day < currentDate.day) {totalDay = currentDate.day - inputDate.day}
      if (totalMonth < 0) {
        totalMonth = 12 + totalMonth
        totalYear = totalYear - 1
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (formValid === true) {
        // Set Output Values
        setOutputYear(totalYear)
        setOutputMonth(totalMonth)
        setOutputDay(totalDay)
        setWarnSubmit("")
      } else if (formValid === false) {
        setWarnSubmit("Please enter a valid date!")
      }
    }
  }


  return (
    <FormContext.Provider value={{
      dayWarn, monthWarn, yearWarn,
      setDayWarn, setMonthWarn, setYearWarn,
      calcDay, calcMonth, calcYear,
      setCalcDay, setCalcMonth, setCalcYear,
      outputDay, outputMonth, outputYear,
      handleSubmit, warnSubmit
    }}>
      { children }
    </FormContext.Provider>
  )
}

export default FormContext