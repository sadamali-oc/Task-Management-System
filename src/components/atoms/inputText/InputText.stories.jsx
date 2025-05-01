import React from "react";
import InputText from "../inputText"; 
const meta = {
  title: "Atoms/InputText",
  component: InputText,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" },
    type: {
      control: "select",
      options: ["text", "password"],
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Email",
    value: "",
    type: "text",
  },
};

export const Password = {
  args: {
    label: "Password",
    value: "",
    type: "password",
  },
};
