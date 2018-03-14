var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
var Post = Bmob.Object.extend("post");
var query = new Bmob.Query(Post);
var countId;
Page({
  data: {
    takeSession: false,
    requestResult: '',
    items1: [
      { name: 'sell', value: '我要转让'},
      { name: 'buy', value: '我要购买', checked: 'true'},
    ],
    items2: [
      { name: 'male', value: '男' },
      { name: 'female', value: '女', checked: 'true' },
    ],
    tagArray:['标签1','标签2','标签3','标签4','标签5'],
    tagIndex:0
  },
  onLoad: function(){
    query.count({
      success: function (count) {
        common.showTip("查询成功：" + count+".");
        countId = count+1;
      },
      error: function (error){
        //查询失败
      }
    })
  },
  formSubmit: function(event){
    var Post = Bmob.Object.extend("post");
    var post = new Post();
    //获取表单数据
    var price = event.detail.value.price;
//    var buyOrSell = event.detail.value....;
    var contactName = event.detail.value.contactName;
    var phone = event.detail.value.phone;
    var itemName = event.detail.value.itemName;
    var itemDescription = event.detail.value.itemDescription;


    post.set("price", price);
    post.set("contactName", contactName);
    post.set("phone", phone);
    post.set("itemName", itemName);
    post.set("itemDescription", itemDescription);
    post.set("postId", countId);
    post.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        common.showTip("日记创建成功, objectId:" + result.id);
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');

      }
    });

  }

})