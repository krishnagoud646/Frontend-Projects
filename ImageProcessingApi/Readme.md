# Image Processing API project

1. In this project i am using typescript to write programs.
2. This project is all about to show a resized image as per the user on UI.
3. we have to write url as '/api/images?filename=test&width=200&height=200.
4. we can write any image name, which is inside the server and give width and height
   as per our choice and above 100px.

# Dev dependencies

I have used
1. prettier
2. eslint
3. jasmine
4. sharp
5. TypeScript
6. Express

# To run 
npm run lint
npm run prettier
npm run test
npm run start

# what I have used

1. I have used one resized image which will give me a resized image and show us on UI.
2. If the image is already inside the server folder named as resizedImage. It will show us that .
   image.
3. If the image is successfully showed on the UI. The get request sends successfully the image
   with status 200.
4. if i am giving the half url like /api/images, it will respond the 400 error.
5. else if i am giving filename wrong, in that case it will return 404 error.

# software required

1. VScode Editor
2. installing dependencies
3. Linux

# what if url is wrong

1. For giving a correct url. It will give us successful image on UI with 200 status
2. For giving wrong full url will give us 404 error.
3. if filename width or height is not present it will give us 400 error