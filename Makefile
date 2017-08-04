all xpi: README.html
	zip --must-match -r toggleproxy2.xpi data pages background.js proxy.js manifest.json README.html

README.html: README.md
	./prepare-release README

distclean clean:
	rm -f README.html toggleproxy2.xpi
