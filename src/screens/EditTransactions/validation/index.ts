import * as yup from "yup";

export const validationSchema = yup.object().shape({
  amount: yup
    .string()
    .required("Valor é obrigatório")
    .min(8, "Digite as casas decimais"),
  amountWithoutMask: yup.string(),
  category: yup.string().required("Categoria é obrigatória"),
  subCategory: yup.string().required("Subcategoria é obrigatória"),
  date: yup.string().required("Data é obrigatória"),
  type: yup.string().required("Tipo é obrigatório"),
});
