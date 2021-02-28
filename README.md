<p align="center">
  <a href="LINK_TO_APP">
    <img width="200" src="./chodo_icon.png">
  </a>
</p>

<h1 align="center">chodo</h1>

<div align="center">

The to-do list dapp to build your next dream project.

TODO

</div>

## 💡 What is

Chodo is a to-do list dapp powered by the solana blockchain that helps you manage your works by organizing tasks.

## 📦 How to run

### Devnet

The program has been already deployed to the devnet, so we just need to start the client react application:

```bash
npm install
npm run web:start
```

### Localnet

Make sure you have all needed tools executing this:

```bash
node --version
npm --version
npx --version
rustup --version
rustc --version
cargo --version
docker -v
```

If it's all fine ok, otherwise install missing ones.

Now we need to start the localnet, create a new account, build the program and deploy it. All of this can is done by this commands:

```bash
npm install
npm run cli:launch
```

You will see the address of the program you just deployed on the terminal, copy it and open app.config.json file. We need to modify it a little bit:

```json
{
	"programAddress": "PAST_THE_PROGRAM_ADDRESS_HERE",
	"network": "localnet",
	"walletProviderUrl": "https://www.sollet.io"
}
```

We have only to start the client application and we did it:

```bash
npm run web:start
```

Hurray!
