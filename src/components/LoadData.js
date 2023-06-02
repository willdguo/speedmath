
const checkToggle = (setToggle, setMaxParam) => {

    // for some reason this isn't consistent - doesn't always accept toggle for other users
    if('toggle' in localStorage) {
        const toggle = parseInt(localStorage.getItem('toggle')) + 1
        console.log("loading... toggle")
        setToggle(toggle)
        setMaxParam(['40','120'][toggle % 2])
        console.log(toggle)
    }

}

const checkProblems = (setDisplayProblems) => {

    if('displayProblems' in localStorage) {
        
        console.log("loading... displayProblems")

        const d = localStorage.getItem('displayProblems')
        
        if(d === 'hidden'){
            document.getElementById('problem-list').style.display = 'none'
            document.getElementById('graph').style.display = 'none'
            setDisplayProblems('Show Problems')
        } else {
            document.getElementById('problem-list').style.display = 'block'
            document.getElementById('graph').style.display = 'flex'
            setDisplayProblems('Hide Problems')
        }

    } else {
        document.getElementById('problem-list').style.display = 'none'
        document.getElementById('graph').style.display = 'none'

    }

  }

  const checkTheme = (setTheme) => {

    if('theme' in localStorage) { 
        console.log("loading... theme")

        const storedTheme = parseInt(localStorage.getItem('theme'))

        //const temp = ['light', 'dark']
        // console.log("theme in local storage! " + temp[localStorage.getItem('theme')])
        setColors(storedTheme)
        setTheme(storedTheme)

    }

  }

    // wait why is this in here - try extracting somewhere else perhaps
  const setColors = (k) => { 
    
    // console.log("setting colors " + k)
    const tc = ['white', 'black'] // background colors - alternates b/t white & black
    const gc = ['light', 'dark'] // general color - alternates b/t lighter & darker colors
    const cc = ['white', 'grey'] // conditional color - certain elements don't work well w/ white/black so they'll have less extreme colors

    var all = document.querySelectorAll('*:not(img)')

    for(var i = 0; i < all.length; i++){

      let element = all[i]

      if(element.tagName.toLowerCase() === 'button'){
        element.style.background = cc[k % 2]
      } else {
        element.style.background = tc[k % 2]
      }

      if(element.id !== 'toggle'){

          if(!element.hasAttribute('key')){

            element.style.color = tc[(k + 1) % 2]
    
          }

      }

    }

    document.getElementById('game').style.background = gc[k % 2] + "grey"

  }




export default { checkToggle, checkProblems, checkTheme, setColors }