cd kolibri

# Storybook build
cp -r ../dist storybook

# Demo build
cd demo
rm -rf .git kolibri_modules .itzbund.crt Jenkinsfile* package-lock.json package.local.json
npm pack @public-ui/angular @public-ui/core @public-ui/components @public-ui/react @public-ui/schema @public-ui/solid @public-ui/themes
mv kolibri-angular-*.tgz kolibri-angular.tgz
mv kolibri-core-*.tgz kolibri-core.tgz
mv kolibri-lib-*.tgz kolibri-lib.tgz
mv kolibri-react-*.tgz kolibri-react.tgz
mv kolibri-schema-*.tgz kolibri-schema.tgz
mv kolibri-solid-*.tgz kolibri-solid.tgz
mv kolibri-themes-*.tgz kolibri-themes.tgz
cp ../../scripts/make-public.js ./
node make-public.js
rm -rf .npmrc make-public.js package-lock.json node_modules
cd ../

# Designer build
cd designer-build
npm i
npm run build
mv dist ../designer
cd ..
rm -rf designer-build

cd ../
tar cfvz dist/kolibri-care-package.tgz kolibri
