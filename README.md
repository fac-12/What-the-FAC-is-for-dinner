# What-the-FAC-is-for-dinner ![](https://travis-ci.org/fac-12/What-the-FAC-is-for-dinner.svg?branch=master)

*@jamiecoe "Nobody's gonna bring a slab of meat."*

Or are they? With this useful planner, we'll be able to find out.

### A community meal planning application

#### WHY?

This week our challenge was to create a web app which fulfiled the following criteria:

- Simple web app with a node server and a database
- Includes a schema for the database
- Guards against script injection and other security concerns
- Includes dynamic content

#### WHAT?

As our community dinner is approaching, we decided to make a web app which allowed each member of our community to input which dish they are bringing to the dinner, and any dietary requirements for that dish.

#### HOW?

We started by creating a schema, which contained 4 tables of users, dishes, dietary requirements, and the connnections between the dishes and the dietary requirements. This allowed us to visualise how the tables would interact.

![]("What-the-FAC-is-for-dinner/Screen Shot 2017-12-07 at 17.13.07.png")

Our software architecture identified that we needed a couple of different bespoke routes through the server. We decided on a'Get Dishes’ route which would run every time the page loaded to display all dishes and their makers on the page, and an ‘Add Dishes’ route which would run every time the submit button was pressed. Our stretch goal was to be able to filter the dishes by different criteria.

We hosted our database on heroku, and also created a test database to allow us to do database testing using tape and shot.

#### Lessons Learned

* We practised using databases, and setting these up on Heroku by using environment variables.
* We had an issue when we were initially returning data from the get dishes function. Within our SELECT statement, we were selecting 3 columns which had the same name, although from different tables. This meant that each new column was overwriting the previous one. We therefore had to give the columns different aliases to ensure this did not happen and that we could return all the results.
