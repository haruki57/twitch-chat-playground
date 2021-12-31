const path = require('path');

module.exports = {
  // モードの設定
  mode: 'development',
  // エントリーポイントの設定
  entry: `./src/index.ts`,
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },

  // ファイルの出力設定
  output: {
    // 出力するファイル名
    filename: "bundle.js",
    //  出力先のパス
    path: path.join(__dirname, 'dist')
  }
};
