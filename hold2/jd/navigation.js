/*done with game below is navigation*/


function choosePoker(option) {

    let balance = 50000;
    let setTheme = "united";
    if (localStorage.getItem("theme")) {
        setTheme = localStorage.getItem("theme");
    }
    if (localStorage.getItem("balance")) {
        balance = localStorage.getItem("balance");
    }
    if (option === "texas-holdem") {
        window.location.href = "https://steel101.github.io/texas-holdem/? + gaParam + "&theme=" + setTheme + "&balance=" + balance + "&";
    } else {
        window.location.href = "https://steel101.github.io/texas-holdem/? + gaParam + "&theme=" + setTheme + "&balance=" + balance + "&";
    }




}
