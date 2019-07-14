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

var UPCOMING_EVENTS_API = (function (isMeetup) {
  if (isMeetup) {
    // Pull upcoming events from Meetup API
    return {
      url: "https://api.meetup.com/2/events" +
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
        "&sig=40f5aa124deef9aa22ee964f7b3def3ebc531bd1",
      dataType: "jsonp"
    };
  }
  else {
    // Pull upcoming events from hardcoded JSON
    return {
      url: "/upcoming-events.json",
      dataType: "json"
    };
  }
})(false);

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

function fetchUpcomingEvents(api, successCallback, errorCallback) {
  var ajaxData = {
    dataType: api.dataType,
    method: "get",
    url: api.url
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

$(function () {
  fetchUpcomingEvents(UPCOMING_EVENTS_API, function (events) {
    var midnightToday = new Date().withUTCHours(0, 0, 0, 0);
    var eventGroups = events
      .filter(e => e.time.compareTo(midnightToday) >= 0)
      .orderBy((a, b) => a.time.compareTo(b.time))
      .groupBy(e => e.name === "General discussion");
    var generalDiscussionEvents = eventGroups[true] || [];
    var otherEvents = eventGroups[false] || [];
    var upcomingEvents = generalDiscussionEvents
      .slice(0, 2)
      .concat(otherEvents.slice(0, 2))
      .orderBy((a, b) => a.time.compareTo(b.time));

    var html = "<ul class=\"relaxed\" style=\"padding-left: 2em\">";
    for (var i = 0; i < upcomingEvents.length; ++i ) {
      var e = upcomingEvents[i];
      if (e.url) {
        html += "<li><a href=\"" + e.url + "\">";
      }
      else {
        html += "<li>";
      }
      html += "<strong>";
      html += e.name;
      html += "</strong>";
      if (e.url) {
        html += "</a>";
      }
      html += "<br/>";
      html += "<span>" + formatDateTime(new Date(e.time)) + "</span>";
      html += "</li>";
    }
    html += "</ul>";
    $("#upcoming-events")
      .html("<p>Upcoming events:</p>" + html);
  });
});
