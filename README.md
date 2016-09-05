# What's this?

- You can get the average life expectancy.
- 平均余命が分かります。

# How to use?

- If you input age via command line, you can get the average life expectancy by day.
- コマンドラインで年齢を入れると平均余命を教えてくれます。

```sh
$ node getLifeExpectancy.js 40
40years 0days, 41years 208days
40years 1days, 41years 207days
…
40years 365days, 40years 223days
```

- Also you can use Web GUI.
- ブラウザ向けのGUIもあります。

# How to build?

- First time
- 初回のみ
```sh
$ npm install
```

- After first time
- 2回目以降
```sh
$ npm run watch
```