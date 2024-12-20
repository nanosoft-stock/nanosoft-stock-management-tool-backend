export const postProcessStocks = (stocks: any[]): any[] => {
  for (let i = 0; i < stocks.length; i++) {
    const stock = stocks[i];

    if ("category" in stock) {
      const categoryKey = stock.category.replace(" ", "_").toLowerCase();

      if (categoryKey in stock) {
        stock["specifications"] = stock[categoryKey];
        delete stock[categoryKey];
      }

      if ("user_uuid" in stock) {
        delete stock["user_uuid"];
      }
    }
  }

  return stocks;
};
