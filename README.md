# CSCI-E31-Graduate-Assignment-2023
A documented practice set and solution to help reinforce course material.

In this problem set, we'll be reinforcing the concept of helpful error messaging with connect-flash. It's a slight twist on what was shown in Video 7.35. We're not using multer to store any files to disk, but are instead using a try-catch right in the post handler. We'll also flash two different error messages depending on the type of mistake in the post submission.

This app is a singular page with a form entirely comprised of text fields, a submit button, and a section to display what you just posted. Submissions are stored in the app memory only.

The app's only requirements for submissions are that the user fills out all three fields with some kind of text, and that the 'date' field follows YYYY-MM-DD format. If the user leaves any of these fields blank, we want to flash an error message. If the 'date' field is in the wrong format, we want to flash a different error message.

All of your code changes will live under routes/blogposts.js, which includes comments with further instructions and hints to implement the error handling in this router. I have provided the needed line in the views/newpost.pug layout to actually show the flash message, so take note of that.

The solution is available in routes/blogposts-solution.js.