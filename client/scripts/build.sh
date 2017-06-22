# js transform
babel --presets es2015,react js/source/ -d js/build
# js package
browserify js/build/app.js -o bundle.js
browserify js/build/discovery.js -o discovery-bundle.js
# css package
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
# done
date; echo;

