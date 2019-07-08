var DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
/*
// Pull upcoming events from Meetup API
var UPCOMING_EVENTS_URL = "https://api.meetup.com/2/events" +
  "?offset=0" +
  "&format=json" +
  "&limited_events=False" +
  "&group_urlname=seahug" +
  "&photo-host=public" +
  "&page=5" +
  "&fields=" +
  "&order=time" +
  "&desc=false" +
  "&status=upcoming" +
  "&sig_id=9489517" +
  "&sig=40f5aa124deef9aa22ee964f7b3def3ebc531bd1";
var UPCOMING_EVENTS_DATA_TYPE = "jsonp";
*/
// Pull upcoming events from hardcoded JSON
var UPCOMING_EVENTS_URL = "/upcoming-events.json";
var UPCOMING_EVENTS_DATA_TYPE = "json";

function zeroFill(number, width) {
  var s = number.toString();
  width -= s.length;
  return width > 0
    ? new Array(width + (/\./.test(s) ? 2 : 1)).join("0") + s
    : s;
}

function formatDate(d) {
  var s = "";
  s += DAY_NAMES[d.getDay()];
  s += ", ";
  s += d.getDate();
  s += " ";
  s += MONTH_NAMES[d.getMonth()];
  s += " ";
  s += d.getFullYear();
  return s;
}

function formatTime(d) {
  var s = "";
  s += zeroFill(d.getHours(), 2);
  s += ":";
  s += zeroFill(d.getMinutes(), 2);
  s += " ";
  s += formatTimezone(d);
  return s;
}

function formatTimezone(d) {
  var n = d.getTimezoneOffset();
  var hours = Math.floor(n / 60);
  var minutes = n % 60;

  var s = "UTC";
  s += hours >= 0 ? "-" : "+";
  s += zeroFill(hours, 2);
  s += zeroFill(minutes, 2);
  return s;
}

function formatDateTime(d) {
  return formatDate(d) + " at " + formatTime(d);
}

function fetchUpcomingEvents(url, successCallback, errorCallback) {
  var ajaxData = {
    dataType: UPCOMING_EVENTS_DATA_TYPE,
    method: "get",
    url: url
  };

  if (successCallback) {
    ajaxData.success = function (data, status, xhr) {
      var events = $.map(
          data.results,
          function (x) {
            return {
              url: x.event_url,
              name: x.name,
              time: new Date(x.time)
            };
          });
      successCallback(events);
    };
  }

  if (errorCallback) {
    ajaxData.error = function (xhr, status, e) {
      errorCallback(e);
    };
  }

  $.ajax(ajaxData);
}

function firstUpcomingEventBy(events, f) {
  for (var i = 0; i < events.length; ++i) {
    var e = events[i];
    if (f(e)) {
      return e;
    }
  }

  return null;
}

function nextUpcomingEvents(events) {
  var upcomingEvents = [];

  // Always include next "General discussion" event
  var e0 = firstUpcomingEventBy(
      events,
      function (e) { return e.name == "General discussion"; });
  if (e0) { upcomingEvents.push(e0); }

  // Include next event of any other type
  var e1 = firstUpcomingEventBy(
      events,
      function (e) { return e.name != "General discussion"; });
  if (e1) { upcomingEvents.push(e1); }

  // Make sure they're in the right order!!
  upcomingEvents.sort(function (a, b) {
    if (a.time < b.time) { return -1; }
    if (a.time > b.time) { return 1; }
    return 0;
  });

  return upcomingEvents;
}

$(function () {
  fetchUpcomingEvents(UPCOMING_EVENTS_URL, function (events) {
    var upcomingEvents = nextUpcomingEvents(events);
    var html = "<ul class=\"relaxed\" style=\"padding-left: 2em\">";
    for (var i = 0; i < upcomingEvents.length; ++i ) {
      var e = upcomingEvents[i];
      html += "<li><a href=\"" + e.url + "\">" + e.name + "</a><br/>";
      html += "<span>" + formatDateTime(new Date(e.time)) + "</span>";
    }
    html += "</ul>";
    $("#upcoming-events")
      .html("<p>Upcoming events:</p>" + html);
  });
});
