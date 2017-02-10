# Example chat application with yii2 + jii comet + neatcomet + react + redux

## Install

1. Install depends:

```
composer install
npm install
```

2. Create database `example-yii2-comet-redux` in mysql database

3. Copy `config.sample.php` -> `config.php` and configure database

4. Run database migrations

```
php yii migrate
```

5. Configure comet server - copy `config.sample.js` -> `config.js` and update site domain (if need)

6. Deploy frontend scripts (js/css)

```
node webpack
```

7. Run comet server

```
node jii
```

8. Run application at `http://example-yii2-comet-redux.local:5143` and test it!