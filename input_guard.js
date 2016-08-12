'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

var InputGuard = function () {
  function InputGuard(args) {
    _classCallCheck(this, InputGuard);

    this.exclude = args.exclude || [];
    this.include = args.include || [];
  }

  _createClass(InputGuard, [{
    key: 'watch',
    value: function watch(id) {
      var helpless_input = document.getElementById(id);
      helpless_input.addEventListener('keydown', this.badge_check.bind(this));
    }
  }, {
    key: 'badge_check',
    value: function badge_check(event) {
      var badge = event.key;
      if (this.badge_checks_out(badge)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
  }, {
    key: 'badge_checks_out',
    value: function badge_checks_out(badge) {
      if (this.is_wanted(badge)) {
        if (this.has_exception(badge)) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }, {
    key: 'is_wanted',
    value: function is_wanted(badge) {
      if (this.lockdown_on('all')) {
        return true;
      } else if (this.lockdown_on('numbers') && this.suspect_is_a_number(badge)) {
        return true;
      } else if (this.lockdown_on('letters') && this.suspect_is_a_letter(badge)) {
        return true;
      } else if (this.lockdown_on('uppercase letters') && this.suspect_is_an_uppercase_letter(badge)) {
        return true;
      } else if (this.lockdown_on('lowercase letters') && this.suspect_is_a_lowercase_letter(badge)) {
        return true;
      } else if (this.lockdown_on('functional keys') && this.suspect_is_a_functional_key(badge)) {
        return true;
      } else if (this.on_watch_list(badge)) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'lockdown_on',
    value: function lockdown_on(type) {
      return this.identified(this.exclude, type);
    }
  }, {
    key: 'amnisty_for',
    value: function amnisty_for(type) {
      return this.identified(this.include, type);
    }
  }, {
    key: 'amnisty_for_functional_keys',
    value: function amnisty_for_functional_keys() {
      return !this.identified(this.exclude, 'functional keys');
    }
  }, {
    key: 'on_watch_list',
    value: function on_watch_list(badge) {
      return this.identified(this.exclude, badge);
    }
  }, {
    key: 'on_guest_list',
    value: function on_guest_list(badge) {
      return this.identified(this.include, badge);
    }
  }, {
    key: 'has_exception',
    value: function has_exception(badge) {
      if (this.amnisty_for('all')) {
        return true;
      } else if (this.amnisty_for('numbers') && this.suspect_is_a_number(badge)) {
        return true;
      } else if (this.amnisty_for('letters') && this.suspect_is_a_letter(badge)) {
        return true;
      } else if (this.amnisty_for('uppercase letters') && this.suspect_is_an_uppercase_letter(badge)) {
        return true;
      } else if (this.amnisty_for('lowercase letters') && this.suspect_is_a_lowercase_letter(badge)) {
        return true;
      } else if (this.amnisty_for_functional_keys() && this.suspect_is_a_functional_key(badge)) {
        return true;
      } else if (this.on_guest_list(badge)) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'suspect_is_a_number',
    value: function suspect_is_a_number(badge) {
      return this.identified(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], badge);
    }
  }, {
    key: 'suspect_is_a_letter',
    value: function suspect_is_a_letter(badge) {
      return this.identified(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], badge.toLowerCase());
    }
  }, {
    key: 'suspect_is_a_lowercase_letter',
    value: function suspect_is_a_lowercase_letter(badge) {
      return this.identified(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], badge);
    }
  }, {
    key: 'suspect_is_an_uppercase_letter',
    value: function suspect_is_an_uppercase_letter(badge) {
      return this.identified(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], badge);
    }
  }, {
    key: 'suspect_is_a_functional_key',
    value: function suspect_is_a_functional_key(badge) {
      return this.identified(['Tab', 'Backspace', ' ', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'], badge);
    }
  }, {
    key: 'identified',
    value: function identified(line_up, badge) {
      var suspect_count = line_up.length;
      while (suspect_count--) {
        if (line_up[suspect_count] === badge) {
          return true;
        }
      }
      return false;
    }
  }]);

  return InputGuard;
}();


