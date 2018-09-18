/*    JavaScript 6th Edition
 *    Chapter 7
 *    Chapter Case
 
 *    Outer Orbits
 *    Author: Justin Cernekee
 *    Date:  11-4-17 

 *    Filename: script.js
 */

  "use strict";  // interpret contents in JavaScript strict mode
  
  var dateObject = new Date();
  var countdown;
  var ticket = {
	     passengersOnTicket: 0,
		 passengers: {},
         
  };
  
  function displayCalendar(whichMonth) {
	  var date;
	  var dateToday = new Date();
	  var dayOfWeek;
	  var daysInMonth;
	  var dateCells;
	  var captionValue;
	  var month;
	  var year;
	  var monthArray = ["January","February","March","Arpil","May","June","July","August","September","October","November","December"];
	  if (whichMonth === -1) {
		  dateObject.setMonth(dateObject.getMonth() - 1);
	  } else if (whichMonth === 1) {
		  dateObject.setMonth(dateObject.getMonth() + 1);
	  }
	  month = dateObject.getMonth();
	  year = dateObject.getFullYear();
	  dateObject.setDate(1);
	  dayOfWeek = dateObject.getDay();
	  captionValue = monthArray[month] + "" + year;
	  document.querySelector("#cal table caption").innerHTML = captionValue;
	  if (month === 0 || month === 2 || month === 4 ||
	      month === 6 || month === 7 || month === 9 ||
		  month === 11) { // Jan, Mar, May, Jul, Aug, Oct, Dec
		daysInMonth = 31;
		  }else if (month === 1) { // Feb
              if (year % 4 === 0) { // leap year test
                 if (year % 100 === 0) { //year ending in 00 not a leap year unless divisible by 400
				 if (year % 400 === 0) {
					 daysInMonth = 29;
				 } else {
					 daysInMonth = 28;
				 }
			} else{
				daysInMonth = 29;
			}
			  }else {
				  daysInMonth = 28;
			  }
		  } else { // Arp, Jun, Sep, Nov
		       daysInMonth = 30;
		  }
		  dateCells = document.getElementsByTagName("td");
		  for (var i =0; i < dateCells.length; i++) {
			  // clear existing table dates
			  dateCells[i].innerHTML = "";
			  dateCells[i].className = "";
		  }
		  for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
			  // add dates to days cells
			  dateCells[i].innerHTML = dateObject.getDate();
			  dateCells[i].className = "date";
			  if (dateToday < dateObject) {
				  dateCells[i].className = "futuredate";
			  }
			  date = dateObject.getDate() + 1;
			  dateObject.setDate(date);
		  }
		  dateObject.setMonth(dateObject.getMonth() - 1);
		  // resetmonth to month shown
		  document.getElementById("cal").style.display = "block";
		  // display calendar if it's not already visible
  }
  function selectDate(event) {
	  if (event === undefined) { // get caller element in IE8
	  event = window.event;
	  }
	  var callerElement = event.target || event.srcElement;
	  if (callerElement.innerHTML === "") {
		  // cell contains no date, so don't close the calendar
		  document.getElementById("cal").style.display = "block";
		  return false;
	  }
	  dateObject.setDate(callerElement.innerHTML);
	  var fullDateToday = new Date();
	  var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
	  var selectedDate = Date.UTC (dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
	  if (selectedDate <= dateToday) {
		  document.getElementById("cal").style.display = "block";
		  return false;
	  }
	  document.getElementById("tripDate").value = dateObject.toLocaleDateString();
	  hideCalendar();
	  
	  
	  document.getElementById("countdownSection").style.display = "block";
	  ticket.date = dateObject.toLocaleDateString();
	  document.getElementById("selectedDate").innerHTML = ticket.date;
	  document.getElementById("dateSection").style.display = "block";
  }
  function hideCalendar() {
	  document.getElementById("cal").style.display = "none";
  }
  function prevMo() {
	  displayCalendar (-1);
  }
  function nextMo() {
	  displayCalendar(1); 
  }
  
  
  function registerName() {
	  var passengerList = document.getElementById("passengers");
	  var passengerName = document.createElement("li");
	  var newFnameProp;
	  var newLnameProp;
      ticket.passengersOnTicket += 1;
	  newFnameProp = "fname" + ticket.passengersOnTicket;
	  newLnameProp = "lname" + ticket.passengersOnTicket;
	  // add first+last names to ticket object as new properties
	  ticket.passengers[newFnameProp] = document.getElementById("fname").value;
	  ticket.passengers[newLnameProp] = document.getElementById("lname").value;
	  // add entered name to passenger list in ticket section
	  passengerName.innerHTML = ticket.passengers[newFnameProp] + "" + ticket.passengers[newLnameProp];
	  passengerList.appendChild(passengerName);
	  // clear first and last names from form
	  document.getElementById("fname").value = "";
	  document.getElementById("lname").value = "";
	  //display ticket and passengers section
	  document.getElementById("ticket").style.display = "block";
	  document.getElementById("passengersSection").style.display = "block";
	  // return focus to First Name field to facilitate entry of
	  // another passenger name
	  document.getElementById("fname").focus();
	  
  }	  
  function createEventListeners() {
	  var dateField = document.getElementById("tripDate");
	  if (dateField.addEventListener) {
		  dateField.addEventListener("click", displayCalendar, false);
	  } else if (dateField.attachEvent) {
		  dateField.attachEvent("onclick", displayCalendar);
	  }
	  var dateCells = document.getElementsByTagName("td");
	  if (dateCells[0].addEventListener) {
		  for (var i = 0; i < dateCells.length; i++) {
			  dateCells[i].addEventListener("click", selectDate, false);
		  }
	  }else if (dateCells[0].attachEvent) {
		  for (var i = 0; i < dateCells.length; i++) {
			  dateCells[i].attachEvent("onclick", selectDate);
		  }
	  }
	  var closeButton = document.getElementById("close");
	  if (closeButton.addEventListener) {
		  closeButton.addEventListener("click", hideCalendar, false);
	  } else if (closeButton.attachEvent) {
		  closeButton.attachEvent("onclick", hideCalendar);
	  }
	  var prevLink = document.getElementById("prev");
	  var nextLink = document.getElementById("next");
	  if (prevLink.addEventListener) {
		  prevLink.addEventListener("click", prevMo, false);
		  nextLink.addEventListener("click", nextMo, false);
	  } else if (prevLink.attachEvent) {
		  prevLink.attachEvent("onclick", prevMo);
		  nextLink.attachEvent("onclick", nextMo);
	  }
	  var nameButton = document.getElementById("addName");
	  if (nameButton.addEventListener) {
		nameButton.addEventListener("click", registerName, false);
	  } else if (nameButton.attachEvent) {
             nameButton.attachEvent("onclick", registerName);
	  }			 
	  }
	  if (window.addEventListener) {
		  window.addEventListener("load", createEventListeners, false);
	  } else if (window.attachEvent) {
		  window.attachEvent("onload", createEventListeners);
	  }
                 					 
  
 
 
 