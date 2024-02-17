# 目的

AstroとSupabaseを使用したwebアプリケーション
github actionsによるテスト・ビルド・デプロイの自動化

## 概要

create astro@latest -- --template basicsとSupabaseで構築されたwebアプリケーションプロジェクトです。

プロトタイプとなっているプロジェクトは以下の通り

[プロトタイプ](https://github.com/k-gitest/astro-svelte-supabase-prototype)

### 自動化の流れ

- git -> push / pr -> github actions -> type test -> unit test -> e2e test -> build -> deploy -> netlify

## 開発環境

- astro 4.1.1
- svelte 4.2.8
- supabase 2.39.3
- zod 3.22.4
- jest
- playwright
- github actions
- nix

```text
/ 
├── public 
├── src
│    │── components
│    │── layouts
│    │── lib
│    │── pages
│    │     │─── api
│    │     │     │──── auth
│    │     │     └──── database
│    │     └────────── callback
│    │── store
│    │── types
│    └── middleware.ts
├── tests => jest
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── e2e => playwright
└── .github/workflows
```

## 注意点

- netlifyへのデプロイはSSGの場合はnwtgck/actions-netlifyなどを使用しても良いとは思うが、SSRの場合はenvを読み込むのでNetlify CLIを使用する

- nixではブラウザインストール時にsudo aptが使用できずライブラリのエラーが出る

- default.nixやshell.nixにplaywright-testのpkgを入れたら使用できる

### github actions 速度改善

- actions cacheを利用してインストールをスキップさせて時間を短縮する

- npmパッケージの場合はnode_modulesをキャッシュしてidで条件分岐してスキップする

- playwrightのブラウザのインストールに時間がかかってしまう。node_modulesのキャッシュとは別なのでplaywrightはスキップされるが、ブラウザは毎回インストールされてしまう

- microsoft公式のdockerイメージを使うとplaywrightインストール不要で短縮できるが、まれに503エラーになる時がある、containerのinitが毎回ある

- nixはgithub actionsでnixコマンドが使用できない、Cachixのキャッシュを利用すれば同環境を読み込める

- @playwright/testのversionをキャッシュすればブラウザインストールをスキップできるとのことで実行する

## 結論

- バージョンキャッシュの方法が最も早く、この構成だと1分以内にデプロイまで終了できる

- なるべく公式が配布しているパッケージなどを使用した方が時間を無駄にしなくて済む
