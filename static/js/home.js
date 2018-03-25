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
var EVENT_URL = "https://api.meetup.com/2/events" +
    "?offset=0" +
    "&format=json" +
    "&limited_events=False" +
    "&group_urlname=seahug" +
    "&page=1" +
    "&fields=" +
    "&order=time" +
    "&status=upcoming" +
    "&desc=false" +
    "&sig_id=9489517" +
    "&sig=68241f048ca99766f7127955ede3dd0cc20531d4";

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
    return  "on " + formatDate(d) + " at " + formatTime(d);
}

function fetchNextEvent(url, successCallback, errorCallback) {
    var ajaxData = {
        dataType: "jsonp",
        method: "get",
        url: url
    };

    if (successCallback) {
        ajaxData.success = function (data, status, xhr) {
            successCallback(data.results[0]);
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
    fetchNextEvent(EVENT_URL, function (data) {
        var url = data.event_url;
        var name = data.name;
        var date = new Date(data.time);
        $("#next-event")
        .html("<p>Next Event: <a href=\"" + url +"\">" + name +"</a></br><span>" + formatDateTime(date) + ".</span></p>");
    });
});
