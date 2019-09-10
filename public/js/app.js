console.log('Client Side JS is working!')

const weatherForm = document.querySelector('#weatherLocation');
const search = document.querySelector('#weatherLocation > input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (search.value) {
        const messageOne = document.querySelector('#messageOne')
        const messageTwo = document.querySelector('#messageTwo')

        messageOne.textContent = 'loading...'
        messageTwo.textContent = ''


        fetch(`http://localhost:3000/weather?address=${search.value}`)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        return messageOne.textContent = data.error
                    }
    
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                })
        })
    }
})