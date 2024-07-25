export const postProcessStocks = (stocks) => {
  for (let stock of stocks) {
    const categoryKey = stock.category.replace(" ", "_").toLowerCase();

    Object.assign(stock, stock[categoryKey]);
    delete stock[categoryKey];

    delete stock["user_uuid"];

    for (let key in stock) {
      if (stock[key] === null) {
        delete stock[key];
      }
    }
  }
  return stocks;
};
