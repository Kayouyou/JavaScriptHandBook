//获取对应表单选中的选项信息

function getSelectedOptions(selectbox) {
    var  result = new Array();
    var option = null;
    for (var i = 0,len=selectbox.options.length;i < len;i++){
        option = selectbox.options[i];
        if (option.selected) {
            result.push(option);
        }
    }
}

//使用例子
var selectedbox = document.getElementById("selLocation");
var selectedOption = getSelectedOptions(selectedbox);
var message = "";
for (var  i = 0,len = selectedOption.length,i < len,i++){
    message += "selectedindex:"+selectedOption[i].index + "\nselected text:" + selectedOption[i].text
    + "\nselected value:" + selectedOption[i].value + "\n\n";
}
alert(message);


//14.3.2 添加选项
//最佳方案
var newOption = new  Option("option text","option value");
selectedbox.add(newOption,undefined);

//14.3.3 移除选项
selectedbox.removeChild(selectedbox.options[0]);
selectedbox.remove(0);
selectedbox.options[0] = null;

//以上三种方法都可以移除第一个







