import * as yup from "yup";

// Just like before, without the id field
const productSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number().positive().required(),
  category: yup.string().required(),
});

export default productSchema;
