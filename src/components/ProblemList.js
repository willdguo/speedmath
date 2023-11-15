import { List, Label } from "semantic-ui-react"

const ProblemList = ( {problems, theme} ) => {

    // returns which interval a certain time difference falls in
    const getRange = (k) => {
        const badTime = 3.5;
        const goodTime = 1.5;

        if(k < goodTime){
            return 'green';
        }else if (k < badTime){
            return 'grey';
        }else{
            return 'red';
        }
    }

    const listStyle = {
        height: '280px',
        maxHeight: '280px',
        overflow: 'auto',
    };
    
    return (
        <>
            <h4> Problems </h4>
            <List style = {listStyle}>
                {problems.map(problem =>
                    <List.Item key = {problem.id}>
                        {problem.problem} 
                        <List.Content floated="right">
                            <Label color={getRange(problem.time)}> {problem.time} </Label>
                        </List.Content>
                    </List.Item>
                ).reverse()}
            </List>
        </>
    )

}


export default ProblemList