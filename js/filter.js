/**
 * Created by tlorimer on 07/08/2016.
 */
// Required before the rest
const studentItem = document.getElementsByClassName("student-item");
// Some Global Variables
const numberOfStudents = studentItem.length;
// calculate the total number of pages to show at the bottom of the page
var numberOfPages = Math.ceil(numberOfStudents / 10);
var currentPage = 0; //pages are 0 based
console.log("numberOfStudents: ", numberOfStudents);
console.log("numberOfPages: ", numberOfPages);

// The main event
hideStudents();
displayStudents();
drawPagination();

// When the user clicks on "2" in the pagination, students 11 through 20 are shown.
// This should work no matter the size of the list of students or the number of pages
// Need to grab the element ID from the clicked button
const clickID = document.querySelector(".pagination");
clickID.addEventListener("click", function(event) {
    //console.log(event.target.textContent);
    currentPage = event.target.textContent;
    hideStudents();
    displayStudents();
    // We need to change the 'active' class for the newly selected page
    currentPage
    // And change the unselected class to be blank
});

function hideStudents() {
    // Hide all students at the start
    for (var x = 0; x < numberOfStudents; x+=1 ) {
        studentItem[x].style.display = "none";
    }
}

function displayStudents() {
    // loop through the number of pages
    console.log(currentPage);
    var pageStart = currentPage * 10;
    var pageEnd = pageStart + 10;
    for (var pages = pageStart; pages < pageEnd; pages += 1) {
        //console.log("pages: ", pages);
        //console.log("length: ", studentItem.length);
        studentItem[pages].style.display = "inherit";
    }
}

function drawPagination() {
    const el = document.getElementsByClassName("page")[0];
    // Add a new div element
    var elChild = document.createElement("div");
    // Create the li navigation framework with the 'pagination' class
    var pageFramework = "<ul class='pagination'>";

    // apply the page numbers and id elements to the list items
    for (var x = 1; x <= numberOfPages; x += 1) {
        pageFramework += "<li>";
        // make the first page active
        if (x == currentPage) {
            pageFramework += "<a class='active' class='pg' href='#'>" + x + "</a>";
        } else {
            pageFramework += "<a class='pg' href='#'>" + x + "</a>";
        }
        pageFramework += "</li>";
    }
    pageFramework += "</ul>";

    elChild.innerHTML = pageFramework;

// append (insert at the end) the pagination div to the page class element
    el.appendChild(elChild);
}

// Add search markup using progressive enhancement (use filters-example.html for markup)

// Add event listener to the search button.
    // When the user click on the button it should use the text in the search input to filter the results
    // Searching should be case insensitive

// Users should be able to search by name or email address.
    // Partial matching should be displayed in results

// Search results should also be paginated

// EXTRA CREDIT //
//////////////////

// Include simple animation when transitioning between pages

// As the user types in the search box, dynamically filter the student listing

// If no matches are found, include a message in the HTML to tell the user there are no matches