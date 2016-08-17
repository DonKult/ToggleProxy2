# ToggleProxy2

Firefox extension for toggling between two proxy setupsat the click of a button.
This is an addon-sdk based reimplementation of [Toggle Proxy](http://www.quirkyquipu.co.uk/firefox/)
using the same config.

## Features

* same look, feel and config as the original [Toggle Proxy](http://www.quirkyquipu.co.uk/firefox/)
* an addon-sdk – not XUL – extension aka norestart, multiprocess compatible, …

## (Better?) Alternatives

Beside the original there is a plentory of other options.

## So, why another one?

I just prefer the simplicity in both user- as well as code POV.

## Installation

At the moment you have to build the extension yourself to install it. Given
that I approximate the userbase to be only me, I have no plans to shuffle the
addon into the review queue as it would just waste valuable reviewer time.
That also means you have to run a Developer/Nightly edition of Firefox as it
isn't signed.

If that wasn't discouraging enough you have to install
[jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm) and
[Pandoc](http://pandoc.org/) after which `make` will produce an xpi for you.

## License

The extension is MIT (Expat) licensed.

	Copyright © 2016 David Kalnischkies <david@kalnischkies.de>

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is furnished to do
	so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
