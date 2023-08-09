import { useState } from "react";
import Select from "./Select";

type Tag = {
  id: string;
  label: string;
};
const options: Tag[] = [
  { label: "First", id: "1" },
  { label: "Second", id: "2" },
  { label: "Second", id: "3" },
  { label: "Second", id: "4" },
  { label: "Second", id: "5" },
];

function App() {
  const [selectedValue1, setSelectedValue1] = useState<Tag>(options[0]);
  const [selectedValue2, setSelectedValue2] = useState<Tag[]>([]);
  const [selectedValue3, setSelectedValue3] = useState<Tag>(options[0]);
  const [selectedValue4, setSelectedValue4] = useState<Tag[]>([]);
  return (
    <>
      <div>
        <Select
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={{
            label: selectedValue1.label,
            value: selectedValue1.id,
          }}
          onChange={(option) =>
            setSelectedValue1({ label: option.label, id: option.value })
          }
        />
        {"***************"}
        <Select
          isMulti
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={selectedValue2.map((value) => {
            return {
              label: value.label,
              value: value.id,
            };
          })}
          onChange={(options) =>
            setSelectedValue2(
              options.map((option) => {
                return { label: option.label, id: option.value };
              })
            )
          }
        />
        {"***************"}
        <Select
          creatable
          handleCreateOption={(value) => console.log(value)}
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={{
            label: selectedValue3.label,
            value: selectedValue3.id,
          }}
          onChange={(option) =>
            setSelectedValue3({ label: option.label, id: option.value })
          }
        />
        {"***************"}
        <Select
          creatable
          handleCreateOption={(value) => console.log(value)}
          isMulti
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={selectedValue4.map((value) => {
            return {
              label: value.label,
              value: value.id,
            };
          })}
          onChange={(options) =>
            setSelectedValue4(
              options.map((option) => {
                return { label: option.label, id: option.value };
              })
            )
          }
        />
        {"***************"}
      </div>
    </>
  );
}

export default App;

/*
- Use Select for single selected option

type Tag = {
  id: string;
  label: string;
};

const options = [{ label: "First", value: "1" }];

const [selectedValue, setSelectedValue] = useState<Tag>(options[0]);

       <Select
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={{
            label: selectedValue.label,
            value: selectedValue.id,
          }}
          onChange={(option) =>
            setSelectedValue({ label: option.label, id: option.value })
          }
        />
*/

/*
- Use Select for Multi selected option

type Tag = {
  id: string;
  label: string;
};

const options = [{ label: "First", value: "1" }];

const [selectedValue, setSelectedValue] = useState<Tag[]>([]);

       <Select
          isMulti
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={selectedValue.map((value) => {
            return {
              label: value.label,
              value: value.id,
            };
          })}
          onChange={(options) =>
            setSelectedValue(
              options.map((option) => {
                return { label: option.label, id: option.value };
              })
            )
          }
        />
*/

/*
- Use Select for single selected creatable options

type Tag = {
  id: string;
  label: string;
};

const options = [{ label: "First", value: "1" }];

const [selectedValue, setSelectedValue] = useState<Tag>(options[0]);

   <Select
          creatable
          handleCreateOption={(value) => console.log(value)}
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={{
            label: selectedValue3.label,
            value: selectedValue3.id,
          }}
          onChange={(option) =>
            setSelectedValue3({ label: option.label, id: option.value })
          }
        />
*/

/*
- Use Select for Multi selected creatable option

type Tag = {
  id: string;
  label: string;
};

const options = [{ label: "First", value: "1" }];

const [selectedValue, setSelectedValue] = useState<Tag[]>([]);

      <Select
          creatable
          handleCreateOption={(value) => console.log(value)}
          isMulti
          options={options.map((option) => {
            return { label: option.label, value: option.id };
          })}
          value={selectedValue4.map((value) => {
            return {
              label: value.label,
              value: value.id,
            };
          })}
          onChange={(options) =>
            setSelectedValue4(
              options.map((option) => {
                return { label: option.label, id: option.value };
              })
            )
          }
*/
