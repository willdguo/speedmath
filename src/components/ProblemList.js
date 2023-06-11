const ProblemList = ( {problems, theme} ) => {

    // problem colors for good/mid/bad times. odd = light theme, even = dark theme
    const colors = ['green', 'lightgreen', 'grey', 'white', 'red', 'lightcoral']

    // returns which interval a certain time difference falls in
    const getRange = (k) => {
        const badTime = 3.5 
        const goodTime = 1.5

        // 0 = good, 1 = mid, 2 = bad
        if(k < goodTime){
            return 0
        }else if (k < badTime){
            return 1
        }else{
            return 2
        }

    }

    return (
        <dl id = 'problem-list'>
            {problems.map(problem =>
                <li key = {problem.id} id = {problem.id} style = {{color: `${colors[getRange(problem.time) * 2 + (theme % 2)]}`, opacity: '50%', background: ['white','black'][theme]}}>
                    {problem.problem} {problem.time}
                </li>
            ).reverse()}
        </dl>
    )

}


export default ProblemList