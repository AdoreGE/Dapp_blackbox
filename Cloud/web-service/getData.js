
var Web3 = require('web3')
var sqlite3 = require('sqlite3').verbose();
var MyConstant = require('../../Constant/constant.js')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))

var db = new sqlite3.Database('/Users/thkim/Development/Blockchain/Dapp_blackbox/Cloud/evidence.db');


const cloudAddr = MyConstant.cloudAddr
const cloudPrivateKey = MyConstant.cloudPrivateKey
const SearchAddr = MyConstant.SearchAddress

const SearchContract = new web3.eth.Contract(MyConstant.SearchABI, MyConstant.SearchAddress)
//1초마다 반복실행
! function getAddress(){
    SearchContract.methods.getAddress().call().then((result)=>{
        console.log(result)
        
        for(var i = 0;i<result.length;i++){
            var addr = result[i]
            getData(addr)
        }
    })

    setTimeout(function(){
        getAddress()
    },1000)
}()

function getData(addr){
    console.log(addr)
    SearchContract.methods.getData(addr).call().then((data)=>{
        //console.log(data)
        var stmt = db.prepare("INSERT OR IGNORE INTO contract VALUES (?,?,?)")
        var time = data[0].toString()
        var location = data[1].toString()
        
    
        stmt.run(addr, time, location)
        stmt.finalize()
    })
}

//db 추가로 생성