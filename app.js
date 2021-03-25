
//variables
const database = firebase.database()
const opt_div = document.getElementById('opt-div')
const q_para = document.getElementById("q-para")
const qNum_div = document.getElementById('qNum-div')
const timer_div = document.getElementById('timer-div')
const nxt_btn = document.getElementById('nxt')
const quizApp = document.getElementById('quizApp')
const main = document.getElementById('main')
const user_name = document.getElementById('user-name')


window.value = ""
var qcount = 0
var score = 0
var correctans = 0
var wrongans = 0
var attempt = 0
var unattempt = 0

//fetching data from database
const showQ = (myCallback) => {
    var leadsRef = database.ref('question-dataset')
    leadsRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            window.questions = childSnapshot.val()
            printQuestion(qcount,questions)
        });
    });
}

const printQuestion=(e,questions)=>{
    //print question 
    var q_paratxt = document.createTextNode(questions[e].q)
    q_para.appendChild(q_paratxt)
    //print options
    for (let i = 0; i < questions[e].op.length; i++) {
        var lab = document.createElement("label")
        var labTxt = document.createTextNode(questions[e].op[i])
        var input = document.createElement("input")
        input.setAttribute("type", "radio")
        input.setAttribute("name", "q-op")
        input.setAttribute("onclick", "check(this)")
        lab.setAttribute("class", "active")
        lab.appendChild(input)
        lab.appendChild(labTxt)
        opt_div.appendChild(lab)
        var br = document.createElement("br")
        opt_div.appendChild(br)
    }
    //show question number in header div
    var x;
    x = qcount;
    var qNumTxt = document.createTextNode("Question Number :" + ++x + "/" + questions.length);
    qNum_div.appendChild(qNumTxt);
}

//to load data in  body
document.getElementById('quizApp').addEventListener("load",showQ(0,printQuestion))

//getting checked value from option div
const check = (e) => window.value = e.parentNode.lastChild.nodeValue

//next function
const next = () => {
    opt_div.innerHTML = ""
    q_para.innerHTML = ""
    qNum_div.innerHTML = ""
    if (window.value == questions[qcount].ans) {
        score += 10;
        correctans++;
        attempt++;
        window.value = ""
    }
    else if (window.value == "") {
        unattempt++;
    }
    else if (window.value != questions[qcount].ans) {
        wrongans++;
        attempt++;
        window.value = ""
    }

    qcount++
    if (qcount == questions.length) {
        printResult()
    }
    else {
        showQ(qcount,printQuestion)
    }
}

const printResult = () => {
    main.innerHTML = "";
    var h1 = document.createElement("h1")
    var h1txt = document.createTextNode("Result")
    var br = document.createElement("br")
    var p1 = document.createElement("p")
    var p1txt = document.createTextNode("Correct Ans " + correctans)
    var p2 = document.createElement("p")
    var p2txt = document.createTextNode("Wrong Ans " + wrongans)
    var p3 = document.createElement("p")
    var p3txt = document.createTextNode("Scores " + score)
    var p4 = document.createElement("p")
    var p4txt = document.createTextNode("Attempt " + attempt)
    var p5 = document.createElement("p")
    var p5txt = document.createTextNode("Unattempt " + unattempt)
    h1.appendChild(h1txt)
    main.appendChild(h1)
    main.appendChild(br)
    p1.appendChild(p1txt)
    main.appendChild(p1)
    main.appendChild(br)
    p2.appendChild(p2txt)
    main.appendChild(p2)
    p3.appendChild(p3txt)
    main.appendChild(p3)
    main.appendChild(br)
    p4.appendChild(p4txt)
    main.appendChild(p4)
    main.appendChild(br)
    p5.appendChild(p5txt)
    main.appendChild(p5)
    main.appendChild(br)

    ///home link
    var homebtn = document.createElement("a")
    var homebtntxt = document.createTextNode("Go to Home page")
    homebtn.setAttribute("href","index.html")
    homebtn.appendChild(homebtntxt)
    main.appendChild(homebtn)

    ///start again
    var sabtn = document.createElement("a")
    var sabtntxt = document.createTextNode("Start Again")
    sabtn.setAttribute("href","quizApp.html")
    sabtn.setAttribute("style","float:right")
    sabtn.appendChild(sabtntxt)
    main.appendChild(sabtn)

    var userId=localStorage.getItem("uid")
    var d = new Date();
    var dt=d.toLocaleString()
        var Data={
            score:score,
            correctans:correctans,
            wrongans:wrongans,
            attempt:attempt,
            unattempt:unattempt,
            date:dt
        }
        
        database.ref("Users").child(userId).child("result").push(Data)

}

//timer
var total_seconds = 300;
var c_minutes = parseInt(total_seconds / 60);
var c_seconds = parseInt(total_seconds % 60);

const CheckTime = () => {
    timer_div.innerHTML = 'Time Left: ' + c_minutes + ' : ' + c_seconds + 's';

    if (total_seconds <= 0) {
        for (i = 0; i < questions.length; i++) {
            next();
        }
    }
    else {
        total_seconds = total_seconds - 1;
        c_minutes = parseInt(total_seconds / 60);
        c_seconds = parseInt(total_seconds % 60);
        setTimeout("CheckTime()", 1000);
    }
}
setTimeout("CheckTime()", 1000);








