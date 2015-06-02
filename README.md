## http://kijtra.com

http://gohugo.io/tutorials/github-pages-blog/#hosting-personal-organization-pages:fcefb200141ace3e7bfd6542457b7a72

### repos

- [kijtra.github.io-root](https://github.com/kijtra/kijtra.github.io-root)  
  local directory root
- [kijtra.github.io](https://github.com/kijtra/kijtra.github.io)  
  blog public directory


### Steps

すべてルートディレクトリ作業

```sh
git init
git config user.name "kijtra"
git config user.email "kijtra[at]gmail.com"
git remote add origin https://github.com/kijtra/kijtra.github.io-root.git
```

```sh
hugo -t kijtra
rm -rf public
git add -A
git commit -m "before add submodule"
git submodule add git@github.com:kijtra/kijtra.github.io.git public
```

```sh
deploy.sh
```
