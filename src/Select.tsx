import { useState, useEffect, useRef, ChangeEvent } from "react";
import styles from "./styles/select.module.css";

type SelectOption = {
  label: string;
  value: string;
};

type SingleSelectProps = {
  isMulti?: false;
  value: SelectOption;
  onChange: (value: SelectOption) => void;
};
type MultipleSelectProps = {
  isMulti: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type CreatableSelectProps = {
  creatable: true;
  handleCreateOption: (option: SelectOption) => void;
};
type NotCreatableSelectProps = {
  creatable?: false;
  handleCreateOption?: (option: SelectOption) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps) &
  (NotCreatableSelectProps | CreatableSelectProps);

function Select({
  isMulti,
  creatable,
  options,
  value,
  onChange,
  handleCreateOption,
}: SelectProps) {
  function selectOption(option: SelectOption) {
    if (isMulti) {
      // If multiple, add or remove the option from the selected options
      if (value.some((v) => v.value === option.value)) {
        onChange(value.filter((o) => o.value !== option.value));
      } else {
        onChange([...value, option]);
      }
    } else {
      // If single, change the selected option
      if (option !== value) onChange(option);
    }
  }

  // Function to check if an option is currently selected
  function isOptionSelected(option: SelectOption) {
    return isMulti
      ? value.some((v) => v.value === option.value)
      : option.value === value.value;
  }

  // State to manage the text input for creatable options
  const [creatableInputText, setCreatableInputText] = useState<string>("");

  // State to keep track of the currently highlighted option index
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  //select ref to handle keyboard actions
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
      }
    };

    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [highlightedIndex, options]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != inputRef.current) return;
      if (creatable) {
        switch (e.code) {
          case "Enter":
          case "Space":
            handleCreateOption({
              label: creatableInputText,
              value: "",
            });
            break;
        }
      }
    };

    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [creatableInputText]);

  return (
    <div
      className={styles.container}
      tabIndex={creatable ? 2 : 1}
      ref={containerRef}
    >
      <span className={styles.value}>
        {isMulti
          ? value.map((v) => (
              <button
                className={styles["option-badge"]}
                key={v.value}
                value={v.value}
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  // When clicked, remove the option from the selected list
                  selectOption(v);
                }}
              >
                <p>{v.label}</p>
                <span className={styles["remove-btn"]}>
                  <svg viewBox="0 0 32 32">
                    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
                  </svg>
                </span>
              </button>
            ))
          : value.label}
        {creatable && (
          <input
            type="text"
            className={styles["create-input"]}
            value={creatableInputText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCreatableInputText(e.target.value);
              setHighlightedIndex(-1);
            }}
            ref={inputRef}
            tabIndex={1}
          />
        )}
      </span>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation;
            e.preventDefault(); // Prevent form submission
            setCreatableInputText(""); //Clear the creatable input

            // When clicked, clear the selected options
            isMulti ? onChange([]) : onChange({ label: "", value: "" });
          }}
          className={styles["clear-btn"]}
        >
          <svg viewBox="0 0 200 200">
            <path d="M5.53445 5.53431C-1.84482 12.9136 -1.84482 24.8775 5.53445 32.2567L73.2776 99.9995L5.53445 167.744C-1.84482 175.122 -1.84482 187.087 5.53445 194.466C12.9135 201.845 24.8776 201.845 32.2567 194.466L99.9996 126.722L167.744 194.466C175.123 201.845 187.087 201.845 194.466 194.466C201.845 187.087 201.845 175.122 194.466 167.744L126.722 99.9995L194.466 32.2569C201.845 24.8779 201.845 12.9138 194.466 5.53469C187.085 -1.84458 175.123 -1.84458 167.744 5.53469L99.9996 73.2774L32.2567 5.53431C24.8776 -1.84477 12.9135 -1.84477 5.53445 5.53431Z" />
          </svg>
        </button>
        <span className={styles.caret}>
          <svg viewBox="0 0 200 200">
            <path d="M4.88151 46.8815C11.3904 40.3728 21.943 40.3728 28.4519 46.8815L100 118.43L171.549 46.8815C178.057 40.3728 188.61 40.3728 195.119 46.8815C201.627 53.3904 201.627 63.943 195.119 70.4517L111.785 153.785C105.277 160.294 94.7235 160.294 88.2152 153.785L4.88151 70.4517C-1.62717 63.943 -1.62717 53.3904 4.88151 46.8815Z" />
          </svg>
        </span>
      </div>
      <ul className={styles.options}>
        {creatable && creatableInputText !== "" && (
          <li
            className={`${styles["create-btn"]}  ${
              highlightedIndex === -1 ? styles.highlighted : ""
            }`}
            onClick={() => {
              handleCreateOption({
                label: creatableInputText,
                value: "",
              });
              setCreatableInputText("");
            }}
            onMouseEnter={() => setHighlightedIndex(-1)}
          >
            {` Create: ${creatableInputText}`}
          </li>
        )}
        {options.map((option, index) => (
          <li
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
            onClick={() => selectOption(option)}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
