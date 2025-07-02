import { useEffect, useRef, useState, type MouseEvent } from "react";
import { X, ChevronLeft, ChevronRight, LucideCalendar } from "lucide-react";

import Input from "./Input";
import { useClickOutside } from "../../hooks/useClickOutside";
import { isSameDay, formattedDate } from "../../utils/calendar.utils";
import { useCalendarDays } from "../../hooks/useCalendarDays";

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
  clearable?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  isDisabled?: boolean;
  label: string;
  name: string;
  onSelectDate: (date: Date | null) => void;
  rightIconClassName?: string;
  value: Date | null;
};

const getMonth = new Date().getMonth();
const getYear = new Date().getFullYear();

export default function DatePicker({
  clearable = false,
  containerClassName = "",
  inputClassName,
  isDisabled = false,
  label,
  name,
  onSelectDate,
  rightIconClassName = "",
  value,
}: DatePickerProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [monthStore, setMonthStore] = useState(getMonth);
  const [yearStore, setYearStore] = useState(getYear);
  const [dateStep, setDateStep] = useState<DateSteps>("days");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const datepickerRef = useRef<HTMLDivElement | null>(null);

  const calendarAllDays = useCalendarDays(yearStore, monthStore);

  useEffect(() => {
    if (isDropDownOpen) {
      inputRef?.current?.focus();
    } else {
      inputRef?.current?.blur();
    }
  }, [isDropDownOpen]);

  useClickOutside([datepickerRef], () => {
    setIsDropDownOpen(false);
  });

  function handleToggleDropDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDropDownOpen((prev) => !prev);
    setDateStep("days");
  }

  function handleClickRightIcon(e?: MouseEvent<HTMLDivElement>) {
    e?.stopPropagation();
    e?.preventDefault();
    setIsDropDownOpen((prev) => !prev);
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

  function handleSelectDate(date: Date | null) {
    if (!date) return "";
    onSelectDate(date);
  }

  function handleClear(e: MouseEvent<HTMLOrSVGElement>) {
    e.preventDefault();
    e.stopPropagation();
    onSelectDate(null);
    setMonthStore(getMonth);
    setYearStore(getYear);
  }

  return (
    <div
      className={`relative w-[300px] ${containerClassName}`}
      ref={datepickerRef}
    >
      <Input
        clearable={clearable}
        clearIcon={
          value &&
          clearable && (
            <X
              color="#caced8"
              onMouseDown={handleClear}
              size={18}
              strokeWidth={2}
            />
          )
        }
        clearIconClassName="right-10"
        fullWidth
        inputClassName={`${inputClassName} cursor-pointer`}
        isDisabled={isDisabled}
        label={label}
        name={name}
        onChange={() => void 0}
        onClickRightIcon={(e?: MouseEvent<HTMLDivElement>) =>
          handleClickRightIcon(e)
        }
        onMouseDown={handleToggleDropDown}
        readOnly
        ref={inputRef}
        rightIcon={<LucideCalendar strokeWidth={1} />}
        rightIconClassName={`${rightIconClassName}`}
        value={formattedDate(value, "yyyy-mm-dd")}
      />

      {isDropDownOpen && (
        <div
          className="absolute w-full min-h-[280px] border border-gray-600 rounded-lg top-13"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-5 py-4 px-4 w-full">
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

            {dateStep === "days" && (
              <div>
                <div className="grid grid-cols-7 gap-1 text-[13px] border-b border-gray-500">
                  {weekdays.map((weekday, index) => (
                    <div key={index} className="py-1 text-center">
                      {weekday}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mt-1.5">
                  {calendarAllDays.map((day, index) => {
                    if (!day)
                      return <span key={index} className="w-8 h-8"></span>;

                    const isSelected = isSameDay(day, value);
                    const isToday = isSameDay(day, new Date());

                    return (
                      <div
                        key={index}
                        className={`text-sm content-center w-8 h-8 rounded-full cursor-pointer ${
                          isToday && isToday !== isSelected ? "bg-gray-500" : ""
                        } ${
                          isSelected
                            ? "bg-green text-light-green font-bold hover:bg-light-green hover:text-green"
                            : ""
                        } ${
                          !isSelected && !isToday ? "hover:bg-gray-100" : ""
                        }`}
                        onClick={() => handleSelectDate(day)}
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
                  const isSelectedMonth = index === monthStore;
                  const isThisMonth = index === new Date().getMonth();
                  return (
                    <div
                      key={index}
                      className={`text-sm p-2 rounded-lg  ${
                        !isSelectedMonth && !isThisMonth
                          ? "hover:bg-gray-100"
                          : ""
                      } ${
                        isSelectedMonth
                          ? "bg-green text-light-green hover:bg-light-green hover:text-green font-bold"
                          : ""
                      } ${isThisMonth ? "bg-gray-500" : ""}  cursor-pointer`}
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
                  const isSelectedYear = year === yearStore;
                  const isThisYear = year === new Date().getFullYear();
                  return (
                    <div
                      key={index}
                      className={`text-sm p-2 rounded-lg ${
                        !isSelectedYear && !isThisYear
                          ? "hover:bg-gray-100"
                          : ""
                      } ${
                        isSelectedYear
                          ? "bg-green text-light-green hover:bg-light-green hover:text-green font-bold"
                          : ""
                      } ${isThisYear ? "bg-gray-500" : ""} cursor-pointer`}
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
