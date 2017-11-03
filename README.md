# Nina

Nina checks domains for SSL certificates and displays the expiration date of certificates.

## Installation

Nina runs on [Crystal](https://crystal-lang.org/) using [Kemal](http://kemalcr.com). Another prerequisite to run this is [OpenSSL](https://www.openssl.org/).

```
git clone git@github.com:lxxxvi/nina.git
cd ./nina
shards install
crystal run ./src/nina.cr
```

It won't run on Windows.

## Targets

You can have domains stored as "targets" and list them on the page.

i.e. if you want to have `google.com`:

```
cd ./nina
touch ./public/targets/google.com.txt
```

Then refresh the page and hit the Refresh button.

## Credits

[Nina Simone's "Funkier Than a Mosquito's Tweeter"](https://www.youtube.com/watch?v=5GsCHQkulr4)
