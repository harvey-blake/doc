
# 9. 事件过滤



## 过滤器

当合约创建日志（释放事件）时，它最多可以包含[4]条数据作为索引（`indexed`）。索引数据经过哈希处理并包含在[布隆过滤器](https://en.wikipedia.org/wiki/Bloom_filter)中，这是一种允许有效过滤的数据结构。因此，一个事件过滤器最多包含`4`个主题集，每个主题集是个条件，用于筛选目标事件。规则：

- 如果一个主题集为`null`，则该位置的日志主题不会被过滤，任何值都匹配。
- 如果主题集是单个值，则该位置的日志主题必须与该值匹配。
- 如果主题集是数组，则该位置的日志主题至少与数组中其中一个匹配。

![过滤器规则](img/9-1.png)



## 构建过滤器
`ethers.js`中的合约类提供了`contract.filters`来简化过滤器的创建：

```js
const filter = contract.filters.EVENT_NAME( ...args )
```

其中`EVENT_NAME`为要过滤的事件名，`..args`为主题集/条件。前面的规则有一点抽象，下面举几个例子。

1. 过滤来自`myAddress`地址的`Transfer`事件
  ```js
  contract.filters.Transfer(myAddress)
  ```

2. 过滤所有发给 `myAddress`地址的`Transfer`事件
  ```js
  contract.filters.Transfer(null, myAddress)
  ```

3. 过滤所有从 `myAddress`发给`otherAddress`的`Transfer`事件
  ```js
  contract.filters.Transfer(myAddress, otherAddress)
  ```

4. 过滤所有发给`myAddress`或`otherAddress`的`Transfer`事件
  ```js
  contract.filters.Transfer(null, [ myAddress, otherAddress ])
  ```

## 监听交易所的USDT转账


1. 从币安交易所转出USDT的交易

  监听USDT合约之前，我们需要先看懂交易日志`Logs`，包括事件的`topics`和`data`。我们先找到一笔从币安交易所转出USDT的交易，然后通过hash在etherscan查它的详情：

  交易哈希：[0xab1f7b575600c4517a2e479e46e3af98a95ee84dd3f46824e02ff4618523fff5](https://etherscan.io/tx/0xab1f7b575600c4517a2e479e46e3af98a95ee84dd3f46824e02ff4618523fff5)

  ![etherscan 示意图](img/9-2.png)

  该交易做了一件事：从 `binance14` （币安热钱包）向地址`0x354de44bedba213d612e92d3248b899de17b0c58` 转账`2983.98`USDT。

  查看该事件日志`Logs`信息：

  ![etherscan logs示意图](img/9-3.png)

  - `address`：USDT合约地址
  - `topics[0]`：事件哈希，`keccak256("Transfer(address,address,uint256)")`
  - `topics[1]`：转出地址（币安交易所热钱包）。
  - `topics[2]` 转入地址。
  - `data`：转账数量。

2. 创建`provider`，`abi`，和`USDT`合约变量：

  ```js
  const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
  // 合约地址
  const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
  // 交易所地址
  const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
  // 构建ABI
  const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)",
  ];
  // 构建合约对象
  const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);
  ```

3. 读取币安热钱包USDT余额。可以看到，当前币安热钱包有8亿多枚USDT
  ```js
  const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
  console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT,6)}\n`)
  ```
  ![币安热钱包USDT余额](img/9-4.png)


4. 创建过滤器，监听`USDT`转入币安的事件。

  ```js
  // 2. 创建过滤器，监听转移USDT进交易所
  console.log("\n2. 创建过滤器，监听USDT转进交易所")
  let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
  console.log("过滤器详情：")
  console.log(filterBinanceIn);
  contractUSDT.on(filterBinanceIn, (res) => {
    console.log('---------监听USDT进入交易所--------');
    console.log(
      `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
    )
  })
  ```
  ![监听转入币安的USDT交易](img/9-5.png)

4. 创建过滤器，监听`USDT`转出币安的交易。

  ```js
    // 3. 创建过滤器，监听交易所转出USDT
    let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance);
    console.log("\n3. 创建过滤器，监听USDT转出交易所")
    console.log("过滤器详情：")
    console.log(filterToBinanceOut);
    contractUSDT.on(filterToBinanceOut, (res) => {
      console.log('---------监听USDT转出交易所--------');
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
      )
    }
    );
  ```
  ![监听转出币安的USDT交易](img/9-6.png)

## 完整代码

```js
import { ethers } from "ethers";

// 利用Alchemy的rpc节点连接以太坊网络

const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 合约地址
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 交易所地址
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
// 构建ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];
// 构建合约对象
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);


(async () => {
  try {
    // 1. 读取币安热钱包USDT余额
    console.log("\n1. 读取币安热钱包USDT余额")
    const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
    console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT,6)}\n`)

    // 2. 创建过滤器，监听转移USDT进交易所
    console.log("\n2. 创建过滤器，监听USDT转进交易所")
    let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
    console.log("过滤器详情：")
    console.log(filterBinanceIn);
    contractUSDT.on(filterBinanceIn, (res) => {
      console.log('---------监听USDT进入交易所--------');
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
      )
    })

    // 3. 创建过滤器，监听交易所转出USDT
    let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance);
    console.log("\n3. 创建过滤器，监听USDT转出交易所")
    console.log("过滤器详情：")
    console.log(filterToBinanceOut);
    contractUSDT.on(filterToBinanceOut, (res) => {
      console.log('---------监听USDT转出交易所--------');
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
      )
    }
    );
  } catch (e) {
    console.log(e);
  }
})()
```
