# How to use web workers

### Point

#### 登場人物

* UIスレッド　(メインスレッド)
* worker　　　(ワーカースレッド)

#### 処理の流れ

1. UIスレッドがworkerスレッドを作成する
2. UIスレッドはonmessageでworkerの終了イベントをlistenしておく
3. UIスレッドがworkerにpostMessageで入力データを渡して処理を実行する
4. workerが処理を実行し、postMessageでUIスレッドに結果を返す
5. UIスレッドがworkerの結果を受け取る

#### 注意点

* workerはUIスレッドとは別のJavaScriptファイルにする
* Web Workerはサーバからファイルを読み込まなければ実行できない
  => セキュリティエラーになる
* workerがさらにworkerを呼べるのは(subworker)Gecko系だけ
* workerは利用できるオブジェクトや機能が限られている  
  => console.logが使えない、DOM操作できない
* workerは独立したスレッドのように扱われる
  => ライブラリを使いたければ、worker側でimportScripts()で読み込む


#### Sample

##### ui_thread.js
```javascript:ui_thread.js
var worker = new Worker('worker.js');
worker.postmessage("ui-thread");
worker.onmessage = function(event) {
  console.log(event.data);
};
```

##### worker.js
```javascript:worker.js
self.onmessage = function(event) {
  var msg = "This worker called by " + event.data;
  self.postMessage(msg);
};
```

### Get starting

#### 必要なもの

* node
* npm
* ruby
* compass

#### commands

1. git clone
```
git clone git@github.com:taise/webworker.git
```

2. package.jsonのモジュールをinstallする
```
cd webworker & npm install
```

3. bower.jsonのモジュールをinstallする
```
bower install
```

4. scss等のコンパイルを実行する
```
grunt -f
```

5. gruntのサーバを起動する
```
grunt server
```

6. ブラウザが立ち上がって、workerを経由したメッセージがconsole.logに出力される


#### その他注意点

* workerでライブラリを読み込むにはimportScripts()を利用する。
   => workerをnewする毎にライブラリを読み込むため、ブラウザ／サーバともに負荷が高くなる。
      [毎回ライブラリを読み込むサンプル](https://github.com/taise/webworkerImport)

* require.jsと併用することができる
   => [UIスレッド](https://github.com/jrburke/requirejs/blob/master/tests/workers.html)
      [workerスレッド](https://github.com/jrburke/requirejs/blob/master/tests/workers.js)
      ここの例では、workerスレッドがライブラリ(require.js)を読み込んでいることがわかる

* ただし、場合によってはrequire.js内で使うべきではない
   => workerスレッド側で再度ライブラリを読み込まなければならないため、  
      読み込みモジュールが多くなるケースも。

