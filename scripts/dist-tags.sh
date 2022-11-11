sh ./dist-tag.sh @public-ui/core $1
sh ./dist-tag.sh @public-ui/schema $1
sh ./dist-tag.sh @public-ui/components $1
sh ./dist-tag.sh @public-ui/themes $1
sh ./dist-tag.sh @public-ui/angular $1
sh ./dist-tag.sh @public-ui/preact $1
sh ./dist-tag.sh @public-ui/react $1
sh ./dist-tag.sh @public-ui/solid $1
sh ./dist-tag.sh @public-ui/vue $1

sh ./dist-tag.sh create-kolibri $1
