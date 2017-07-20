# cleanup last version
rm -rf __deployme
mkdir __deployme

# build
sh scripts/build.sh

#copy files
cp -r server/public/ __deployme/server/public/
cp -r server/views/ __deployme/server/views/
cp -r etc/ __deployme/etc/
cp package.json __deployme/
cp Procfile __deployme/
# done
date; echo;

