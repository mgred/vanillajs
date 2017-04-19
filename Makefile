.PHONY: build

build: src/index.html
	cp $? dist/index.html
	closure-compiler --js ./src/*.js ./src/**/*.js \
		--entry_point=./src/main.js \
		--dependency_mode=LOOSE \
		--module_resolution=NODE \
		--language_out=ES5 \
		--js_output_file=./dist/bundle.js

