function updateDateTime(){
    const now = dayjs()

    const time = now.format('HH:mm:ss')
    const date = now.format('dddd, MMMM D, YYYY')

    document.getElementById('time').innerText = time
    document.getElementById('date').innerText = date
}

updateDateTime()
setInterval(updateDateTime, 1000)