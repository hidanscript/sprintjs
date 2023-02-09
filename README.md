
<p align="center" style="background-color: white;">
  <img src="https://repository-images.githubusercontent.com/598000748/5b348ff3-7308-410d-bfcd-6d69d0671bd1">
</p>

## Make your REST APIs get a Sprint!

Sprint is a test backend framework developed with Typescript using the built-in Node.js API modules, all the code in this repo may change a lot, so take a lemonade 🍋 🥃, sit down and let's see how I created my own backend framework.

(Any similarities with express, are pure coincidence)
## Installation

Install sprint with npm

```bash
  npm install sprintjs-core
```
    
## Get Started
With Sprint, you can have your own server with custom routes running with just a few lines of code!
```javascript
const { Sprint } = require('sprintjs-core');

Sprint.router.get('/', (req, res) => {
  res.end('Hello world from sprint!');
});

Sprint.init(3000, () => {
  console.log(`Server is running on port 3000!`);
});

```


## License

[MIT](https://choosealicense.com/licenses/mit/)

