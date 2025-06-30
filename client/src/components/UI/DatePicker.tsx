import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type MouseEvent } from "react";
import Input from "./Input";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type DatePickerProps = {
  containerClassName?: string;
  name: string;
};

const getMonth = new Date().getMonth();
const getYear = new Date().getFullYear();

export default function DatePicker({
  containerClassNamen,
  name,
}: DatePickerProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthStore, setMonthStore] = useState(getMonth);
  const [yearStore, setYearStore] = useState(getYear);

  function handleToggleDropDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDropDownOpen((prev) => !prev);
  }

  function calendarDays() {
    const firstDayOfMonth = new Date(yearStore, monthStore, 1);
    const lastDatOfMonth = new Date(yearStore, monthStore + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDatOfMonth.getDate();

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(yearStore, monthStore, day));
    }

    return days;
  }

  function handlePrevMonth() {
    if (monthStore === 0) {
      setMonthStore(11);
      setYearStore(yearStore - 1);
    } else {
      setMonthStore(monthStore - 1);
    }
  }

  function handleNextMonth() {
    if (monthStore === 11) {
      setMonthStore(0);
      setYearStore(yearStore + 1);
    } else {
      setMonthStore(monthStore + 1);
    }
  }

  console.log(monthStore);

  const calendarAllDays = calendarDays();

  return (
    <div className="relative w-[300px]">
      <Input
        //   clearable={clearable}
        //   clearIcon={
        //     selectedOption &&
        //     clearable && (
        //         <X
        //         color="#caced8"
        //         onMouseDown={handleClear}
        //         size={15}
        //         strokeWidth={2}
        //         />
        //     )
        //   }
        //   inputClassName={`${inputClassName} cursor-pointer`}
        //   isDisabled={isDisabled}
        //   label={label}
        //   labelClassName={labelClassName}
        //   leftIconClassName={leftIconClassName}
        name={name}
        label={name}
        onMouseDown={handleToggleDropDown}
        fullWidth
        //   onClickRightIcon={(e?: MouseEvent<HTMLDivElement>) =>
        //     handleClickRightIcon(e)
        //   }
        //   rightIcon={<ChevronDown />}
        //   rightIconClassName={`${rightIconClassName} peer-focus:rotate-180 transition-all duration-300`}
        //   ref={inputRef}
        //   readOnly
        //   value={selectBoxValue}
      />

      {isDropDownOpen && (
        <div
          className="absolute w-full border border-gray-600 rounded-lg top-13"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-5 py-4 px-4 w-full">
            {/* This is date picker header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center hover:bg-gray-400 w-7 h-7 rounded-full cursor-pointer">
                <ChevronLeft size={18} onClick={handlePrevMonth} />
              </div>

              <div className="flex gap-1 font-medium justify-center">
                <p>June,</p>
                <p>2025</p>
              </div>
              <div className="flex items-center justify-center hover:bg-gray-400 w-7 h-7 rounded-full cursor-pointer">
                <ChevronRight size={18} onClick={handleNextMonth} />
              </div>
            </div>

            {/* This is days */}
            <div className="grid grid-cols-7 gap-1  border-b border-gray-500">
              {weekdays.map((weekday, index) => (
                <div key={index} className="py-2 text-center text-sm">
                  {weekday}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarAllDays.map((day, index) => {
                if (!day) return;
                return (
                  <div
                    key={index}
                    className="content-center w-8 h-8 rounded-full"
                  >
                    {day.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
