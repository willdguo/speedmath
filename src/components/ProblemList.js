const ProblemList = ( {problems, theme} ) => {

    // returns which interval a certain time difference falls in
    const getRange = (k) => {
        const badTime = 3.5 
        const goodTime = 1.5

        if(k < goodTime){
            return 'good'
        }else if (k < badTime){
            return 'mid'
        }else{
            return 'bad'
        }

    }
    
    return (
        <dl className = 'problem-list'>
            {problems.map(problem =>
                <li key = {problem.id} id = {problem.id} className = {`${getRange(problem.time)} ${theme ? '' : 'dark'}`}>
                    {problem.problem} {problem.time}
                </li>
            ).reverse()}
        </dl>
    )

}


export default ProblemList