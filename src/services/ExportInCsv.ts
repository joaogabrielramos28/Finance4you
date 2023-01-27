import { format, isSameMonth } from "date-fns";
import RNBlob from "react-native-blob-util";
import { ITransaction } from "../context/Transactions/types";
import { getMonth, isSameYear } from "date-fns";
import { useAuth } from "@context/Auth/AuthContext";
export class ExportInCsvService {
  public async createCsvFile(
    data: ITransaction[],
    date: Date,
    userName: string
  ) {
    const fileName = `${new Date().getTime()}-${
      getMonth(date) + 1
    }-${date.getFullYear()}.csv`;
    let totalValue = 0;
    let totalRevenue = 0;
    const dataFormatted = data
      .map((transaction) => {
        const dateFormatted = format(new Date(transaction.date), "dd/MM/yyyy");
        const sameYear = isSameYear(new Date(transaction.date), date);
        const sameMonth = isSameMonth(new Date(transaction.date), date);

        if (!sameYear || !sameMonth) return;

        const item = [
          dateFormatted,
          transaction.category,
          transaction.amount.replace(",", "."),
          transaction.type === "income" ? "Receita" : "Despesa",
          transaction.responsible ? transaction.responsible : userName,
        ];

        totalValue +=
          transaction.type === "outcome"
            ? Number(transaction.amountWithoutMask) / 100
            : 0;
        totalRevenue +=
          transaction.type === "income"
            ? Number(transaction.amountWithoutMask) / 100
            : 0;

        return item;
      })
      .filter((data) => data !== undefined);

    dataFormatted.push([
      "Gasto Total",
      "--",
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
        .format(totalValue)
        .replace(",", "."),
      "--",
      "--",
    ]);
    dataFormatted.push([
      "Ganho Total",
      "--",
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
        .format(totalRevenue)
        .replace(",", "."),
      "--",
      "--",
    ]);
    dataFormatted.push([
      "Saldo",
      "--",
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
        .format(totalRevenue - totalValue)
        .replace(",", "."),
      "--",
      "--",
    ] as any);

    const headerString = "Data,Categoria,Valor,Tipo,Responsável\n";
    const rowString = dataFormatted
      .map((d: any) => `${d[0]},${d[1]},${d[2]},${d[3]},${d[4]}\n`)
      .join(" ");
    const csvString = `${headerString}${rowString}`;

    const pathToWrite = `${RNBlob.fs.dirs.DocumentDir}/${fileName}`;

    RNBlob.fs
      .writeFile(pathToWrite, csvString, "utf8")
      .then(() => {
        RNBlob.ios.openDocument(pathToWrite);
      })
      .catch((error) => console.error(error));
  }
}
