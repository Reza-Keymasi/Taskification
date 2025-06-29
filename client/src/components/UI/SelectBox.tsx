import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronDown, Frown, X } from "lucide-react";

import Input from "./Input";
import { useClickOutside } from "../../hooks/useClickOutside";

type SelectBoxOptionType = {
  id: string | number;
  label: string | number;
};

type SelectBoxProps = {
  clearable?: boolean;
  initialValue?: string;
  inputClassName?: string;
  isDisabled?: boolean;
  label: string;
  labelClassName?: string;
  leftIconClassName?: string;
  name: string;
  onChange?: (value: string) => void;
  onOptionSelect: (option: string) => void;
  options: SelectBoxOptionType[];
  rightIconClassName?: string;
  searchedQuery?: string;
  selectedOption?: string;
};

export default function SelectBox({
  clearable = false,
  inputClassName,
  isDisabled,
  label,
  labelClassName,
  leftIconClassName,
  name,
  onOptionSelect,
  options,
  rightIconClassName,
  selectedOption,
}: SelectBoxProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectBoxValue, setSelectBoxValue] = useState<string>(
    selectedOption !== undefined ? selectedOption : ""
  );
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDropDownOpen) {
      inputRef?.current?.focus();
    } else {
      inputRef?.current?.blur();
    }
  }, [isDropDownOpen]);

  useClickOutside([selectRef], () => {
    setIsDropDownOpen(false);
  });

  const filteredOptions = options.filter(
    (option) =>
      !isSearching ||
      option.label
        .toString()
        .toLowerCase()
        .includes(selectBoxValue.toLowerCase())
  );

  const hasMatchedOption = options.some((option) =>
    option.label.toString().toLowerCase().includes(selectBoxValue.toLowerCase())
  );

  function handleToggleDropDown(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDropDownOpen((prev) => !prev);
  }

  function handleClickRightIcon(e?: MouseEvent<HTMLDivElement>) {
    if (isDisabled) return;
    e?.stopPropagation();
    e?.preventDefault();
    setIsDropDownOpen((prev) => !prev);
    setIsSearching(false);
  }

  function handleSelectOption(option: string) {
    setSelectBoxValue(option);
    setIsDropDownOpen(false);
    inputRef?.current?.blur();
    onOptionSelect(option);
    setIsSearching(false);
  }

  function handleClear() {
    setSelectBoxValue("");
    onOptionSelect("");
    if (isDropDownOpen && selectedOption) {
      setIsDropDownOpen(false);
    }
  }

  return (
    <div className="relative" ref={selectRef}>
      <Input
        clearable={clearable}
        clearIcon={
          selectedOption &&
          clearable && (
            <X
              color="#caced8"
              onMouseDown={handleClear}
              size={15}
              strokeWidth={2}
            />
          )
        }
        inputClassName={`${inputClassName} cursor-pointer`}
        isDisabled={isDisabled}
        label={label}
        labelClassName={labelClassName}
        leftIconClassName={leftIconClassName}
        name={name}
        onMouseDown={handleToggleDropDown}
        onClickRightIcon={(e?: MouseEvent<HTMLDivElement>) =>
          handleClickRightIcon(e)
        }
        rightIcon={<ChevronDown />}
        rightIconClassName={`${rightIconClassName} peer-focus:rotate-180 transition-all duration-300`}
        ref={inputRef}
        readOnly
        value={selectBoxValue}
      />

      {isDropDownOpen && (
        <div
          className="absolute w-full border border-gray-600 rounded-lg top-13"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="py-3 px-1 w-full">
            <ul className="max-h-48 overflow-y-auto">
              {hasMatchedOption ? (
                filteredOptions.map((option) => {
                  const isSelected = selectedOption === option.label.toString();
                  return (
                    <li
                      key={option.id}
                      className={`py-2 px-3 text-dark-green rounded-sm
                          cursor-pointer ${
                            isSelected ? "bg-light-green text-primary" : ""
                          } ${!isSelected ? "hover:bg-gray-400" : ""}`}
                      onClick={() =>
                        handleSelectOption(option.label.toString())
                      }
                    >
                      {option.label}
                    </li>
                  );
                })
              ) : (
                <div className="flex gap-2 justify-center text-gray-800">
                  <Frown color="#caced8" strokeWidth={2} /> No Matched Result
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
