const weatherForm = document.querySelector('form')
const locationMsg = document.querySelector('form .location')
const foreCastMsg = document.querySelector('form .foreCast')
const input = document.querySelector('input')

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const searchTerm = input.value;
    locationMsg.textContent = 'Loading...'
    foreCastMsg.textContent = ''

    if(searchTerm === '') {
        locationMsg.textContent = 'Unable to find location! Try another search.'
        return;
    }

    fetch('/weather?address=' + searchTerm).then((response) => {
        response.json().then((data) => {
            if(data.err) {
                locationMsg.textContent = data.err
            } else {
                locationMsg.innerHTML = data.location
                foreCastMsg.innerHTML = data.foreCast
            }
        })
    })
    document.getElementById('myinput').value = ''
})









