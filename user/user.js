$(document).ready(function(){
    const listItems = document.querySelector('.menu').children
    const listArray = Array.from(listItems)
    $(".nav-btn").click(function(index){
        var interval = 100      
        listArray.forEach(function (i, index) {
            setTimeout(function () {
                i.classList.toggle("show")
            }, index * interval)
        })
    })

    $(".nav-btn").click(function(){
        if (document.querySelector(".icon1").getAttribute("class").endsWith("topAnim"))
        { 
            document.querySelector(".menu-btn").innerHTML = "Menu"
        }

        else if (document.querySelector(".icon1").getAttribute("class").endsWith("icon1"))
        {
            document.querySelector(".menu-btn").innerHTML = "Close"
        }

        $(".icon1").toggleClass("topAnim")
        $(".icon2").toggleClass("midAnim")
        $(".icon3").toggleClass("botAnim")
    })

    $(".search-icon").click(function(){
        let search = $("#search").val()
        localStorage.setItem("search", search)
        location.href = '/booklist/booklist.html'
    })

    $(".delete-profile-button").click(function(){
        document.querySelector(".delete-account-content-container").style.display = "block"
    })

    $(".confirm-delete").click(function(){
        let user = JSON.parse(localStorage.getItem("user"))
        
    })

    $(".cancel-delete").click(function(){
        console.log("hello")
        document.querySelector(".delete-account-content-container").style.display = "none"
    })

    function loadUserNavPfp(){
        if(JSON.parse(localStorage.getItem("user")) != null)
        {
            let user = JSON.parse(localStorage.getItem("user"))
            document.querySelector(".profile").innerHTML = `<img src = "https://nathaninteractivedev-4002.restdb.io/media/${user.Profilepic}" class = "nav-pfp" width = "60">`
        }

        else
        {
            return
        }

    }

    function loadUserPfp(){
        if(JSON.parse(localStorage.getItem("user")) != null){
            let user = JSON.parse(localStorage.getItem("user"))
            document.querySelector(".profile-pic").innerHTML = `<img src = "https://nathaninteractivedev-4002.restdb.io/media/${user.Profilepic}" class = "pfp" width = "100px">`

            document.querySelector(".profile-name").innerHTML = user.Username
        }

        else
        {
            return
        }
    }

    function loadUserData(){
        if(JSON.parse(localStorage.getItem("user")) != null){
            let user = JSON.parse(localStorage.getItem("user"))
            let booklist = JSON.parse(localStorage.getItem("booklist"))
            let reviewlist = JSON.parse(localStorage.getItem("reviewlist"))
            $(".books-liked-button").click(function(){
                $(".delete-account-container").html('');
                $(".user-reviews-container").html ('');
                $(".user-books-added-container").html('');
                $(".user-books-viewed-container").html('');
                for(let i = 0; i < user.Liked.length; i++)
                {
                    if(user.Liked.length != 0)
                    {
                        for(let j = 0; j < booklist.length; j++)
                        {
                            if(user.Liked[i].BookID == booklist[j].BookID)
                            {
                                liked_root = document.querySelector(".books-liked-container")
                                let book_container = document.createElement("div")
                                book_container.classList.add("book-container")
                                book_container.setAttribute("data-link", user.Liked[i].BookID)
                                book_container.addEventListener('click', function(){
                                    let bookid = book_container.getAttribute("data-link")
                                    localStorage.setItem("BookID", bookid)
                                    location.href = '/homepage/book/book.html'
                                })
                                book_container.innerHTML =
                                `       <div class = book>
                                            <h2 class = "book-header">Book Title: </h2>
                                            <h2 class = "book-title"> ${user.Liked[i].Title}</h2>
                                            <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${user.Liked[i].BookCover}" width = "100px">
                                        </div>
                                `
                                liked_root.appendChild(book_container)
                            }
                            else
                            {
                                continue
                            }
                        }
                    }
                    else{
                        document.querySelector(".books-liked-container").innerHTML = 
                        `
                            <div class = "books-liked>
                                <h1> Books Liked: No liked books</h1>
                            </div>

                        `
                        }
                    }

            })

            $(".reviews-button").click(function(){

                $(".books-liked-container").html ('');
                $(".user-books-added-container").html('');
                $(".user-books-viewed-container").html('');

                let userID = user.UserID
                let userReviewCheck = 0
                for(let i = 0; i < reviewlist.length; i++){
                    if(userID == reviewlist[i].UserID)
                    {
                        for(let j = 0; j < booklist.length; j++)
                        {
                            if(reviewlist[i].ReviewID == booklist[j].ReviewID)
                            {
                                reviews_root = document.querySelector(".user-reviews-container") 
                                let review_container = document.createElement("div")
                                review_container.classList.add("review-container")
                                review_container.addEventListener('click', function(){
                                    let bookid = booklist[j].BookID
                                    localStorage.setItem("BookID", bookid)
                                    location.href = '/homepage/book/book.html'
                                })
                                review_container.innerHTML =                         
                                `
                                <div class = "review">
                                    <h2 class = "review-header">Book: ${booklist[j].Title}</h2>
                                    <p class = "review-content">${reviewlist[i].Review}</p>
                                </div>  
                                `
        
                                reviews_root.appendChild(review_container)
                            }

                        }
                        userReviewCheck += 1
                    }

                    else{
                        continue
                    }
                }

                if(userReviewCheck == 0)
                {
                    reviews_root = document.querySelector(".user-reviews-container") 
                    let review_container = document.createElement("div")
                    review_container.classList.add("review-container")
                    review_container.innerHTML =                         
                    `<div class = "review">
                        <h1 class = "review-header">No Reviews Yet...</h1>
                     </div>  
                    `

                    reviews_root.appendChild(review_container)

                }
            })

            $(".books-added-button").click(function(){

                $(".books-liked-container").html ('');
                $(".user-reviews-container").html ('');
                $(".user-books-viewed-container").html('');



            })


        }
    }

loadUserNavPfp()
loadUserPfp()
loadUserData()

})