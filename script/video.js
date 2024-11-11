// console.log('Video Script Added');

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
            <figure class="h-[200px]">
                <img class="h-full w-full object-cover" src=${video.thumbnail} alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
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