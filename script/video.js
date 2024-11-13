// console.log('Video Script Added');

function getTimeString(time){   
    const hour = parseInt(time / 3600);
    let remainingTime = time % 3600;
    const minute = parseInt(remainingTime / 60);
    remainingTime = remainingTime % 60;

    if(hour > 24){
        const day = parseInt( hour / 24 );
        const hour2 = parseInt( hour % 24 );
        if( day > 30){
            const month = parseInt( day / 30);
            if(month > 12){
                const year = parseInt(month / 12);
                const remainingMonth = month % 12;
                return `${year}y ${remainingMonth}m ago`; 
            }
            return `${month} month ago`;
        }
        return `${day}d ${hour2}h ${minute}m ${remainingTime}s ago`;
    }    
    return `${hour}h ${minute}m ${remainingTime}s ago`;
}

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    // buttons is an html collection which is an array like object
    for(let btn of buttons){
        btn.classList.remove("active");
    }
}

const loadCategories = () => {
    // console.log('load categories function created');
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
}

const loadVideos = (searchText = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const loadCategoryVideos = (id) =>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            //remove active status from every button
            removeActiveClass();
            // active id or class
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");
            displayVideos(data.category)
        })
        .catch(error => console.log(error));
};

const loadDetails = async(videoId) => {
   const url = ` https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
   const res = await fetch(url);
   const data = await res.json();
   displayDetails(data.video);

}

const displayDetails = (video) => {
    console.log(video);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
        <img src= ${video.thumbnail}/>
        <p>${video.description}</p>
    `;
    document.getElementById('showModalData').click();

    //showModal() function is given by daisyUI
    // document.getElementById('customModal').showModal();
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        console.log(item);

        //create a div and a button inside it
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =  `
            <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadCategoryVideos(${item.category_id})">
                ${item.category}
            </button>
        `
        // const button = document.createElement('button');
        // button.classList = "btn";
        // button.innerText = item.category;
        categoryContainer.append(buttonContainer);
    });
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class="min-h-[600px] w-full flex flex-col gap-5 justify-center items-center">
                <img src="./assets/icon.png"/>
                <h2 class="text-center text-xl font-bold">No Content Here In This Category</h2>
            </div>
        `;
        return;
    }else{
        videoContainer.classList.add('grid');
    }


    videos.forEach((video) => {
        console.log(video);
        //create a div
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img class="h-full w-full object-cover" src=${video.thumbnail} alt="thumbnail" />
                
                ${video.others.posted_date?.length === 0
                    ? ""
                    : `<span class="absolute right-2 bottom-2 bg-black text-white text-xs rounded p-1">${getTimeString(video.others.posted_date)}</span>`
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
                    <p><button onclick="loadDetails('${video.video_id}')" class="mt-2 btn btn-sm btn-error">Details</button> </p>
                    </div>

            </div>    
        `;
        videoContainer.append(card);
    })
}

// const cardDemo = () => {

// }

document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value);
});

loadCategories();
loadVideos();