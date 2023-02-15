import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup.string().required("Valor é obrigatório"),
  amountWithoutMask: yup.string(),
  category: yup.string().required("Categoria é obrigatória"),
  subCategory: yup.string().required("Subcategoria é obrigatória"),
  date: yup.string().required("Data é obrigatória"),
});
