// const limit = 12;
// const numUrls = 8;
// const newLinks = createNewLinks2(limit, numUrls);
// console.log(newLinks);

// function createNewLinks(limit, numUrls) {
//     const baseUrl = "https://dummyjson.com/products"
//     const links = [];

//     for (let i = 0; i < numUrls; i++) {
//         const skip = i * limit;
//         const queruParams = new URLSearchParams({
//             limit: limit,
//             skip: skip
//         })
//         const url = `${baseUrl}?${queruParams.toString()}`;
//         links.push(url);
//     }
//     console.log(baseUrl);
//     return links
// }
// function createNewLinks2(limit, skip) {
//     return `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
// }

// function displayResults(page) {
//     const skip = (page - 1) * limit;
//     const url = createNewLinks2(limit, skip)
//     const section = document.getElementById("section");
//     section.innerHTML = '';

//     fetch(url)
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error("error")
//         }).then(data => {
//             const products = data.products;
//             console.log(products);
//             const usersContent = userContainer(products);
//             const section = document.getElementById("section");
//             section.appendChild(usersContent);
//             console.log(data);
//         }).catch(error => {
//             console.error('Error:', error);
//         })
// }



function renderCard(product) {
    const productDiv = document.createElement("div");
    const brand = document.createElement("h1");
    const category = document.createElement("p");
    const description = document.createElement("p");
    const discountPersentage = document.createElement("p");
    const id = document.createElement("p");
    const images = document.createElement("img");
    const price = document.createElement("p");
    const rating = document.createElement("p");
    const stock = document.createElement("p");
    // const thumbnail = document.createElement("img");
    const title = document.createElement("p");
    const likeButton = document.createElement("button")


    productDiv.classList.add("productOneDiv");

    brand.textContent = product.brand;
    images.src = product.images[0];
    images.alt = "photo";
    price.textContent = "price - " + product.price + "$";
    rating.textContent = "rating - " + product.rating;
    stock.textContent = "stock - " + product.stock;
    // thumbnail.src = product.thumbnail;
    title.textContent = product.title;
    likeButton.textContent = "liked";

    productDiv.appendChild(brand);
    productDiv.appendChild(images);
    productDiv.appendChild(price);
    // productDiv.appendChild(thumbnail);
    productDiv.appendChild(title);
    productDiv.appendChild(likeButton);


    const localStorageKey = "likedCount_" + product.id;
    let likeCount = localStorage.getItem(localStorageKey) || 0;
    likeButton.innerHTML = "liked - " + likeCount;

    likeButton.addEventListener("click", function () {
        likeCount++;
        likeButton.innerHTML = "liked - " + likeCount;
        localStorage.setItem(localStorageKey, likeCount);
    });

    productDiv.addEventListener("click", function () {
        console.log("Clicked product with ID:", product.id);
        const clickedproductId = product.id;
        if (clickedproductId) {
            drawproductInfo(product);
        }
    });

    document.body.appendChild(productDiv);

    return productDiv;
}

function drawproductInfo(product) {
    // create DOM elements to display product information
    // set text content and/or src attributes of the elements based on product object properties
    // append the elements to the page (e.g., using document.body.appendChild())

    const section = document.getElementById("section");
    const productDiv1 = document.createElement("div");
    const brand = document.createElement("h1");
    const category = document.createElement("p");
    const description = document.createElement("p");
    const discountPersentage = document.createElement("p");
    const id = document.createElement("p");
    const images = document.createElement("img");
    const price = document.createElement("p");
    const rating = document.createElement("p");
    const stock = document.createElement("p");
    // const thumbnail = document.createElement("img");
    const title = document.createElement("p");

    productDiv1.classList.add("productOneDiv1");
    images.classList.add("img1")
    brand.classList.add("section_title");
    category.classList.add("section_text");
    description.classList.add("section_text");
    id.classList.add("section_text");
    price.classList.add("section_text");
    rating.classList.add("section_text");
    stock.classList.add("section_text");
    title.classList.add("section_text");

    brand.textContent = product.brand;
    category.textContent = product.category;
    description.textContent = product.description;
    discountPersentage.textContent = product.discountPersentage;
    id.textContent = product.id;
    images.src = product.images[0];
    images.alt = "photo";
    price.textContent = "price - " + product.price + "$";
    rating.textContent = "rating - " + product.rating;
    stock.textContent = "stock - " + product.stock;
    // thumbnail.src = product.thumbnail;
    title.textContent = product.title;

    const imagesContainer = document.createElement("div");
    imagesContainer.classList.add("imagesContainer");

    product.images.forEach((imagesrc) => {
        const image = document.createElement("img");
        image.classList.add("productDivimg");
        image.src = imagesrc;
        image.alt = "photo";
        imagesContainer.appendChild(image)
    })


    productDiv1.appendChild(brand);
    productDiv1.appendChild(category);
    productDiv1.appendChild(description);
    productDiv1.appendChild(discountPersentage);
    productDiv1.appendChild(id);
    productDiv1.appendChild(images);
    productDiv1.appendChild(imagesContainer)
    productDiv1.appendChild(price);
    productDiv1.appendChild(rating);
    productDiv1.appendChild(stock);
    // productDiv.appendChild(thumbnail);
    productDiv1.appendChild(title);
    section.innerHTML = "";
    section.appendChild(productDiv1);
}
function userContainer(info) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("mainDiv");
    info.forEach((user) => {
        userDiv.appendChild(renderCard(user));
    });
    return userDiv
}
function userContainer2(info) {
    const userDiv1 = document.createElement('div');
    userDiv1.classList.add("mainDiv");
    info.forEach((user) => {
        userDiv1.appendChild(drawUserInfo(user));
    })
}
// function createPagination() {
//     const paginationContainer = document.getElementById('pagination');

