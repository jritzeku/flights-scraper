<h1 align="center">flights-scraper</h1>

## DEMO!!!

A web scraping application that scrapes flight data from google flights.

&nbsp;
This app is meant for learning/educational purposes only.
&nbsp;
This should cover most of the features/use cases.

https://www.youtube.com/watch?v=miHOgs4JUGc

-All users(members)

- [x] Register
- [x] Login
      <br>

- [x] View all stories
- [x] View recommended stories
- [x] View filtered stories(based on search criteria)
      <br>

- [x] View/publish/edit/delete story
- [x] Save story as draft
- [x] Publish story from existing draft
      <br>

- [x] Add/edit/delete comment
- [x] Reply to comment (should be nested)
      <br>

- [x] Add/remove claps to story
- [x] Prevent inflating own stats; cant clap or increment views/reads on own story
      <br>

- [x] Follow/ unfollow user
- [x] Subscribe/unsubscribe from topics/tags
      <br>

- [x] View/edit profile
      <br>

- [x] View/create/edit/delete list
- [x] Save story to list
- [x] Save other user's list
      <br>

- [x] View statistics on claps/views/stories
- [x] Ability to toggle between stat type as well as month
- [x] Ability to adjust y-axis max/range
      <br>

- [x] Real-time notifications
- [x] View notifications
- [x] Mark notification(s) as read
- [x] Notifications categorized

## How to run locally

1.  Install dependencies.

    > 'npm i' //in root folder,

2.  In flights.csv file, remove old entries; leaving just the following heading:

    > date, price

3.  START our application!(runs both client and server concurrently)

    > 'node index.js' //in root folder

4. Once done, the scraped data should appear in csv file. You can 
sort by date, prices, view graphs etc. 
