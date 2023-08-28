let selectTag = document.querySelectorAll("select");
let btn = document.getElementById("btn");
let fromText = document.getElementById("from");
let toText = document.getElementById("to");
let exchange = document.getElementById("exchange");
let icons = document.querySelectorAll(".ic i")

selectTag.forEach((e,id) =>{
    for (let countrie_code in countries) {
        
        // select english as default language in from text and hindi as default in to text
        let selected;
        if(id == 0 && countrie_code == "en-GB"){
            selected = "selected"
        }
        else if(id == 1 && countrie_code == "hi-IN"){
            selected = "selected"
        }
        
        let option = `<option value="${countrie_code}" ${selected}>${countries[countrie_code]}</option>`;
        e.insertAdjacentHTML("beforeend",option) // adding option inside select
    }
})


exchange.addEventListener("click",()=>{
    let tempText = fromText.value;
    let tempLang = selectTag[0].value
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value
    toText.value = tempText;
    selectTag[1].value = tempLang
})


btn.addEventListener("click",()=>{
    let text = fromText.value;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;

    if(!text) return;
    toText.setAttribute("placeholder","Translating...")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res =>res.json()).then(data=>{
        console.log(data);
        toText.value = data.responseData.translatedText
        toText.setAttribute("placeholder","Translation")
    })

    
})



icons.forEach( e =>{
    e.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "frome"){
                navigator.clipboard.writeText(fromText.value)
            }else{
                navigator.clipboard.writeText(toText.value)
            }
        }else{
            let utternace;
            if(target.id == "frome"){
                utternace = new SpeechSynthesisUtterance(fromText.value)
                utternace.lang = selectTag[0].value;
            }else{
                utternace = new SpeechSynthesisUtterance(toText.value)
                utternace.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utternace)
        }
    })
})