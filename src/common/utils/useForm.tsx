import { useState } from "react";
import { notification } from "antd";

interface IValues {
  title: string;
  description: string;
  priority: any;
}

const initialValues: IValues = {
  title: "",
  description: "",
  priority: "",
};

export const useForm = (validate: { (values: IValues): IValues }, priority: string, date: string) => {
  const [formState, setFormState] = useState<{
    values: IValues;
    errors: IValues;
  }>({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {

    event.preventDefault();
    const values = { ...formState.values, priority, date };
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));

    const url = "https://api.aldrewi.com/api/report";

    try {

      if (Object.values(errors).every((error) => error === "")) {
        const response = await fetch(url, {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          notification["error"]({
            message: "Error",
            description:
              "There was an error sending your message, please try again later.",
          });
        } else {
          event.target.reset();
          setFormState(() => ({
            values: { ...initialValues },
            errors: { ...initialValues },
          }));

          notification["success"]({
            message: "Success",
            description: "Report has been received",
          });
        }

      } else {
        const errors = validate(values);
        setFormState((prevState) => ({ ...prevState, errors }));
        // setFormState((prevState) => ({ ...prevState, errors }));
      }
    } catch (error) {
      notification["error"]({
        message: "Error",
        description: "Failed to submit form. Please try again later.",
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    event?.persist();
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values: formState.values,
    errors: formState.errors,
  };
};
