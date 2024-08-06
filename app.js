const baseURL = "https://latest.currency-api.pages.dev/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn =document.querySelector(".btn")
const fromCurrency = document.querySelector(".form select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount = document.querySelector(".amount input");



for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
       

    }
    select.addEventListener("change",(event) =>{
        updateFlag(event.target);
    });
}


const updateFlag = (element) =>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}
let finalAmount= (rate) =>{
    let totalAmount = rate *amount.value;
    console.log(totalAmount);
    msg.innerText =`${amount.value} ${fromCurrency.value} = ${totalAmount.toFixed(2)} ${toCurrency.value}`;

}
const getExchangeRate = (fromcurr,tocurr,data) =>{
    let countrycode = data[fromcurr];
    for(let key in countrycode){
    
        if(key === tocurr){
            
            let rate =countrycode[key];
            finalAmount(rate);
            
            
        }
        
    }

}




btn.addEventListener("click" , async() =>{
    event.preventDefault();
    
    let amountVal = amount.value;
    const URL = `${baseURL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    const fromcurr = fromCurrency.value.toLowerCase();
    const tocurr = toCurrency.value.toLowerCase();
    getExchangeRate(fromcurr,tocurr,data);
    
    
    
})



