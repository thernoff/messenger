# js transform
babel --presets es2015 server/credentials.js -d __deployme/
babel --presets es2015 server/server.js -d __deployme/
babel --presets es2015 server/models/ -d __deployme/server/models
babel --presets es2015 server/utils/ -d __deployme/server/utils


# done
date; echo;

