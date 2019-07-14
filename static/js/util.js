Date.prototype.compareTo = function(other) {
  if (this < other) { return -1; }
  if (this > other) { return 1; }
  return 0;
};

Date.prototype.clone = function() {
  return new Date(this.getTime());
};

Date.prototype.withUTCHours = function(...args) {
  var result = this.clone();
  result.setUTCHours(...args);
  return result;
};

Array.prototype.orderBy = function(f) {
  var result = this.slice(0);
  result.sort(f);
  return result;
};

Array.prototype.groupBy = function(f) {
  var result = {};
  for (var i = 0; i < this.length; ++i) {
    var k = f(this[i]);
    if (!(k in result)) {
      result[k] = [this[i]];
    }
    else {
      result[k].push(this[i]);
    }
  }
  return result;
};
