const express = require('express')
const flash = require('connect-flash')
const router = express.Router()
const app = express();

if(!app.locals.blogposts){
    app.locals.blogposts = [];
}

router.use(flash()); // ensure the router can use flash messages

/*  PRACTICE TODO

    Modify this get function so it includes the flash error message,
    if present. You'll only need to add one line: a definition of flashMsg 
    in the second argument for render.
*/
router.get('/', (req, res, next)=>{
    res.render('blogposts', {
      blogposts : app.locals.blogposts,
      flashMsg: req.flash("submissionError") // SOLUTION HERE
    });
});

/*  PRACTICE TODO - SOLUTION HERE

    Modify this post method so that instead of
    always posting the form entry, it performs two checks
    and throws a distinct error for each.

    1) one of the fields is missing data
    2) the date is not in YYYY-MM-DD format

    Hint: you'll want to place the checks and the rest
    of the logic in a try-catch block, and if there's
    an error, it should be passed on via next() so the
    error handler can receive and handle it.

*/
router.post('/', (req, res, next)=>{
    try {
        if (req.body.title=="" || req.body.date=="" || req.body.entry=="") {
            throw new Error("MissingFormData")  // one of the fields is missing
        }
        else if (!req.body.date.match(/\d{4}\-\d{2}\-\d{2}/)) {
            throw new Error("WrongDateFormat") // data needs to be YYYY-MM-DD
        }
        else { // all OK
            var newpost = {
                "title":req.body.title,
                "date":req.body.date,
                "entry":req.body.entry,
            }
            app.locals.blogposts.push(newpost);
            res.redirect("/");
        }
    }
    catch(err) {
        next(err)
    }
    
});


/*  PRACTICE TODO - SOLUTION HERE

    Create a router.use call with an error handling function.
    This function should make use of connect-flash (req.flash('error','message'))
    calls to flash distinct messages for the two different submission errors,
    then redirect back to the home page ('/').
*/
router.use(function(err, req, res, next){
    console.error(err.stack);
    if (err.message == "MissingFormData"){
        req.flash("submissionError", "Please fill out all parts of the form before hitting Submit.");
        res.redirect('/');
    }
    else if (err.message == "WrongDateFormat") {
        req.flash("submissionError","Please use YYYY-MM-DD format for the date.")
        res.redirect('/');
    }
    else{
       next(err);
    }
  });

module.exports = router;