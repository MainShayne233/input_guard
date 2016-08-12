# InputGuard
Watches your inputs and protects them from nasty, malicious, venomous, unwanted character types.

## Install
Place ```input_guard.js``` into wherever you're storing your js files. (es6 version included just cus)
```bash
$ git clone git@github.com:MainShayne233/input_guard.git
$ mv input_guard/input_guard.js /your/js/directory/
```
Then include it on your page
```html
<script src="/your/js/directory/input_guard.js"></script>
```
Or load it using whatever fancy Javascript tools you kids are using these days.

## Usage

We have a helpless little input that needs guarding:
```html
<input id="sitting_duck"/>
```
No worries input! Help is on the way! Let's create our heroic guard and put it on duty.
```javascript
var guard = new InputGuard({
                    exclude: ['!', '%', '#', '&', '*'] // keys to be rejected
                })
                
guard.watch('sitting_duck') // argument is the id of your input
```
Perfect! The guard will turn away any of the special characters that we specified.

What's that little input, you can't deal with ```'numbers'``` today? No worries, we'll just let the guard know that.
```javascript
var guard = new InputGuard({
                    exclude: ['!', '%', '#', '&', '*', 'numbers']
                })
                
guard.watch('sitting_duck')
```
There, safe from mathematical harm. Aw input, you're saying you miss the number ```'7'```? We'll give it an exception pass that the guard will accept.
```javascript
var guard = new InputGuard({
                    exclude: ['!', '%', '#', '&', '*', 'numbers'],
                    include: ['7']
                })

guard.watch('sitting_duck')
```

Keys specified in exclude will be rejected, and keys in included will be allowed passage to your input/
Each key must be specified explicitly, unless it belongs to one of these special groups:
```javascript
'numbers'
'letters'
'lowercase letters'
'uppercase letters'
'functional keys' // ['Tab', 'Backspace', ' ', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete']
'all' // all keys except for functional keys
```

```'functional keys'``` were specifically left out of being included in ```'all'``` on purpose, and you must specify it explicitly, even when using ```'all'```

```javascript
var guard = new InputGuard({
                    exclude: ['all', 'functional keys'],
                    include: ['!']
                })
```

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).