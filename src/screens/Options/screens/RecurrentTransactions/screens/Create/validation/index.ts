import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .string()
    .required("Valor é obrigatório")
    .min(8, "Digite as casas decimais"),
  amountWithoutMask: yup.string(),
  category: yup.string().required("Categoria é obrigatória"),
  subCategory: yup.string().required("Subcategoria é obrigatória"),
});
