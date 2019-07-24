//檢查身分證
function checkTWID(id) {
    let f_code, s_code, code_length;
    let ret = false;
    let sum = 0;
    let num;
    let letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
    let regex = /^[A-z][12][0-9]{8}$/; //從A開頭 {8}前面的東西[0-9]出現8次 $為結束點
    if (id.match(regex) != null) {
        f_code = id.charAt(0);
        let n12 = letters.indexOf(f_code) + 10; //算出英文字母對應的數字
        let n1 = parseInt(n12 / 10);
        let n2 = n12 % 10;
        let n3 = parseInt(id.substr(1, 1));
        let n4 = parseInt(id.substr(2, 1));
        let n5 = parseInt(id.substr(3, 1));
        let n6 = parseInt(id.substr(4, 1));
        let n7 = parseInt(id.substr(5, 1));
        let n8 = parseInt(id.substr(6, 1));
        let n9 = parseInt(id.substr(7, 1));
        let n10 = parseInt(id.substr(8, 1));
        let n11 = parseInt(id.substr(9, 1));
        sum = n1 * 1 + n2 * 9 + n3 * 8 + n4 * 7 + n5 * 6 + n6 * 5 + n7 * 4 + n8 * 3 + n9 * 2 + n10 * 1 + n11 * 1;
        ret = sum % 10 == 0;
    }
    this.num = sum; //產生一個可以當作物件身分證回傳相加後的總數
    return ret;
}

function creatID() {
    //取得表單內的值
    let show = document.getElementById("ID");
    let sex = document.getElementById("sex").value;
    let area = document.getElementById("area").value;
    let result = "";
    let f_en; //第一個英文字母:地區
    let n1; //第一個數字 :性別
    // console.log("性別是:" + sex + "地區是:" + area);
    //判斷輸入性別，若無，亂數產生
    if (sex == "No") {
        n1 = parseInt(Math.random() * 2 + 1);
    } else {
        n1 = sex;
    }
    //判斷輸入地區，若無，亂數產生
    if (area == "No") {
        f_en = parseInt(Math.random() * 26) + 65; // 亂數產生A_Z ASCII碼為65-90
        f_en = String.fromCharCode(f_en); //String.fromCharCode()將ASCII轉成英文字母       
    } else {
        f_en = area;
    }
    // console.log("性別是:" + n1 + "地區是:" + f_en);
    let ID = [];
    ID[0] = f_en;
    ID[1] = n1;
    // console.log(ID[0], ID[1]);
    //result 儲存產生的ID
    for (let i = 2; i <= 9; i++) { //產生第2碼後的數字
        ID[i] = parseInt(Math.random() * 9) + 1;
    }
    for (let i = 0; i <= 9; i++) {
        result += ID[i];
    }
    console.log(result);
    // 檢查產生出的身分證是否符合規則
    let check = checkTWID(result);
    if (check) {
        show.value = result;
    } else {
        //取ID的最後一碼
        let n9 = parseInt(result.substr(9, 1));
        //建立一個檢查ID的物件，用來取得身分證號碼相加的值
        let check = new checkTWID(result);
        check.num = (check.num % 10);
        //用來存取新的正確ID
        let result_new;
        let n9_new;
        let result_9 = result.substr(0, 9); //身分證前9碼
        if (check.num != 0) {
            //如果新的N9>10長度會錯誤，將錯的ID改成正確的，當check.num>n9的時候，
            //利用加上(10-check.num)來讓身分證數相加後%10 =0
            if (n9 >= check.num) {
                n9_new = n9 - check.num;
                //將正確的錢碼配上修改後的第10碼完成正確的身分證字號
                result_new = result_9 + n9_new;
            } else {
                n9_new = n9 + (10 - parseInt(check.num));
                result_new = result_9 + n9_new;
            }
        }
        show.value = (`${ result_new}`);
    }



}