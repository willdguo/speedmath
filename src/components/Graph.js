import { ScatterChart, Scatter, Label, XAxis, YAxis } from 'recharts'

const Graph = ( {data, theme} ) => {

    const colors = ['black', 'white']

    return (

        <div id = "graph">

            <ScatterChart width={600} height={400} margin = {{ top: 5, right: 10, left: 50, bottom: 20 }}>

                <XAxis type="number" dataKey="x" stroke = {colors[theme]}>
                <Label value = "Problems" position = "bottom"/>
                </XAxis>

                <YAxis type="number" dataKey="time" stroke = {colors[theme]}>
                <Label value = "Time" position = "insideRight" angle = {-90} offset = {50} />
                </YAxis>

                <Scatter id = "scatter" data = {data} fill = {colors[theme]} lineJointType='monotoneX' line/>

            </ScatterChart>

        </div>
    )

}


export default Graph