<<<<<<< HEAD
```
npm init
npm install —save-dev babel-cli
```
Create .babelrc in project folder
{
	‘presets’: [‘latest’, ‘react’, ‘stage-0’]
}
latest: transpile everything ECMAScript from ES2015, ES2016, ES2017
react: jsx
stage-0: anything that has been propose as ECMAScript feature

```
npm install --save-dev babel-preset-latest babel-preset-react babel-preset-stage-0
./node_modules/.bin/babel ./src/index.js --out-file ./dist/bundle.js
```
Create webpack.config.js
```
npm install webpack@1.13.3 --save-dev
npm install babel-loader@6.2.5 --save-dev
npm install webpack-dev-server@1.16.2 --save-dev

./node_modules/.bin/webpack  //create bundle.js
```
Modify index.html to access assets/bundle.js
Modify package.json "start": "./node_modules/.bin/webpack-dev-server"

```
npm install --save-dev style-loader css-loader autoprefixer-loader sass-load node-sass
```


createClass
ES6 class
Stateless function component - no locale method, performance benefit
const MyComponent = (props) => (<div>{props.title}</div>)
=======
# demo-react
>>>>>>> 7a7df7cc888c6f9d8014917c08b59bf33449758c
