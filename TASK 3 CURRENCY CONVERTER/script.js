const dropList = document.querySelectorAll("form select"),
      fromCurrency = document.querySelector(".from select"),
      toCurrency = document.querySelector(".to select"),
      getButton = document.querySelector("form button");

let country_list = {
    "AED": "AE",
    "AFN": "AF",
    "XCD": "AG",
    "ALL": "AL",
    "AMD": "AM",
    "ANG": "AN",
    "AOA": "AO",
    "AQD": "AQ",
    "ARS": "AR",
    "AUD": "AU",
    "AZN": "AZ",
    "BAM": "BA",
    "BBD": "BB",
    "BDT": "BD",
    "XOF": "BE",
    "BGN": "BG",
    "BHD": "BH",
    "BIF": "BI",
    "BMD": "BM",
    "BND": "BN",
    "BOB": "BO",
    "BRL": "BR",
    "BSD": "BS",
    "NOK": "BV",
    "BWP": "BW",
    "BYR": "BY",
    "BZD": "BZ",
    "CAD": "CA",
    "CDF": "CD",
    "XAF": "CF",
    "CHF": "CH",
    "CLP": "CL",
    "CNY": "CN",
    "COP": "CO",
    "CRC": "CR",
    "CUP": "CU",
    "CVE": "CV",
    "CYP": "CY",
    "CZK": "CZ",
    "DJF": "DJ",
    "DKK": "DK",
    "DOP": "DO",
    "DZD": "DZ",
    "ECS": "EC",
    "EEK": "EE",
    "EGP": "EG",
    "ETB": "ET",
    "EUR": "FR",
    "FJD": "FJ",
    "FKP": "FK",
    "GBP": "GB",
    "GEL": "GE",
    "GGP": "GG",
    "GHS": "GH",
    "GIP": "GI",
    "GMD": "GM",
    "GNF": "GN",
    "GTQ": "GT",
    "GYD": "GY",
    "HKD": "HK",
    "HNL": "HN",
    "HRK": "HR",
    "HTG": "HT",
    "HUF": "HU",
    "IDR": "ID",
    "ILS": "IL",
    "INR": "IN",
    "IQD": "IQ",
    "IRR": "IR",
    "ISK": "IS",
    "JMD": "JM",
    "JOD": "JO",
    "JPY": "JP",
    "KES": "KE",
    "KGS": "KG",
    "KHR": "KH",
    "KMF": "KM",
    "KPW": "KP",
    "KRW": "KR",
    "KWD": "KW",
    "KYD": "KY",
    "KZT": "KZ",
    "LAK": "LA",
    "LBP": "LB",
    "LKR": "LK",
    "LRD": "LR",
    "LSL": "LS",
    "LTL": "LT",
    "LVL": "LV",
    "LYD": "LY",
    "MAD": "MA",
    "MDL": "MD",
    "MGA": "MG",
    "MKD": "MK",
    "MMK": "MM",
    "MNT": "MN",
    "MOP": "MO",
    "MRO": "MR",
    "MTL": "MT",
    "MUR": "MU",
    "MVR": "MV",
    "MWK": "MW",
    "MXN": "MX",
    "MYR": "MY",
    "MZN": "MZ",
    "NAD": "NA",
    "XPF": "NC",
    "NGN": "NG",
    "NIO": "NI",
    "NPR": "NP",
    "NZD": "NZ",
    "OMR": "OM",
    "PAB": "PA",
    "PEN": "PE",
    "PGK": "PG",
    "PHP": "PH",
    "PKR": "PK",
    "PLN": "PL",
    "PYG": "PY",
    "QAR": "QA",
    "RON": "RO",
    "RSD": "RS",
    "RUB": "RU",
    "RWF": "RW",
    "SAR": "SA",
    "SBD": "SB",
    "SCR": "SC",
    "SDG": "SD",
    "SEK": "SE",
    "SGD": "SG",
    "SKK": "SK",
    "SLL": "SL",
    "SOS": "SO",
    "SRD": "SR",
    "STD": "ST",
    "SVC": "SV",
    "SYP": "SY",
    "SZL": "SZ",
    "THB": "TH",
    "TJS": "TJ",
    "TMT": "TM",
    "TND": "TN",
    "TOP": "TO",
    "TRY": "TR",
    "TTD": "TT",
    "TWD": "TW",
    "TZS": "TZ",
    "UAH": "UA",
    "UGX": "UG",
    "USD": "US",
    "UYU": "UY",
    "UZS": "UZ",
    "VEF": "VE",
    "VND": "VN",
    "VUV": "VU",
    "YER": "YE",
    "ZAR": "ZA",
    "ZMK": "ZM",
    "ZWD": "ZW"
};

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        let selected = (i == 0 && currency_code == "USD") ? "selected" : (i == 1 && currency_code == "AFN") ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for (let code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCurrency.value}`;
    console.log("Fetching URL: ", url); // Debug log
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then(result => {
        console.log("API Result: ", result); // Debug log
        if (result.conversion_rates) {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        } else {
            throw new Error("Invalid response data");
        }
    }).catch(error => {
        console.error("Error fetching exchange rate:", error);
        exchangeRateTxt.innerText = "Getting exchange rate";
    });
}
function getExchangeRate() {
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let apiKey = "YOUR_API_KEY"; // Replace with your ExchangeRate-API key
    let url = `https://v6.exchangerate-api.com/v6/a834892c4336018b14af65c1/latest/USD`;
    console.log("Fetching URL: ", url); // Debug log
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(result => {
            console.log("API Result: ", result); // Debug log
            if (result.conversion_rates) {
                let exchangeRate = result.conversion_rates[toCurrency.value];
                let totalExRate = (amountVal * exchangeRate).toFixed(2);
                exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
            } else {
                throw new Error("Invalid response data");
            }
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            exchangeRateTxt.innerText = "Something went wrong";
        });
}
