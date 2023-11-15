import { ScatterChart, Scatter, Label, XAxis, YAxis } from 'recharts'

const Graph = ( {data} ) => {

    return (
        <ScatterChart 
            width={600} 
            height={400} 
            margin={{ top:5, right:10, left:50, bottom:20 }}
        >
            <XAxis type="number" dataKey="x" stroke="black">
                <Label value = "Problems (#)" position = "bottom"/>
            </XAxis>
            <YAxis type="number" dataKey="time" stroke="black">
                <Label value = "Time (s)" position = "insideRight" angle = {-90} offset = {50} />
            </YAxis>
            <Scatter id = "scatter" data = {data} fill="black" lineJointType='monotoneX' line/>
        </ScatterChart>
    )

}


export default Graph