# rails-react-spa-example
api_only Rails + React(SPA) example.

### Prerequisites (My env)

- ruby 2.3.1p112 (2016-04-26 revision 54768) [x86_64-darwin16]
- Node.js v10.5.0
- Rails 5.1.6
- wget(or curl)

### How to develop

#### Initialize project (We already done this step.)

```
# Create new rails project
rails new --skip-yarn --api --skip-coffee --skip-action-cable --skip .

# Initialize Javascript
npm init -f

# Install laravel-mix and react
npm install laravel-mix react react-dom -S

# Copy and save laravel-mix configuration(`webpack.mix.js`)
wget https://raw.githubusercontent.com/laravel/laravel/master/webpack.mix.js
```

#### Development

```
# Install dependencies
bundle install && npm install

# Start Rails(API server)
bundle exec rails s -b 0.0.0.0

# Start front-end dev server.
npm run hot
```

#### Build

```
# Build production assets (will output assets to `public`)
npm run production
```