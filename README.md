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
* workerがさらにworkerを呼べるのは(subworker)Gecko系だけ
* workerは利用できるオブジェクトや機能が限られている  
  => console.logが使えない、DOM操作できない


#### sample

```javascript:ui_thread.js
var worker = new Worker('worker.js');
worker.postmessage("ui-thread");
worker.onmessage = function(event) {
  console.log(event.data);
};
```

```javascript:worker.js
self.onmessage = function(event) {
  var msg = "This worker called by " + event.data;
  self.postMessage(msg);
};
```
