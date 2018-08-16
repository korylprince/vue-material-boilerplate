# About

This is an opinionated template for a [Vue](https://vuejs.org/) app. It's meant to be a starting place for new projects, getting the boring boilerplate (building, linting, authentication, routing, etc) out of the way.

# Features

* Material Design app components: [vue-material](https://vuematerial.io/)
* router: [vue-router](https://router.vuejs.org/en/)
* store: [vuex](https://vuex.vuejs.org/en/)
* validation: [vee-validate](http://vee-validate.logaretm.com/)
* HTTP calls: [axios](https://github.com/axios/axios)
* pre-built authentication and sign-in page; just add an API endpoint
* Webpack 2/Babel dev/prod build setup
* Linting with ESLint

# Get Started

Clone this repo:

`git clone https://github.com/korylprince/vue-material-boilerplate.git`

Install packages:

`npm install`

Start developing:

`npm run dev` or `npm run dev-server`

Building for production:

`npm run build-prod`

Use the `API_SERVER` environment variable to proxy `/api` to another server when using the dev-server:

`API_SERVER="http://localhost:8080" npm run dev-server`

This is useful for dealing with CORS issues.

# License

MIT (see included `LICENSE`)
