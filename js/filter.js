/**
 * Created by tlorimer on 07/08/2016.
 */
// Required before the rest
var studentItem = document.getElementsByClassName('student-item');
// Some Global Variables
var studentLoop = 0;
var numberOfStudents = studentItem.length;
// calculate the total number of pages to show at the bottom of the page
var numberOfPages = Math.ceil(numberOfStudents / 10);
var currentPage = 0;
console.log("numberOfStudents: ", numberOfStudents);
console.log("numberOfPages: ", numberOfPages);

// Hide all students as a start
for (var x = 0; x < numberOfStudents; x+=1 ) {
    studentItem[x].style.display = "none";
}

// loop through the number of pages
var pageStart = currentPage * numberOfPages;
var pageEnd = pageStart + 10;
for (var pages = pageStart; pages < pageEnd; pages += 1) {
    console.log("pages: ", pages);
    console.log("length: ", studentItem.length);
    studentItem[pages].style.display = "inherit";
}

// Add pagination
// Target the class 'page'
var el = document.getElementsByClassName('page')[0];
    // Add a new div element
    elChild = document.createElement("div");
    // Create the li nagivation framework with the 'pagination' class
     var pageFramework = "<ul class='pagination'>";

    // apply the page numbers and id elements to the list items
    for (var x = 1; x <= numberOfPages; x += 1) {
        pageFramework += "<li>";
        // make the first page active
        if (x == 1) {
            pageFramework += "<a class='active' id=" + x + " href='#'>" + x + "</a>";
        } else {
            pageFramework += "<a id='pg-" + x + "' href='#'>" + x + "</a>";
        }
        pageFramework += "</li>";
    }
    pageFramework += "</ul>";

    elChild.innerHTML = pageFramework;

// append (insert at the end) the pagination div to the page class element
el.appendChild(elChild);

// When the user clicks on "2" in the pagination, students 11 through 20 are shown.
    //This should work no matter the size of the list of students or the number of pages
var picked = document.getElementById()



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