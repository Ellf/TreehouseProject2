/**
 * Created by tlorimer on 07/08/2016.
 * Written in JavaScript rather than jQuery to force me to learn the 'proper' way to do things
 */
// Required before the rest
const studentItem = document.getElementsByClassName("student-item");
// Some Global Variables
let numberOfStudents = studentItem.length;
// calculate the total number of pages to show at the bottom of the page
let numberOfPages = Math.ceil(numberOfStudents / 10);
let currentPage = 1;
let previousPage = "1"; // holding variable for previously picked page
let searchedResults = [];

// The main setup
hideAllStudents(); // hide all students
displayStudents(numberOfStudents); // display page one
drawPagination(); // create the pagination

// When the user clicks on "2" in the pagination, students 11 through 20 are shown.
// This should work no matter the size of the list of students or the number of pages
// Need to grab the element ID from the clicked button
const clickID = document.querySelector(".pagination");
clickID.addEventListener("click", function(event) {
  let start;
  let stop;
  // set the previous page to class pg - removing the 'active' class
  document.getElementById(previousPage).className = "pg";

  currentPage = event.target.textContent; // get the page number that's clicked
  previousPage = event.target.textContent; // set the previous page to the currently clicked page for next time
  //hideStudents();
  //displayStudents(numberOfStudents);
  start = currentPage * 10 - 10;
  stop = start + 10;

  console.log(currentPage, start, stop);
  drawSearchResults(studentItem, start, stop);

  // We need to change the 'active' class for the newly selected page
  document.getElementById(event.target.textContent).className = "active";
});

function hideAllStudents() {
  // Hide all students at the start
  for (var x = 0; x < numberOfStudents; x += 1) {
    studentItem[x].style.display = "none";
  }
}

function displayStudents(numberStudents) {
  // loop through the number of pages
  let pageStart = (currentPage - 1) * 10;
  let pageEnd = pageStart + 10;
  if (pageEnd > numberStudents) {
    pageEnd = numberStudents;
  }
  for (var pages = pageStart; pages < pageEnd; pages += 1) {
    studentItem[pages].style.display = "inherit";
  }
}

// This function only draws the pagination. The click event for each page number is handled from the clickID eventhandler.
function drawPagination() {
  // Get the first element of the class 'page' and assign it to the 'el' constant
  const el = document.getElementsByClassName("page")[0];
  const checkClass = document.getElementsByClassName("pagination");

  // Add a new div element
  const elChild = document.createElement("div");
  let ulElement = document.getElementsByClassName("pagination")[0];
  if (checkClass.length > 0) {
    // destroy the already present pagination ul
    ulElement.remove();
  }

  // Create the li navigation framework with the 'pagination' class
  var pageFramework = "<ul class='pagination'>";

  // apply the page numbers and id elements to the list items
  for (var x = 1; x <= numberOfPages; x += 1) {
    pageFramework += "<li>";
    // make the first page active
    if (x === currentPage) {
      pageFramework +=
        "<a class='active pg' id='" +
        x +
        "' style='cursor: pointer;'>" +
        x +
        "</a>";
    } else {
      pageFramework +=
        "<a class='pg' id='" + x + "' style='cursor: pointer;'>" + x + "</a>";
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
const elSearchChild = document.createElement("div");
elSearchChild.setAttribute("class", "student-search");
let searchFramework =
  "<input id='enterButton' placeholder='Search for students...'>";
searchFramework += "<button id='clickButton'>Search</button>";
elSearchChild.innerHTML = searchFramework;
elSearch.appendChild(elSearchChild);

// Add event listener to the search button.
// When the user click on the button it should use the text in the search input to filter the results
// Searching should be case insensitive
// Users should be able to search by name or email address.
// Partial matching should be displayed in results
const clickSearch = document.querySelector(".student-search button");
const enterButton = document.getElementById("enterButton");
const studentName = document.getElementsByTagName("h3");
const studentEmail = document.getElementsByClassName("email");

enterButton.addEventListener("keyup", event => {
  event.preventDefault();
  // As the user types in the search box, dynamically filter the student listing
  document.getElementById("clickButton").click();
  if (event.keyCode === 13) {
    document.getElementById("clickButton").click();
  }
});

clickSearch.addEventListener("click", function() {
  let filterName = this.previousSibling.value; // this.previousSibling.value displays the content of the input field.
  let tempCounter = 0;
  let start;
  let stop;
  for (var x = 0; x < numberOfStudents; x += 1) {
    // loop through the students' names
    // un-hide all students first
    // studentItem[x].style.display = "none";
    // if indexOf is not equal to -1 then it IS found and therefore show the data
    // indexOf method returns -1 if the value to search for never occurs
    if (
      studentName[x].innerHTML.indexOf(filterName) !== -1 ||
      studentEmail[x].innerHTML.indexOf(filterName) !== -1
    ) {
      searchedResults[tempCounter] = studentItem[x];
      tempCounter += 1;
      //  studentItem[x].style.display = "inherit"; // hide the student data
    }
  }

  numberOfPages = Math.ceil(tempCounter / 10);

  if (numberOfPages < 1) numberOfPages = 1;

  start = currentPage * 10 - 10;
  stop = start + 10;

  //TODO: Search feature works but isn't paginating properly.
  // User 'ar' to search - results in 14 people.
  // If no matches are found, include a message in the HTML to tell the user there are no matches
  if (tempCounter == 0) {
    var noMatch = document.createElement("li");
    noMatch.id = "nomatcher";
    let t = document.createTextNode("No Matches Found");
    noMatch.appendChild(t);
    document.getElementsByClassName("student-list")[0].appendChild(noMatch);
    hideAllStudents();
  } else {
    if (document.getElementById("nomatcher")) {
      document.getElementById("nomatcher").remove();
    }
  }

  console.log(start, stop); // 0, 10 = page 1; 11, 20 = page 2; etc
  console.log(searchedResults);
  //drawSearchResults(searchedResults, start, stop)

  return false;
});

function drawSearchResults(searchResults, start, stop) {
  if (stop > numberOfStudents) stop = numberOfStudents;
  hideAllStudents();
  // take the search results and put them back onto the page then apply pagination
  // we still need to limit by 10 here or in the pagination function
  for (let x = start; x < stop; x += 1) {
    document
      .getElementsByClassName("student-list")[0]
      .appendChild(searchResults[x]).style.display = "inherit";
  }

  //drawPagination();
}

// TODO:
// Include simple animation when transitioning between pages
