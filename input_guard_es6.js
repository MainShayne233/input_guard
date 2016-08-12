class InputGuard{

  constructor(args){
    this.exclude = args.exclude || [];
    this.include = args.include || [];
  }

  watch(ids){
    if (typeof(ids) == "string"){
      ids = [ids]
    }
    ids.forEach(this.identify_subject.bind(this))
  }

  identify_subject(id){
    var helpless_input = document.getElementById(id);
    helpless_input.addEventListener('keydown', this.badge_check.bind(this));
  }

  badge_check(event){
    var badge = event.key;
    if (this.badge_checks_out(badge)){
      return true
    }
    else{
      event.preventDefault();
      return false
    }
  }

  badge_checks_out(badge){
    if (this.is_wanted(badge)){
      if (this.has_exception(badge)){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return true;
    }
  }

  is_wanted(badge){
    if (this.lockdown_on('all')){ return true; }
    else if(this.lockdown_on('numbers') && this.suspect_is_a_number(badge)) { return true }
    else if(this.lockdown_on('letters') && this.suspect_is_a_letter(badge)) { return true }
    else if(this.lockdown_on('uppercase letters') && this.suspect_is_an_uppercase_letter(badge)) { return true }
    else if(this.lockdown_on('lowercase letters') && this.suspect_is_a_lowercase_letter(badge)) { return true }
    else if(this.lockdown_on('functional keys') && this.suspect_is_a_functional_key(badge)) { return true }
    else if(this.on_watch_list(badge)) { return true }
    else { return false; }
  }

  lockdown_on(type){
    return this.identified(this.exclude, type);
  }

  amnisty_for(type){
    return this.identified(this.include, type);
  }

  amnisty_for_functional_keys(){
    return !(this.identified(this.exclude, 'functional keys'))
  }

  on_watch_list(badge){
    return this.identified(this.exclude, badge);
  }

  on_guest_list(badge){
    return this.identified(this.include, badge);
  }

  has_exception(badge){
    if (this.amnisty_for('all')){ return true; }
    else if(this.amnisty_for('numbers') && this.suspect_is_a_number(badge)) { return true }
    else if(this.amnisty_for('letters') && this.suspect_is_a_letter(badge)) { return true }
    else if(this.amnisty_for('uppercase letters') && this.suspect_is_an_uppercase_letter(badge)) { return true }
    else if(this.amnisty_for('lowercase letters') && this.suspect_is_a_lowercase_letter(badge)) { return true }
    else if(this.amnisty_for_functional_keys() && this.suspect_is_a_functional_key(badge)) { return true }
    else if(this.on_guest_list(badge)) { return true }
    else { return false; }
  }

  suspect_is_a_number(badge){
    return this.identified(['0','1','2','3','4','5','6','7','8','9'], badge);
  }

  suspect_is_a_letter(badge){
    return this.identified(["a", "b", "c", "d", "e",
                            "f", "g", "h", "i", "j",
                            "k", "l", "m", "n", "o",
                            "p", "q", "r", "s", "t",
                            "u", "v", "w", "x", "y", "z"], badge.toLowerCase());
  }

  suspect_is_a_lowercase_letter(badge){
    return this.identified(["a", "b", "c", "d", "e",
                            "f", "g", "h", "i", "j",
                            "k", "l", "m", "n", "o",
                            "p", "q", "r", "s", "t",
                            "u", "v", "w", "x", "y", "z"], badge);
  }

  suspect_is_an_uppercase_letter(badge){
    return this.identified(["A", "B", "C", "D", "E",
                            "F", "G", "H", "I", "J",
                            "K", "L", "M", "N", "O",
                            "P", "Q", "R", "S", "T",
                            "U", "V", "W", "X", "Y", "Z"], badge);
  }

  suspect_is_a_functional_key(badge){
    return this.identified(['Tab', 'Backspace', ' ', 'Enter', 'ArrowLeft',
                            'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'], badge);
  }

  identified(line_up, badge){
    var suspect_count = line_up.length;
    while (suspect_count--) {
      if (line_up[suspect_count] === badge) {
        return true;
      }
    }
    return false;
  }

}
