
const checkToggle = (setToggle, setMaxParam) => {

    // for some reason this isn't consistent - doesn't always accept toggle for other users
    if('toggle' in localStorage) {
        const toggle = (parseInt(localStorage.getItem('toggle')) + 1) % 2
        console.log("loading... toggle")
        setToggle(toggle)
        setMaxParam(['40','120'][toggle])
        //console.log(toggle)
    }

}

const checkProblems = (setDisplayProblems) => {

    if('displayProblems' in localStorage) {
        
        console.log("loading... displayProblems")

        const d = localStorage.getItem('displayProblems')
        
        if(parseInt(d) === 1){
            setDisplayProblems(1)
        } else {
            setDisplayProblems(0)
        }

    }

  }

  const checkTheme = (setTheme) => {

    if('theme' in localStorage) { 
        console.log("loading... theme")

        const storedTheme = parseInt(localStorage.getItem('theme'))
        setTheme(storedTheme)

    }

  }

export default { checkToggle, checkProblems, checkTheme}