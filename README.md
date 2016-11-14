# Intergalactic transaction translator app

## Requirements

* `node.js` LTS with ES6 support
* `npm`

## Installation

If you are a developer do `npm link`:

```
# Assuming you are at the root of the project directory
$ npm link
```

Or if you want install as a global package:

```
# Assuming you are at the root of the project directory
$ npm install -g
```

### Usage: `galaxy-trader <fileNmae>`

```
$ galaxy-trader input.txt
pish tegj glob glob is 42 Credits
glob prok Silver is 68 Credits
glob prok Gold is 57800 Credits
glob prok Iron is 782 Credits
I have no idea what you are talking about
```

> A sample file `input.txt` is included along with the app files for test purposes.

## Tests

Install test framework dependencies, `mocha` and `chai`:

```
$ npm install
```

Run Tests:

```
$ npm test
```
