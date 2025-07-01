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

type DateSteps = "days" | "months" | "years";

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
  const [dateStep, setDateStep] = useState<DateSteps>("days");

  function handleToggleDropDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDropDownOpen((prev) => !prev);
    setDateStep("days");
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

  function toggleDateStep(step: DateSteps) {
    setDateStep(step);
  }

  const yearOptions = Array.from({ length: 12 }, (_, i) => {
    const year = new Date().getFullYear() - 4 + i;
    return year;
  });

  function monthView() {
    const date = new Date(yearStore, monthStore);
    return date.toLocaleDateString("default", { month: "long" });
  }

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
        // label={label}
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
          className="absolute w-full min-h-[280px] border border-gray-600 rounded-lg top-13"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-5 py-4 px-4 w-full">
            {/* This is date picker header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center hover:bg-gray-400 w-7 h-7 rounded-full cursor-pointer">
                <ChevronLeft size={18} onClick={handlePrevMonth} />
              </div>

              <div className="flex gap-1 font-medium justify-center">
                <p
                  className="cursor-pointer"
                  onClick={() => toggleDateStep("months")}
                >
                  {monthView()},
                </p>
                <p
                  className="cursor-pointer"
                  onClick={() => toggleDateStep("years")}
                >
                  {yearStore}
                </p>
              </div>
              <div className="flex items-center justify-center hover:bg-gray-400 w-7 h-7 rounded-full cursor-pointer">
                <ChevronRight size={18} onClick={handleNextMonth} />
              </div>
            </div>

            {/* This is days */}
            {dateStep === "days" && (
              <div>
                <div className="grid grid-cols-7 gap-1 text-[13px] border-b border-gray-500">
                  {weekdays.map((weekday, index) => (
                    <div key={index} className="py-1 text-center">
                      {weekday}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarAllDays.map((day, index) => {
                    if (!day) return <span className="w-8 h-8"></span>;
                    return (
                      <div
                        key={index}
                        className="text-sm content-center w-8 h-8 rounded-full cursor-pointer"
                      >
                        {day.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {dateStep === "months" && (
              <div className="grid grid-cols-3 gap-4">
                {months.map((month, index) => {
                  return (
                    <div
                      key={index}
                      className="text-sm p-2 rounded-lg hover:bg-light-green hover:text-green cursor-pointer"
                      onClick={() => {
                        setMonthStore(index);
                        setDateStep("years");
                      }}
                    >
                      {month}
                    </div>
                  );
                })}
              </div>
            )}

            {dateStep === "years" && (
              <div className="grid grid-cols-3 gap-4 text-center">
                {yearOptions.map((year, index) => {
                  return (
                    <div
                      key={index}
                      className="text-sm p-2 rounded-lg hover:bg-light-green hover:text-green cursor-pointer"
                      onClick={() => {
                        setYearStore(year);
                        setDateStep("days");
                      }}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
