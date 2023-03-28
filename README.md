# Social-Network-Application
This is a Full-Stack Web Application, that represents a Social Application where you can create an account, post news and have a live chat with friends. This implies a JavaScript frontend using React and Redux, that communicates with backend made by using SpringBoot, Java and the backend query the SQL phpMyAdmin database.

The accounts are created by self-generating ID, unique email validated with Regex, unique username and minimum 4 characters password. An account contains also a friend list, where a friend model can be created and added in the list with the friendship status between the 2 accounts. Also, the unique email is stored in Local Storage and if it exists it is fetched from database to Redux Storage.

To run the frontend, you have to install node modules and also a MySQL connection on port 3306 and a database with name "web".

I made this project on my own and this is 100% my creation.
