import * as Yup from "yup";
import UITexts from "src/constants/interfaceText/checkout.json";

const messages = UITexts.shipping.errorMessages;

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(messages.name).matches(/^[A-Za-z ]*$/, 'Only letters and spaces are allowed in the name field'),
  email: Yup.string().required(messages.email),
  address1: Yup.string().required(messages.address),
  address2: Yup.string(),
  city: Yup.string().required(messages.city),
  state: Yup.string().required(messages.state),
  PIN: Yup.string().required(messages.PIN),
  country: Yup.string().required(messages.country),
});
