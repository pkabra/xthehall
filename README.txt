 __   ___   _          _    _       _ _ 
 \ \ / / | | |        | |  | |     | | |
  \ V /| |_| |__   ___| |__| | __ _| | |
   > < | __| '_ \ / _ \  __  |/ _` | | |
  / . \| |_| | | |  __/ |  | | (_| | | |
 /_/ \_\\__|_| |_|\___|_|  |_|\__,_|_|_|
                                           
-------
CONTACT
-------
Any problems with deployment or confusion about feature usage can be
sent to any members of the XtheHall team:
- Pratik Kabra (pkabra@umich.edu)
- Di Lu (dilu@umich.edu)
- Michael Wang (mwwang@umich.edu)
- Adam Gorman (adgorman@umich.edu)


----------
DEPLOYMENT
----------

Our application has been deployed temporarily and can be accessed with
the following URL:

https://xthehall.bananabread.io

*Note that you need to bypass the security warning*

*WE RECOMMEND USING GOOGLE CHROME to access this application. Only Google
Chrome provides full support for the Web Speech API which we use to implement
voice control across all browser versions* 

The source code for our application can be found at:
https://github.com/pkabra/xthehall

*WE DO NOT RECOMMEND DEPLOYING OUR APPLICATION LOCALLY ON YOUR MACHINE as
the requirements on our development machines might not match the what is on
your local machine*

If you would like to deploy this application locally on your machine, simply
clone the repository and run the server.sh scrip in the root directory
(./server.sh). The website should now be accesible through
https://localhost:4443/#/login.


--------------
VOICE COMMANDS
--------------

ON GOOGLE CHROME, voice commands can be used. Here is a descriptiong
about how they are used.

*We intend to include built in voice instructions into our web application
for our final release*

VOICE COMMANDS NEED TO BE ENABLED IN YOUR PROFILE SETTINGS

***All commands must be initiated by saying "orange"*** The mic icon on the top
right will turn red to indicate that our application is ready to listen to
a command.

--------------
On any page, one can navigate around the application by using the
"navigate to" command. One could also logout at any time by uttering
a "logout" command.

Examples:
"orange" *pause* "navigate to home"
"orange" *pause* "navigate to find friends"
"orange" *pause* "navigate to settings"

--------------

At the home screen, one may start a chat with a "chat" command. A user
may specify which chat by its number from left to right and up to down.
So, the first chat by the plus button is chat 1.

While chatting, one could write a new message using the "compose" command
followed by the contents of the new message. Then, the user may send it by
uttering a "send" command.

"orange" *pause* "compose <message>"
"orange" *pause* "send"

--------------

In settings, a user can change his or her nickname or interests with a
"set nickname" or "set interests" command respectively. Once done editing,
a "save" command will save the changes.

--------------

Finally, at the find-friends page, a new user could be added to the new
chatroom with a "add user" command. The user could be specified with a
number (like a chatroom before) or with the username. Once all of the
users are selected, a new chat may begin with the utterance of a "chat"
command.

Example Commands:
    "Orange Navigate to Home"
    "Orange Chat Two"
    "Orange Set Nickname Wolverine"
    "Orange Add User Jim Harbaugh"


------------
REQUIREMENTS
------------

This is a reference to the completion of each of our scoping document's
requirements.

USE-000: The large buttons and simple design should make the application
usable for a wide variety of users in the ICU.

USE-001: The Bootstrap front-end infrastructure is compatible with touch-
screen devices.

USE-002: Voice-control has been implemented for use by desktop users on
Google Chrome.

CHAT-000: We hope that the layout of the application and completion of
its chat system satisfies this requirement.

CHAT-001, CHAT-002: Both versions of chatting are available from the
find-friends screen. The differentiation is whether or not you add one
or more users into the chat

CHAT-003: Chat history can be viewed from the home screen as thumbnail
previews. Specific conversation histories may be viewed by clicking or
tapping into a chat (like in other chatting applications).

CHAT-004: The XtheHall team decided that guest chat would not foster
long-term connections, which was the overall goal of the project.  We
therefore did not include this feature in this version of release.

CHAT-005: Trending topics are shown on the main page. They are, however,
drawn from Google instead of Twitter.

CHAT-006: This task was designated as optional and the team did not have
time to complete it. However, if desired in the future, the application
is designed to be augmented with new features like this.

PRO-000: Other patients may be discovered in the find-friends page.

PRO-001: Patient's information is stored in XtheHall's Parse database.
The XtheHall platform allows for both Facebook and traditional-email
accounts.

PRO-002: We thought to keep the experience for the user as easy as
possible, the general list of chats would function as the user's buddy
list.  This would alleviate the need for the user to maintain two lists
and allow them to focus on building bonds with other patients.

PRO-003: Patient's information can be modified through the settings
page.

PRO-004: The bottom of the settings page allows users to delete their
accounts.

PRO-005: This task was optional and the team did not have time to
complete it.

PRO-006: This feature is accessible in the find-friends page.

PRO-007: The backend infrastructure takes into account user interests and
location to show potential chat partners who are more likely to connect
well with the user. There are also checks in controllers/find.js that
identify patients who have the same hospital as the user and also users that
share a lot of interests.

PRO-008: Facebook login is available in the login screen.


--------------
ACKNOWLOGEMENTS
--------------
Our thanks to the Simon Says Kinect group for providing the XtheHall team
with feedback to help make the final product as good as it is. Also,
we are grateful to the EECS 481 instructional staff for helping
throughout the development process.

