import { format, isSameMonth, isSameYear } from "date-fns";
import RNBlob from "react-native-blob-util";
import XLSX from "xlsx";

import { ITransaction } from "../context/Transactions/types";

export class ExportInXlsxService {
  public async createXlsxFile(
    data: ITransaction[],
    date: Date,
    userName: string
  ) {
    let totalValue = 0;
    let totalRevenue = 0;
    const dataFormatted = data
      .map((transaction) => {
        const dateFormatted = format(new Date(transaction.date), "dd/MM/yyyy");
        const sameYear = isSameYear(new Date(transaction.date), date);
        const sameMonth = isSameMonth(new Date(transaction.date), date);

        if (!sameYear || !sameMonth) return;

        const item = {
          Data: dateFormatted,
          Categoria: transaction.category,
          Valor: transaction.amount.replace(",", "."),
          Responsável: transaction.responsible
            ? transaction.responsible
            : userName,
          Tipo: transaction.type === "income" ? "Receita" : "Despesa",
        };

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

    dataFormatted.push({
      Data: "Total",
      Valor: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
        .format(totalValue)
        .replace(",", "."),
    } as any);
    dataFormatted.push({
      Data: "Receita",
      Valor: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
        .format(totalRevenue)
        .replace(",", "."),
    } as any);
    dataFormatted.push({
      Data: "Saldo",
      Valor: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
        .format(totalRevenue - totalValue)
        .replace(",", "."),
    } as any);

    var ws = XLSX.utils.json_to_sheet(dataFormatted, {
      header: ["Data", "Categoria", "Valor", "Tipo"],
      cellStyles: true,
      sheetStubs: true,
    });
    var wb = XLSX.utils.book_new();

    ws["!cols"] = [
      { width: 12 },
      { width: 12 },
      { width: 16 },
      { width: 10 },
      { width: 16 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Gastos");
    const wbout = XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });

    const uri =
      RNBlob.fs.dirs.DocumentDir + `/Gastos-${format(date, "MM-yyyy")}.xlsx`;

    RNBlob.fs
      .writeFile(uri, wbout, "base64")
      .then(() => {
        RNBlob.ios.openDocument(uri);
      })
      .catch((error) => console.error(error));
  }
}
