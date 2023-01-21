import { format, isSameMonth } from "date-fns";
import RNBlob from "react-native-blob-util";
import { ITransaction } from "../context/Transactions/types";
import { getMonth, isSameYear } from "date-fns";
import { date } from "yup";

export class ExportInCsvService {
  public async createCsvFile(data: ITransaction[], date: Date) {
    const fileName = `data-${getMonth(date) + 1}-${date.getFullYear()}.csv`;
    let totalValue = 0;
    const dataFormatted = data.map((transaction) => {
      const dateFormatted = format(new Date(transaction.date), "dd/MM/yyyy");
      const sameYear = isSameYear(new Date(transaction.date), date);
      const sameMonth = isSameMonth(new Date(transaction.date), date);

      if (!sameYear || !sameMonth) return;

      const item = [
        dateFormatted,
        transaction.category,
        transaction.amount.replace(",", "."),
        transaction.type === "income" ? "Receita" : "Despesa",
      ];
      totalValue += Number(transaction.amountWithoutMask) / 100;
      return item;
    });

    dataFormatted.push([
      "Total",
      "--",
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
        .format(totalValue)
        .replace(",", "."),
      "--",
    ]);

    const headerString = "Data,Categoria,Valor,Tipo\n";
    const rowString = dataFormatted
      .map((d) => `${d[0]},${d[1]},${d[2]},${d[3]}\n`)
      .join(" ");
    const csvString = `${headerString}${rowString}`;

    const pathToWrite = `${RNBlob.fs.dirs.DownloadDir}/${fileName}.csv`;
    RNBlob.fs
      .writeFile(pathToWrite, csvString, "utf8")
      .then(() => {
        RNBlob.ios.openDocument(pathToWrite);
      })
      .catch((error) => console.error(error));
  }
}
