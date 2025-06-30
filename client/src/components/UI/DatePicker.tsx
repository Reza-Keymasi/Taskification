import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type MouseEvent } from "react";
import Input from "./Input";

type DatePickerProps = {
  containerClassName?: string;
  name: string;
};

export default function DatePicker({
  containerClassNamen,
  name,
}: DatePickerProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  function handleToggleDropDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDropDownOpen((prev) => !prev);
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
          <div className="flex flex-col gap-5 py-3 px-5 w-full">
            {/* This is date picker header */}
            <div className="flex items-center justify-between border-b border-gray-500">
              <div className="flex items-center justify-center hover:bg-gray-400 w-7 h-7 rounded-full cursor-pointer">
                <ChevronLeft size={18} />
              </div>

              <div className="flex gap-1 font-medium justify-center">
                <p>June,</p>
                <p>2025</p>
              </div>
              <div className="flex items-center justify-center hover:bg-gray-400 w-7 h-7 rounded-full cursor-pointer">
                <ChevronRight size={18} />
              </div>
            </div>

            {/* This is days */}
            <div>Daye</div>
          </div>
        </div>
      )}
    </div>
  );
}
