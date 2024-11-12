// console.log('Video Script Added');

function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingTime = time % 3600;
    const minute = parseInt(remainingTime / 60);
    remainingTime = remainingTime % 60;
    return `${hour}h ${minute}m ${remainingTime}s ago`
}

const loadCategories = () => {
    // console.log('load categories function created');
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => console.log(displayCategories(data.categories)))
        .catch(error => console.log(error));
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        console.log(item);

        const button = document.createElement('button');
        button.classList = "btn";
        button.innerText = item.category;
        categoryContainer.append(button);
    });
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img class="h-full w-full object-cover" src=${video.thumbnail} alt="thumbnail" />
                
                ${video.others.posted_date?.length === 0
                    ? ""
                    : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
                 }

            </figure>
            <div class="px-0 py-4 flex gap-2">
                <div>
                    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
                </div>
                <div>
                    <h2 class="font-bold">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p>${video.authors[0].profile_name}</p>
                        
                        ${
                            video.authors[0].verified === true 
                            ?  `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
                            : ""
                        }
                    </div>
                    <p>${video.others.views} views</p>
                </div>
            </div>    
        `;
        videoContainer.append(card);
    })
}

// const cardDemo = () => {

// }

loadCategories();
loadVideos();