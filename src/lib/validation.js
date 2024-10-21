import { email, helpers, minLength, required, sameAs } from "@vuelidate/validators";

export const rules = {
  title: { required: helpers.withMessage("title is required", required) },
  type: { required: helpers.withMessage("type is required", required) },
  description: {
    required: helpers.withMessage("description is required", required),
  },
  location: { required: helpers.withMessage("location is required", required) },
  salary: { required: helpers.withMessage("salary is required", required) },
};

export const userSinginRules = {
  email: {
    required: helpers.withMessage("contactEmail is required", required),
    email: helpers.withMessage("Please enter the correct email", email),
  },
  password: {
    minLength: minLength(8),
    required: helpers.withMessage("Password must be at least 8 characters", required)
  },
};

export const userRegisterRules = {
  name: { required: helpers.withMessage("name is required", required) },
  description: {
    type: String,
  },
  email: {
    required: helpers.withMessage("contactEmail is required", required),
    email: helpers.withMessage("Please enter the correct email", email),
  },
  phone: {
    required: helpers.withMessage("contactPhone is required", required),
  },
  password: {
    minLength: minLength(8),
    required: helpers.withMessage("Password must be at least 8 characters", required)
  },
};

export const userUpdateRules = {
  name: { required: helpers.withMessage("name is required", required) },
  description: {
    type: String,
  },
  email: {
    required: helpers.withMessage("contactEmail is required", required),
    email: helpers.withMessage("Please enter the correct email", email),
  },
  phone: {
    required: helpers.withMessage("contactPhone is required", required),
  },
}

