$(function(){
    var currentQuiz = null;
    $("#startButton").on("click",function(){
        if(currentQuiz == null){
            currentQuiz = 0;
            $("#question").text(questions[0].question);
            $("#options").empty();
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
            });
            $("#startButton").attr("value","Next");
        }else{
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");

                    }else{
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                        $("#options").append(`<input name='options' type='radio' value='${index
                        }'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;
                }
                
            });
        }
    });
});