const API = "https://api.fastforex.io";
const API_KEY = "6674d1458b-793c0c260a-sb28sz";
const getCurrencyOptions = () => {
  return fetch(`${API}/currencies?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => json.currencies)
    .catch((error) => {
      console.log("Error", error);
    });
};
const convertCurrency = (from, to, amount) => {
  return fetch(
    `${API}/convert?from=${from}&to=${to}&amount=${amount}&api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => json.result[to])
    .catch((error) => {
      console.log("Error", error);
    });
};
const setupCurrencies = () => {
  const fromCurrencyElem = $("#fromCurrency");
  const toCurrencyElem = $("#toCurrency");
  getCurrencyOptions().then((currencyOptions) => {
    const currencies = Object.keys(currencyOptions);
    populateSelectElement(fromCurrencyElem, currencies);
    populateSelectElement(toCurrencyElem, currencies);
  });
};
const populateSelectElement = (selectElement, optionList) => {
  optionList.forEach((optionItem) => {
    const optionElement = $("<option>").val(optionItem).text(optionItem);
    selectElement.append(optionElement);
  });
};
const setupEventListener = () => {
  const formElement = $("#convertForm");
  formElement.submit(async (event) => {
    event.preventDefault();
    const fromCurrency = $("#fromCurrency").val();
    const toCurrency = $("#toCurrency").val();
    const amount = $("#amount").val();
    const convertResultElem = $("#convertResult");

    try {
      const value = await convertCurrency(fromCurrency, toCurrency, amount);
      const conversionResult = value.toFixed(2);
      convertResultElem.text(
        `${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`
      );
    } catch (error) {
      console.log("Error:", error);
    }
  });
};
$(document).ready(() => {
  setupCurrencies();
  setupEventListener();
});
