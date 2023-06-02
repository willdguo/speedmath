function genProblem (upper, lower, setQuestion) {

    function getRandomAdd() {
        const rand1 = Math.floor(Math.random() * (upper - lower)) + lower
        const rand2 = Math.floor(Math.random() * (upper - lower)) + lower
    
        console.log('random add')
        console.log(rand1, rand2)
        setQuestion([rand1, rand2, 0])
    }
    
    // remove chance of getting same number 2ce by altering bounds
    function getRandomMinus() {
        const rand1 = Math.floor(Math.random() * (2 * upper - lower)) + lower
        const rand2 = Math.floor(Math.random() * (2 * upper - lower)) + lower
    
        console.log('random minus')
        // console.log(rand1, rand2)
        setQuestion([Math.max(rand1, rand2), Math.min(rand1, rand2), 1])
    }
    
    function getRandomMult() {
        const rand1 = Math.ceil(Math.random() * (2 * lower - 1)) + 1 
        const rand2 = Math.ceil(Math.random() * (2 * lower - 1)) + 1
        console.log('random mult')
    
        setQuestion([rand1, rand2, 2])
    }
    
    function getRandomDiv() {
        const rand1 = Math.ceil(Math.random() * (2 * lower - 1)) + 1
        const rand2 = Math.ceil(Math.random() * (2 * lower - 1)) + 1
        const val1 = rand1 * rand2
        console.log('random div')
    
        setQuestion([val1, rand2, 3])
    
    }
    
    function getRandomQuestion(){
        const questionType = [getRandomAdd, getRandomAdd, getRandomMinus, getRandomMinus, getRandomMult, getRandomDiv] 
        const pickType = Math.floor(Math.random() * (questionType.length))
    
        questionType[pickType]()

        return('question should be ?')
    }

    return () => {getRandomQuestion()}

}


export default { genProblem }