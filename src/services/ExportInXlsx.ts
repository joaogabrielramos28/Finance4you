import { format, isSameMonth, isSameYear } from "date-fns";
import RNBlob from "react-native-blob-util";
import XLSX from "xlsx";

import { ITransaction } from "../context/Transactions/types";

export class ExportInXlsxService {
  public async createXlsxFile(data: ITransaction[], date: Date) {
    let totalValue = 0;
    const dataFormatted = data.map((transaction) => {
      const dateFormatted = format(new Date(transaction.date), "dd/MM/yyyy");
      const sameYear = isSameYear(new Date(transaction.date), date);
      const sameMonth = isSameMonth(new Date(transaction.date), date);

      if (!sameYear || !sameMonth) return;

      const item = {
        Data: dateFormatted,
        Categoria: transaction.category,
        Valor: transaction.amount.replace(",", "."),
        Tipo: transaction.type === "income" ? "Receita" : "Despesa",
      };

      totalValue += Number(transaction.amountWithoutMask) / 100;
      return item;
    });

    dataFormatted.push({
      Data: "Total",

      Valor: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
        .format(totalValue)
        .replace(",", "."),
    } as any);

    var ws = XLSX.utils.json_to_sheet(dataFormatted, {
      header: ["Data", "Categoria", "Valor", "Tipo"],
      cellStyles: true,
      sheetStubs: true,
    });
    var wb = XLSX.utils.book_new();
    XLSX.utils.encode_cell({ c: 0, r: 2 });

    XLSX.utils.book_append_sheet(wb, ws, "Gastos");
    const wbout = XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });

    const uri = RNBlob.fs.dirs.DocumentDir + "/gastos.xlsx";

    RNBlob.fs
      .writeFile(uri, wbout, "base64")
      .then(() => {
        RNBlob.ios.openDocument(uri);
      })
      .catch((error) => console.error(error));
  }
}
