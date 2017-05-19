/**
 * Created by tlorimer on 07/08/2016.
 */
// Required before the rest
const studentItem = document.getElementsByClassName("student-item");
// Some Global Variables
const numberOfStudents = studentItem.length;
// calculate the total number of pages to show at the bottom of the page
var numberOfPages = Math.ceil(numberOfStudents / 10);
var currentPage = 1;
var previousPage = 1; // holding variable for previously picked page
//console.log("numberOfStudents: ", numberOfStudents);
//console.log("numberOfPages: ", numberOfPages);

// The main setup
hideStudents();     // hide all students
displayStudents();  // display page one
drawPagination();   // create the pagination

// When the user clicks on "2" in the pagination, students 11 through 20 are shown.
// This should work no matter the size of the list of students or the number of pages
// Need to grab the element ID from the clicked button
const clickID = document.querySelector(".pagination");
clickID.addEventListener("click", function(event) {
    // set the previous page to class pg - removing the 'active' class
    document.getElementById(previousPage).className = "pg";

    currentPage = event.target.textContent;     // get the page number that's clicked
    previousPage = event.target.textContent;    // set the previous page to the currently clicked page for next time
    hideStudents();
    displayStudents();

    // We need to change the 'active' class for the newly selected page
    document.getElementById(event.target.textContent).className = "active";

});

function hideStudents() {
    // Hide all students at the start
    for (var x = 0; x < numberOfStudents; x+=1 ) {
        studentItem[x].style.display = "none";
    }
}

function displayStudents() {
    // loop through the number of pages
    var pageStart = (currentPage - 1) * 10;
    var pageEnd = pageStart + 10;
    if (pageEnd > numberOfStudents) {
        pageEnd = numberOfStudents;
    }
    for (var pages = pageStart; pages < pageEnd; pages += 1) {
        studentItem[pages].style.display = "inherit";
    }
}

function drawPagination() {
    // Get the first element of the class 'page' and assign it to the 'el' constant
    const el = document.getElementsByClassName("page")[0];
    // Add a new div element
    var elChild = document.createElement("div");
    // Create the li navigation framework with the 'pagination' class
    var pageFramework = "<ul class='pagination'>";

    // apply the page numbers and id elements to the list items
    for (var x = 1; x <= numberOfPages; x += 1) {
        pageFramework += "<li>";
        // make the first page active
        if (x === currentPage) {
            pageFramework += "<a class='active pg' id='" + x + "' href='#'>" + x + "</a>";
        } else {
            pageFramework += "<a class='pg' id='" + x + "' href='#'>" + x + "</a>";
        }
        pageFramework += "</li>";
    }
    pageFramework += "</ul>";
    elChild.innerHTML = pageFramework;
    // append (insert at the end) the pagination div to the page class element
    el.appendChild(elChild);
}

// Add search markup using progressive enhancement (use filters-example.html for markup)
const elSearch = document.getElementsByClassName("page-header")[0];
var elSearchChild = document.createElement("div");
elSearchChild.setAttribute('class', 'student-search');
var searchFramework = "<input placeholder='Search for students...'>";
searchFramework += "<button>Search</button>";
searchFramework += "</input>";
elSearchChild.innerHTML = searchFramework;
elSearch.appendChild(elSearchChild);

// Add event listener to the search button.
    // When the user click on the button it should use the text in the search input to filter the results
    // Searching should be case insensitive
    // Users should be able to search by name or email address.
    // Partial matching should be displayed in results
const clickSearch = document.querySelector('.student-search button');
const studentName = document.getElementsByTagName('h3');
const studentEmail = document.getElementsByClassName('email');

clickSearch.addEventListener('click', function() {
    var filterName = this.previousSibling.value; // this.previousSibling.value displays the content of the input field.
    var tempCounter = 0;
    for (var x = 0; x < numberOfStudents; x += 1) { // loop through the students names
        //unhide all students first
        studentItem[x].style.display = "none";
        // if indexOf is not equal to -1 then it's found and therefore show the data
        if (studentName[x].innerHTML.indexOf(filterName) !== -1 || studentEmail[x].innerHTML.indexOf(filterName) !== -1) {
            studentItem[x].style.display = "block"; // hide the student data
            tempCounter += 1;
        }
    }
    numberOfPages = tempCounter / 10;
    drawPagination()
});



// Search results should also be paginated

// EXTRA CREDIT //
//////////////////

// Include simple animation when transitioning between pages

// As the user types in the search box, dynamically filter the student listing

// If no matches are found, include a message in the HTML to tell the user there are no matches