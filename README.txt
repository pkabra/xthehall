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
- Michael Wang (mwwang@umich.edu)
- Pratik Kabra (pkabra@umich.edu)
- Di Lu (dilu@umich.edu)
- Adam Gorman (adgorman@umich.edu)


----------
DEPLOYMENT
----------
Once the source code has been downloaded, the application can be started
in one's terminal by entering the folder and running server.sh. The
application can then be reached in any internet browser on the user's
desktop by accessing https://localhost:4443/#/login. For an optimal
experience, the XtheHall team recommends Google Chrome.


--------
FEATURES
--------
Ease of Use and Accessibility: Our application was designed with the
    potential ailments of the end user in mind. As such, there are
    many different features in place to make the product easy to use.
    The most prominent of these is the voice control which can be
    enabled in the settings. A detailed list of the voice commands can be
    found bellow. Be sure to try all of them out!

Chat Infrastructure: Of course, the primary purpose of the XtheHall
    platform is to start conversations between patients in the same
    hospital. Our robust find-friends page allows users to find potential
    conversation partners who share common interests with them. At the
    same time, it is incredibly easy to simply click or tap on a few
    friends' profile pictures to initialize a chat. Automatically, those
    who share the most interests are highlighted in bright colors. Our
    chatting system is designed to be very simple and clean to allow
    users to focus on the content of the conversations.

User Management: Our application is customizable to allow users to
    experience a very personal experience. Our customizability features
    can be managed in our settings, where users may modify their personal
    information, like their interest lists, and augment their feature
    sets, like by enabling voice control. At the same time, privacy of
    our users was a top priority, which is why a nickname instead of a
    user's name is stored in XtheHall's database.

Outside Resources: XtheHall leverages multiple other systems to the
    benefit of our user base. The team is very proud of these, like the
    incorporation of Facebook login, as they greatly improve the general
    experience of using the XtheHall platform.


--------------
VOICE COMMANDS
--------------
Remember that voice commands need to be enabled in the application's
settings. Then, once on a page of XtheHall, one can initiate a voice
command by saying the word "orange."

On any page, one can navigate around the application by using the
"navigate to" command. One could also logout at any time by uttering
a "logout" command.

At the home screen, one may start a chat with a "chat" command. A user
may specify which chat by its number from left to right and up to down.
So, the first chat by the plus button is chat 1.

While chatting, one could write a new message using the "compose" command
followed by the contents of the new message. Then, the user may send it by
uttering a "send" command.

In settings, a user can change his or her nickname or interests with a
"set nickname" or "set interests" command respectively. Once done editing,
a "save" command will save the changes.

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


--------------
ACKNOLOGEMENTS
--------------
Our thanks to the Simon Says Kinect group for providing the XtheHall team
with feedback to help make the final product as good as it is. Also,
we are grateful to the EECS 481 instructional staff for helping
throughout the development process.


------------
REQUIREMENTS
------------
This is a reference to the completion of each of our scoping document's
requirements.

USE-000: The large buttons and simple design should make the application
usable for a wide variety of users in the ICU.

USE-001: The Bootstrap front-end infrastructure is compatible with touch-
screen devices.

USE-002: Voice-control has been implemented for use by desktop users.

CHAT-000: We hope that the layout of the application and completion of
its chat system satisfies this requirement.

CHAT-001, CHAT-002: Both versions of chatting are available from the
find-friends screen.

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
well with the user.

PRO-008: Facebook login is available in the login screen.

