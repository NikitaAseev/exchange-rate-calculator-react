const apiKey = "362616745a823e3c53fe4dd0"; // This is my API key, replace it with yours in production!
const url = `https://prime.exchangerate-api.com/v5/${apiKey}/latest/`; 

/**
 * Gets Rates from server.
 * 
 * @param {string} val - Currency name in UPPERCASE, ex. "USD".
 * @return {object} - Object with currenies as keys and rates as integer values.
 */
function getRate(val) {
    return fetch(url + val).then(res => {
        return res.json().then(data => {
            let rates = data && data.conversion_rates ? data.conversion_rates : { "USD": 1, "EUR": 0.912211 };
            return rates;
        })
    });
}

export default getRate;