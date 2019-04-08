var Tx = require('ethereumjs-tx')
const process = require('process');
var Web3 = require("web3");
var  MyConstant= require('../Constant/constant.js')
var exec = require('child_process').exec

const WebSocket = require('ws');
const ws = new WebSocket('ws://155.230.16.117:13000');
web3 = new Web3(new Web3.providers.WebsocketProvider("ws:155.230.16.117:7545"));



ws.on('open', function open() {
    ws.send('something');
  });
   
  ws.on('message', function incoming(data) {
    console.log(data);
  });

const dashcamAddress = MyConstant.dashcamAddr1
// const dashPrivateKey = MyConstant.dashcamPrivateKey1

const EvidenceABI = MyConstant.EvidenceABI

// const SearchAddress = MyConstant.SearchAddress

const frame_hash = process.argv[2]

var lockStatus = false;
//var fn = process.argv[3]

web3.eth.getTransactionCount(dashcamAddress, (err, txCount)=>{
const data = MyConstant.EvidenceData
const txObject = {
    from : dashcamAddress,
    nonce : web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    gas : 1000000,
    data : data
    }

web3.eth.sendTransaction(txObject, (err, txHash)=>{
    console.log('txHash:', txHash)
    var txHash = txHash
    web3.eth.getTransactionReceipt(txHash, (err, receipt)=>{
        console.log(receipt.contractAddress)
        const EvidenceContract = new web3.eth.Contract(EvidenceABI, receipt.contractAddress)
        EvidenceContract.methods.setEvidence(frame_hash, 4, 4).send({
            from : dashcamAddress,
            gasLimit: web3.utils.toHex(1000000)
        },(err, result)=>{
            console.log('result: ',result)
            process.exit()
            return
        })
    })
    // setTimeout(function(){
    //     return web3.eth.getTransactionReceipt(txHash).then((receipt)=>{
    //         console.log('receipt:',receipt.contractAddress)
    //         const EvidenceContract = new web3.eth.Contract(EvidenceABI, receipt.contractAddress)
    //         EvidenceContract.methods.setEvidence(frame_hash, 4, 4).send({
    //             from : dashcamAddress,
    //             gasLimit: web3.utils.toHex(1000000)
    //         },(err, result)=>{
    //             console.log('result: ',result)
    //         })
    //     })
    // },5000)
})
})

// })

// 1. Deploy Evidence Contract
// web3.eth.getTransactionCount(dashcamAddress, (err, txCount)=>{
//     const data = MyConstant.EvidenceData
//     const txObject = {
//         from : dashcamAddress,
//         nonce : web3.utils.toHex(txCount),
//         gasLimit: web3.utils.toHex(100000000),
//         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//         gas : 1000000,
//         data : data
//     }
    //Sign the transaction
    // const tx = new Tx(txObject)
    // tx.sign(dashPrivateKey)

    // const serializedTx = tx.serialize()
    // const raw = '0x' + serializedTx.toString('hex')

    //Boradcast the transaction
    // web3.eth.sendSignedTransaction(raw)//, (err, txHash)=>{
    //     // console.log('err: ', err, 'txHash: ', txHash)
    //     //Use this txHash to find the contract on Etherscan!
    // .on('transactionHash', function(hash){
    //     console.log('hash : ', hash)
    // }).on('receipt', function(receipt){
    //     console.log('receipt : ', receipt)
    // })

    // web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
    //     console.log('txHash: ', txHash)
    //     web3.eth.getTransactionReceipt(txHash, (err, result)=>{
    //         console.log(result.contractAddress)
    //         const EvidenceContract = new web3.eth.Contract(EvidenceABI, result.contractAddress)
    //         EvidenceContract.methods.setEvidence(frame_hash, 4, 4).send({
    //             from : dashcamAddress,
    //             gasLimit: web3.utils.toHex(1000000)
    //         },(err, result)=>{
    //              console.log('result: ',result)
            
    //     })
    //     })
    // // })

    // web3.eth.sendTransaction(txObject, (err, txHash)=>{
    //     console.log('txHash: ', txHash)
    //     var txHash = txHash
    //     setTimeout(function(){
    //         return web3.eth.getTransactionReceipt(txHash).then((receipt)=>{
    //             console.log(receipt.contractAddress)
    //             const EvidenceContract = new web3.eth.Contract(EvidenceABI, result.contractAddress)
    //             EvidenceContract.methods.setEvidence(frame_hash, 4, 4).send({
    //                 from : dashcamAddress,
    //                 gasLimit: web3.utils.toHex(1000000)
    //             },(err, result)=>{
    //                 console.log('result: ',result)
            
    //     })
    //         })
    //     },3000)
        // web3.eth.getTransactionReceipt(txHash, (err, result)=>{
        //     console.log(result.contractAddress)
        //     const EvidenceContract = new web3.eth.Contract(EvidenceABI, result.contractAddress)
        //     EvidenceContract.methods.setEvidence(frame_hash, 4, 4).send({
        //         from : dashcamAddress,
        //         gasLimit: web3.utils.toHex(1000000)
        //     },(err, result)=>{
        //          console.log('result: ',result)
            
        // })
        // })
   // })
    
    // (receipt)=>{
    //     console.log(receipt)
        // const EvidenceContract = new web3.eth.Contract(EvidenceABI, receipt.contractAddress)
        // EvidenceContract.methods.setEvidence(SearchAddress, frame_hash, 4, 4).send({
        //     from : dashcamAddress,
        //     gasLimit: web3.utils.toHex(1000000)
        // },(err, result)=>{
        //     console.log(result)
            
        // })
    // })
//})



    
