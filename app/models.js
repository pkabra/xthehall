/**
 * Data Models
 * This file contains all Parse objects that are available for use.
 * File is here so that all objects are globally available to services.
 */

// Profile Data
var Profile = Parse.Object.extend({
	className: 'Profile',
	attrs: ['fbid', 'image', 'interest', 'avatar', 'nickname', 'hospital_info', 'location', 'release_date']
});

// Chat and Messaging Data
var Chatrooms = Parse.Object.extend({
	className: 'Chatrooms',
	attrs: ['users']
});

var MessageHistory = Parse.Object.extend({
	className: 'MessageHistory',
	attrs: ['room_id', 'sender_id', 'message']
});
