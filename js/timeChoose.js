
function daynumber(month) { //判断月份的天数函数
    var date = new Date();
    var year = date.getFullYear();
    var month;
    if(month == 4 || month == 6 || month == 9 || month == 11) {
        days = 30;
    }
    if(month == 2) {
        if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            days = 29;
        } else {
            days = 28;
        }
    } else {
        days = 31;
    }
    return days; //返回月份天数
}

function datequick() { 		//快捷日期选择函数
    var sel = document.getElementById("datequick").value; 	//获得下拉框的值
    var date = new Date(); 					//创建日期实例
    var day = date.getDate(); 				//获取今天的日期
    var month = (date.getMonth() + 1); 		//获取当前月份需加1 JS月份是从0计算
    var year = date.getFullYear(); 			//获取当前年份
    switch(sel) { 							//根据获得的下拉框值执行
        case "1": //昨天
            day1 = day - 1;
            if(day1 == 0) {
                month -= 1; 		//月份减一
                days = daynumber(month); 					//调用daymunber函数并传值
                dateset(year, month, days, month, day1); 	//调用dataset函数并传值
                break;
            }
            dateset(year, month, day1, month, day1);
            break;
        case "2": //今天
            dateset(year, month, day, month, day);
            break;
        case "3": //上周
            var day1 = day - 7; 		//今天日期往前算7天
            var day2 = day - 14; 		//今天日期往前算14天
            if(day1 <= 0) {
                month -= 1;
                days = daynumber(month);
                day1 += days;
                day2 += days;
                dateset(year, month, day2, month, day1);
                break;
            } else if(day2 <= 0) {
                month1 = month - 1;
                days = daynumber(month1);
                day2 += days;
                dateset(year, month1, day2, month, day1);
                break;
            }
            dateset(year, month, day2, month, day1);
            break;
        case "4": //本周  以今天日期往前算为7天
            var day1 = day - 7; 			//有可能会变成负数
            if(day1 <= 0) { 				//条件需为小于或等于0
                month1 = month - 1; 		//月份减一
                days = daynumber(month); 	//调用daymunber函数返回此月份有几天
                days += day1; 				// days天数加上day1  day1是负数
                dateset(year, month1, days, month, day);
            } else {
                dateset(year, month, day1, month, day);
            }
            break;
        case "5": //上月
            month -= 1;
            day = daynumber(month);
            dateset(year, month, '1', month, day);
            break;
        case "6": //本月
            day = daynumber(month);
            dateset(year, month, '1', month, day);
            break;
        case "7": //本年
            dateset(year, '1', '1', '12', '31');
            break;
        default:
            alert('未选择日期');
    }
}
//当前年,开始月份,开始天数,结束月份,结束天数
function dateset(year, month1, day1, month2, day2) { //	日期格式化函数
    if(month1 < 10) {
        month1 = "0" + month1;
    }
    if(day1 < 10) {
        day1 = "0" + day1;
    }
    if(month2 < 10) {
        month2 = "0" + month2;
    }
    if(day2 < 10) {
        day2 = "0" + day2;
    }
    //对输入框赋值
    document.getElementById("rq1").value = year + '-' + month1 + '-' + day1;
    document.getElementById("rq2").value = year + '-' + month2 + '-' + day2;
}