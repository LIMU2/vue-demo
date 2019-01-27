//fri.js用来存储数据模型

//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到下面创建了一个表，数据有name、age、sex等字段，且定义了数据类型，最后把模型导出即可
const fri = new mongoose.Schema({
  name :String,
  age : Number,
  sex : String,
  email : String,
}, { collection: 'myfri'})///这里mongoose.Schema最好要写上第二个参数，明确指定到数据库中的哪个表取数据，这里写了myfri,目的就是为了以后操作数据要去myhreo表中。这里不写第二个参数的话，后面会遇到坑。


//导出model
const Fri = module.exports = mongoose.model('fri',fri);