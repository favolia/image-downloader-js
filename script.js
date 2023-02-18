const MY_URL = document.querySelector('#myUrl')
const BUTTON_DOWNLOAD = document.querySelector('#buttonDownload')

BUTTON_DOWNLOAD.addEventListener('click', e => {
    e.preventDefault()
    BUTTON_DOWNLOAD.textContent = 'Prosess...'
    fetchFile(MY_URL.value);
})

function fetchFile(url) {
    if (url.length > 0) {
        if (url.startsWith('https')) {
            fetch(url).then(res => res.blob()).then(file => {
                let tempUrl = URL.createObjectURL(file)
                let tag = document.createElement('a')
                tag.href = tempUrl;
                tag.download = url.replace(/^.*[\\\/.png]/, '') + '.png'
                document.body.appendChild(tag)
                tag.click()
                tag.remove()
                console.log(tempUrl); 
                URL.revokeObjectURL(tempUrl);
                BUTTON_DOWNLOAD.innerHTML = 'Done'
                setTimeout(() => {
                    BUTTON_DOWNLOAD.textContent = 'Download Lagi?'
                }, 2000);
            }).catch((e) => {
                BUTTON_DOWNLOAD.innerHTML = 'Waduh gabisa mas bro'
                setTimeout(() => {
                    BUTTON_DOWNLOAD.textContent = 'Download'
                }, 2000);
                console.log(e);
            })
        } else {
            BUTTON_DOWNLOAD.innerHTML = 'Salah linknya mas bro'
            setTimeout(() => {
                BUTTON_DOWNLOAD.textContent = 'Download'
            }, 2000);
        }
    } else {
        BUTTON_DOWNLOAD.innerHTML = 'Linknya mas bro'
        setTimeout(() => {
            BUTTON_DOWNLOAD.textContent = 'Download'
        }, 2000);
    }
}