function updateDateTime(){
    const currentTimezone = localStorage.getItem('selectedTimezone') || dayjs.tz.guess()

    const now = dayjs().tz(currentTimezone)

    const time = now.format('HH:mm:ss')
    const date = now.format('dddd, MMMM D, YYYY')

    document.getElementById('time').innerText = time
    document.getElementById('date').innerText = date

    document.getElementById('timezone').innerText = currentTimezone.replace(/_/g, ' ').split('/').join(' / ')
}

function populateTimezones(){
    const timezoneSelect = document.getElementById('timezones')
    const timezones = Intl.supportedValuesOf('timeZone')

    timezoneSelect.innerHTML = '';

    const currentTimezone = localStorage.getItem('selectedTimezone') || dayjs.tz.guess()

    timezones.forEach(tz => {
        const option = document.createElement('option')
        option.value = tz
        option.innerText = tz
        if (tz === currentTimezone) {
            option.selected = true
        }
        timezoneSelect.appendChild(option)
    })
}

function setupTimezoneChange(){
    const timezoneSelect = document.getElementById('timezones')
    const applyButton = document.querySelector('.apply-btn')
    const getTzButton = document.querySelector('.get-tz-btn')

    applyButton.addEventListener('click', () => {
        const selectedTimezone = timezoneSelect.value

        localStorage.setItem('selectedTimezone', selectedTimezone)

        updateDateTime()
    })

    getTzButton.addEventListener('click', () => {
        const userTimezone = dayjs.tz.guess()

        timezoneSelect.value = userTimezone
    })
}

updateDateTime()
setInterval(updateDateTime, 1000)

document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init()
    populateTimezones()
    setupTimezoneChange()
})

