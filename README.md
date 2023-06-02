# DEV: allure-js-parser 

To see instructuions and usage take a look on [README](./README-pack.md)


## Contribution
Feel free to contribute!

### Changes
 - after making changes run:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
 
### Publishing
 - all publishing files (specified in [tsconfig.build.json](./tsconfig.build.json)) will go to 'dist' folder and also - [README-pack](./README-pack.md)
and [package-publish.json](./package-publish.json)
 - to change some data for publishing change within file [package-publish.json](./package-publish.json), version will be set automatically
 - when adding dependency also add into [package-publish.json](./package-publish.json)