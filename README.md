# pomoid
This is an Pomodoro Timer React application made with `create-react-app`.
If you don't know what is the Pomodoro technique check this [link](https://en.wikipedia.org/wiki/Pomodoro_Technique).

## App running on heroku
http://pomoid.herokuapp.com

## Getting started
These instructions will get you a copy of the project up and running on your local machine

First of all, clone the repository. On your terminal use:
```sh
git clone https://github.com/lucasfrosty/pomoid.git
```

<br>
### Download the dependencies of the project:
In your terminal, run:
```sh
npm install
```

<br>
### Running the app:
Using npm:
```sh
npm start
```
or using gulp:
```
gulp
```
This last option is only working with yarn, if you want to use gulp with npm change the task 'yarn' on the `gulpfile.js` to run the `npm start` command instead of `yarn start`. And besides run the server, the gulp is also compiling the sass (when changed) into css, and using autoprefixer.
<br>

## License
This project is licensed under the MIT License.
