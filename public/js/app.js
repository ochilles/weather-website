// client side javascript file

// fetch json data from url
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     // parsing json data to an object then print
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// Wire-up form with app
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

// Change text in paragraph
// messageOne.textContent = 'From JS'


weatherForm.addEventListener('submit', (e) => {
    // prevent default bahavior of refreshing a browser
    e.preventDefault()

    // get search value from input
    const location = search.value

    // Loading message after submit
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    // parsing json data to an object then print
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})