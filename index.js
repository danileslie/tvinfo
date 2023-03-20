
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
    const seasonList = document.querySelector('#seasonList');



    let url = `https://api.tvmaze.com/search/shows?q=${choice}`;

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data);

            let seasonID = `https://api.tvmaze.com/shows/${data[0].show.id}/seasons`;



            title.textContent = data[0].show.name;
            image.src = data[0].show.image.original;
            let startDate = new Date(data[0].show.premiered).getFullYear();
            showStart.textContent = startDate;
            avgRuntime.textContent = data[0].show.averageRuntime;
            description.innerHTML = data[0].show.summary;


            if (data[0].show.ended) {
                showEnd.textContent = data[0].show.ended;
            } else {
                showEnd.textContent = 'Now';
            }
            fetch(seasonID)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                    seasonList.innerHTML = '';
                    data.forEach(season => {
                        let seasonEpisodes = `https://api.tvmaze.com/seasons/${season.id}/episodes`;
                        console.log(`Season: ${season.number}, ID: ${season.id}`);
                        const li = document.createElement('li');
                        li.textContent = `Season: ${season.number}`;
                        seasonList.appendChild(li);                  
                    })
                })
                .catch(err => {
                    console.log(`error ${err}`)
                });
        })
}

