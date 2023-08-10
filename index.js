
document.querySelector('#getShow').addEventListener('click', getFetch)

function getFetch() {

    const choice = document.querySelector('#showName').value.toLowerCase();
    console.log(choice);
    const image = document.querySelector('#poster');
    const title = document.querySelector('#title');
    const showStart = document.querySelector('#showStart');
    const showEnd = document.querySelector('#showEnd');
    const avgRuntime = document.querySelector('#avgRuntime');
    const description = document.querySelector('#description');
    const showInfo = document.querySelector('.showInfo');
    



    let url = `https://api.tvmaze.com/search/shows?q=${choice}`;

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data);

            if (window.getComputedStyle(showInfo).display === 'none'){
                showInfo.style.display = 'block';
            }
            title.textContent = data[0].show.name;
            image.src = data[0].show.image.original;
            let startDate = new Date(data[0].show.premiered).getFullYear();
            showStart.textContent = startDate;
            avgRuntime.textContent = `~ ${data[0].show.averageRuntime} minutes / episode`;
            console.log(data[0].show);
            description.innerHTML = data[0].show.summary;

            if (data[0].show.ended) {
                let endDate = new Date(data[0].show.ended).getFullYear();
                showEnd.textContent = endDate;
               
            } else {
                showEnd.textContent = 'Now';
            }
           
        })
}

