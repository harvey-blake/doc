

# 20. 解码交易详情


这一讲，我们以未决交易（Pending Transaction）为例，介绍如何解码交易详情。

## 未决交易

未决交易是用户发出但没被矿工打包上链的交易，在mempool（交易内存池）中出现。

下面是一个转账`ERC20`代币的未决交易，你可以在[etherscan](https://etherscan.io/tx/0xbe5af8b8885ea9d6ae8a2f3f44315554ff62daebf3f99b42eae9d4cda880208e)上查看交易详情：

![ERC20未决交易](./img/20-1.png)

红框中是这个交易的`input data`，看似杂乱无章的十六进制数据，实际上编码了这笔交易的内容：包括调用的函数，以及输入的参数。我们在etherscan点击**Decode Input Data**按钮，就可以解码这段数据：

![Decode Input Data](./img/20-2.png)

解码之后，我们可以看到这笔交易调用的函数以及输入的参数。

## Interface类

`ethers.js`提供了`Interface`类方便解码交易数据。声明`Interface`类型和声明`abi`的方法差不多，例如：

```js
const iface = ethers.Interface([
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
    "function approve(address, uint256) public returns (bool)"
]);
```

## 解码交易数据

下面我们写一个解码未决交易数据的脚本。

1. 创建`provider`和`wallet`，监听交易时候推荐用`wss`连接而不是`http`。

    ```js

    const ALCHEMY_MAINNET_WSSURL = 'wss://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';
    const provider = new ethers.WebSocketProvider(ALCHEMY_MAINNET_WSSURL);
    let network = provider.getNetwork()
    network.then(res => console.log(`[${(new Date).toLocaleTimeString()}] 连接到 chain ID ${res.chainId}`));
    ```

2. 创建`Interface`对象，用于解码交易详情。

    ```js
    const iface = new ethers.Interface([
    "function transfer(address, uint) public returns (bool)",
    ])
    ```

3. 获取函数选择器。

    ```js
    const selector = iface.getFunction("transfer").selector
    console.log(`函数选择器是${selector}`)
    ```

4. 监听`pending`的`ERC20` 转账交易，获取交易详情并解码：

    ```js
    // 处理bigInt
    function handleBigInt(key, value) {
        if (typeof value === "bigint") {
            return value.toString() + "n"; // or simply return value.toString();
        }
    return value;
    }

    provider.on('pending', async (txHash) => {
    if (txHash) {
        const tx = await provider.getTransaction(txHash)
        j++
        if (tx !== null && tx.data.indexOf(selector) !== -1) {
            console.log(`[${(new Date).toLocaleTimeString()}]监听到第${j + 1}个pending交易:${txHash}`)
            console.log(`打印解码交易详情:${JSON.stringify(iface.parseTransaction(tx), handleBigInt, 2)}`)
            console.log(`转账目标地址:${iface.parseTransaction(tx).args[0]}`)
            console.log(`转账金额:${ethers.formatEther(iface.parseTransaction(tx).args[1])}`)
            provider.removeListener('pending', this)
        }
    }})
    ```

    ![监听并解码交易](./img/20-3.png)

5. 交易参数解码：

    ![交易参数解码](./img/20-4.png)

## 完整代码
```js
import { ethers } from "ethers";
// 1. 创建provider和wallet，监听事件时候推荐用wss连接而不是http

const ALCHEMY_MAINNET_WSSURL = 'wss://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';
const provider = new ethers.WebSocketProvider(ALCHEMY_MAINNET_WSSURL);
let network = provider.getNetwork()
network.then(res => console.log(`[${(new Date).toLocaleTimeString()}]连接到chain-id:${res.chainId}`))

// 2. 创建interface对象，用于解码交易详情。
const contractABI = [
    "function transfer(address, uint) public returns (bool)",
]
const iface = new ethers.Interface(contractABI)

// 3. 获取函数选择器。
const selector = iface.getFunction("transfer").selector
console.log(`函数选择器是${selector}`)

// 4. 监听pending的erc20 transfer交易，获取交易详情，然后解码。
// 处理bigInt
function handleBigInt(key, value) {
    if (typeof value === "bigint") {
        return value.toString() + "n"; // or simply return value.toString();
    }
    return value;
}

let j = 0
provider.on('pending', async (txHash) => {
    if (txHash) {
        const tx = await provider.getTransaction(txHash)
        j++
        if (tx !== null && tx.data.indexOf(selector) !== -1) {
            console.log(`[${(new Date).toLocaleTimeString()}]监听到第${j + 1}个pending交易:${txHash}`)
            console.log(`打印解码交易详情:${JSON.stringify(iface.parseTransaction(tx), handleBigInt, 2)}`)
            console.log(`转账目标地址:${iface.parseTransaction(tx).args[0]}`)
            console.log(`转账金额:${ethers.formatEther(iface.parseTransaction(tx).args[1])}`)
            provider.removeListener('pending', this)
        }
    }
}
)
```
