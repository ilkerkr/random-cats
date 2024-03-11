const loading = document.getElementById("loading");
const time = document.getElementById("time");
const button = document.getElementById("button");
const containerDiv = document.getElementById("containerDiv");
const container = document.getElementById("container");

window.addEventListener("load", () => {
    setTimeout(() => {
        container.classList.remove("d-none");
        loading.classList.add("d-none");
    }, 3000);
});

const showTime = () => {
    time.textContent = new Date().toLocaleString();
    time.style.fontSize = "1.8rem";
    time.style.color = "red";
};

const randomCats = async () => {
    const URL = "https://api.thecatapi.com/v1/images/search?limit=10";

    try {
        const res = await fetch(URL);
        if(!res.ok){
            throw new Error(`${res.status}`);
        };

        const data = await res.json();
        displayCats(data);
    } catch (error) {
        containerDiv.innerHTML = `<img src="./img/error.gif" class="h-100 w-100">`;
    }
};

const displayCats = (cat) => {
    cat.forEach(({url}) => {
        containerDiv.innerHTML +=    `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div style="height:200px;" class="mt-3">
                <img src="${url}" class="w-100 h-100 rounded-4" alt="...">
            </div>
        </div>
        `;
    });
};

randomCats();
setInterval(showTime, 1000);

button.addEventListener("click", () => {
    containerDiv.innerHTML = "";
    randomCats();
})