# Nina

Nina checks domains for SSL certificates and displays the expiration date of certificates.

## Installation

Nina runs on [Crystal](https://crystal-lang.org/) using [Kemal](http://kemalcr.com). Another prerequisite is [OpenSSL](https://www.openssl.org/).

```sh
git clone git@github.com:lxxxvi/nina.git
cd ./nina
shards install
crystal run ./src/nina.cr
```

It most likely won't run on Windows.

## Targets

You can have domains stored as "targets" and list them on the page.

i.e. if you want to have `google.com`:

```sh
cd ./nina
touch ./public/targets/google.com.txt
```

Then refresh the page and hit the Refresh button.

## Todo

* [ ] Tests (!)
* [ ] Bugfixing: certain domains fail
* [ ] Display more properties of certificates (e.g. Certificate Issuer, or "expires in ... days")

## Credits

[Nina Simone's "Funkier Than a Mosquito's Tweeter"](https://www.youtube.com/watch?v=5GsCHQkulr4)
