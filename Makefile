all xpi: README.html manifest.json
	zip --must-match -r toggleproxy2.xpi data pages background.js proxy.js manifest.json README.html

README.html: README.md
	./prepare-release README

manifest.json: manifest.json.in .git
	sed -e 's#@@VERSION@@#$(shell git describe | cut -c 2-)#' < $< > $@

distclean clean:
	rm -f README.html toggleproxy2.xpi
