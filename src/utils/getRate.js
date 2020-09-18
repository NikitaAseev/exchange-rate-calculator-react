const url = `https://api.exchangeratesapi.io/latest?base=`; //If you want to learn more about the api visit https://api.exchangeratesapi.io

/**
 * Gets Rates from server.
 * 
 * @param {string} val - Currency name in UPPERCASE, ex. "USD".
 * @return {object} - Object with currenies as keys and rates as integer values.
 */
function getRate(val) {
    return fetch(url + val).then(res => {
        return res.json().then(data => {
            let rates = data && data.rates ? data.rates : { "USD": 1, "EUR": 1 };
            return rates;
        })
    });
}

export default getRate;