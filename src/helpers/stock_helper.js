export const postProcessStocks = (stocks) => {
  for (let i = 0; i < stocks.length; i++) {
    let stock = stocks[i];

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