//     for (let i = 1; i <= numUrls; i++) {
//         const link = document.createElement('a');
//         link.href = '#';
//         link.textContent = i;
//         link.addEventListener('click', () => {
//             displayResults(i);
//         });

//         paginationContainer.appendChild(link);
//     }
// }


// displayResults(1);
// createPagination();

let url = "https://dummyjson.com/products";
let currentPage = 1;
let itemsPerPage = 21;

console.log(url);

fetch(`${url}?skip=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("ERROR");
    })
    .then((data) => {
        const products = data.products;
        const totalProducts = data.total;
        const totalPages = Math.ceil(totalProducts / itemsPerPage);
        renderPagination(totalPages);
        renderPage(currentPage, products);
        console.log(products);
    })

function renderPagination(totalPages) {
    const paginationDiv = document.getElementById("pagination");
    const ul = document.createElement("ul");
    ul.classList.add("pagination");
    paginationDiv.appendChild(ul);

    const prevLi = document.createElement("li");
    prevLi.classList.add("page-item");
    ul.appendChild(prevLi);

    const prevA = document.createElement("a");
    prevA.classList.add("page-link");
    prevA.href = "#";
    prevA.textContent = "Previous";
    prevLi.appendChild(prevA);

    prevA.addEventListener("click", (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            const productsDiv = document.getElementById("products");
            while (productsDiv.firstChild) {
                productsDiv.removeChild(productsDiv.firstChild);
            }
            fetch(`${url}?skip=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("ERROR");
                })
                .then((data) => {
                    const products = data.products;
                    renderPage(currentPage, products);
                    updatePageLinks();
                });
        }
    });

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.classList.add("page-item");
        ul.appendChild(li);

        const a = document.createElement("a");
        a.classList.add("page-link");
        a.href = "#";
        a.textContent = i;
        if (i === currentPage) {
            a.classList.add("active");
        }
        li.appendChild(a);

        a.addEventListener("click", (event) => {
            event.preventDefault();
            currentPage = i;
            const productsDiv = document.getElementById("products");
            while (productsDiv.firstChild) {
                productsDiv.removeChild(productsDiv.firstChild);
            }
            fetch(`${url}?skip=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("ERROR");
                })
                .then((data) => {
                    const products = data.products;
                    renderPage(currentPage, products);
                    updatePageLinks();
                });
        });
    }

    const nextLi = document.createElement("li");
    nextLi.classList.add("page-item");
    ul.appendChild(nextLi);

    const nextA = document.createElement("a");
    nextA.classList.add("page-link");
    nextA.href = "#";
    nextA.textContent = "Next";
    nextLi.appendChild(nextA);

    nextA.addEventListener("click", (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            const productsDiv = document.getElementById("products");
            while (productsDiv.firstChild) {
                productsDiv.removeChild(productsDiv.firstChild);
            }
            fetch(`${url}?skip=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("ERROR");
                })
                .then((data) => {
                    const products = data.products;
                    renderPage(currentPage, products);
                    updatePageLinks();
                });
        }
    });

    function updatePageLinks() {
        const pageLinks = document.querySelectorAll(".page-link");
        pageLinks.forEach((link) => {
            if (parseInt(link.textContent) === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }
}

function renderPage(page, products) {
    const skip = (page - 1) * itemsPerPage;
    const take = itemsPerPage;
    const productsDiv = document.getElementById("products");
    const usersContent = userContainer(products, skip, take);
    productsDiv.appendChild(usersContent);
}
let mobileMenu = document.querySelector("ul");
let burger = document.querySelector(".fa-bars");
let xmark = document.querySelector(".fa-xmark");

burger.addEventListener("click", function () {
    mobileMenu.classList.add("show");
    burger.style.display = "none";
    xmark.style.display = "block";
})
xmark.addEventListener("click", function () {
    mobileMenu.classList.remove("show");
    burger.style.display = "block";
    xmark.style.display = "none";
})