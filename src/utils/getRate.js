const url = `https://v6.exchangerate-api.com/v6/a64c96d4054d9388ef40e893/latest/`; //If you want to learn more about the api visit https://api.exchangeratesapi.io

/**
 * Gets Rates from server.
 * 
 * @param {string} val - Currency name in UPPERCASE, ex. "USD".
 * @return {object} - Object with currenies as keys and rates as integer values.
 */
function getRate(val) {
    let newUrl = url + val;
    console.log(newUrl)
    return fetch(newUrl).then(res => {
        return res.json().then(data => {
            console.log(data)
            let rates = data && data.conversion_rates ? data.conversion_rates : { "USD": 1, "EUR": 1 };
            return rates;
        })
    });
}

export default getRate;