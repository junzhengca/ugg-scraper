const { getJsonResponse } = require("./scraping");
const { sleep } = require("./utils");
const dotenv = require("dotenv");
const Push = require("pushover-notifications");

dotenv.config();

const PRODUCT_URL_MAP = {
  "browns Size 5":
    "https://www.brownsshoes.com/on/demandware.store/Sites-BrownsShoes-Site/en/Product-Variation?ajax=true&dwvar_263195_color=030&dwvar_263195_size=5&pid=263195&quantity=1",
  "browns Size 6":
    "https://www.brownsshoes.com/on/demandware.store/Sites-BrownsShoes-Site/en/Product-Variation?ajax=true&dwvar_263195_color=030&dwvar_263195_size=6&pid=263195&quantity=1",
};

(async () => {
  while (true) {
    for (const product in PRODUCT_URL_MAP) {
      const url = PRODUCT_URL_MAP[product];
      const push = new Push({
        user: process.env["PUSHOVER_USER"],
        token: process.env["PUSHOVER_TOKEN"],
      });
      const result = await getJsonResponse(url);
      if (!result) continue;
      const resultProduct = result.product;
      if (resultProduct.available) {
        push.send({
          message: `Product "${product}" is available, go to ${url}`,
          title: `Product "${product}" is available`,
        });
        console.log(`Product "${product}" is available`);
      } else {
        console.log(`Product "${product}" is not available`);
      }
    }
    // Sleep for 3 hours
    await sleep(1000 * 60 * 60 * 3);
  }
})();
