import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  } 
  if (!values.priority) {
    errors.priority
     = "Please select one";
  }
  return errors;
}
