/**
 * Created by tlorimer on 07/08/2016.
 */


// Hide all students as a start
var studentItem = document.getElementsByClassName('student-item');
for (var x = 0; x < studentItem.length; x+=1 ) {
    studentItem[x].style.visibility = "hidden";
}

// show only 10 students at a time

console.log(studentItem);

// calculate the total number of pages to show at the bottom of the page

// Hide all but the first 10 students

// When the user clicks on "2" in the pagination, students 11 through 20 are shown.
    //This should work no matter the size of the list of students or the number of pages

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