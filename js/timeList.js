$(document).ready(function () {
    var demo = binding('select',function (input) {
        var timeCol,
            timeArr,
            timeList,
            timeTest=[],
            timeTest1=[];

        function testArr(arr1,arr2) {
            return !(arr1[1]<arr2[0] || arr1[0]>arr2[1])
        }

        timeArr =  $(".list li").text().split(/-|\s/g);

        for(var a=0;a<timeArr.length-1;a+=2){
            timeTest1=[];
            timeTest1.push(timeArr[a]);
            timeTest1.push(timeArr[a+1]);
            timeTest.push(timeTest1);
        }

        timeCol = input.value.split("-");

        for(var i=0;i<timeTest.length;i++){
            if(testArr(timeTest[i],timeCol)){
                timeCol=[timeTest[i].concat(timeCol).sort()[0],timeTest[i].concat(timeCol).sort()[3]];
                timeTest.splice(i,1);i--;
            }
        }

        if(timeTest.length==0){
            timeList = [timeCol];
        }else {
            for(var j =0;j<timeTest.length;j++){
                if (timeTest[j][0]>timeCol[1]){
                    timeTest.splice(j,0,timeCol);
                    timeList=timeTest;
                    break;
                }else {
                    timeList = timeTest.concat([timeCol]);
                }
            }
        }
        timeList =timeList.map(function (val) {
            return "<li>"+val.join("-")+" </li>"
        });
        $(".list").html(timeList.join(""))
    });
});