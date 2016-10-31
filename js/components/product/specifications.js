import React from 'react';
import { Table, Card } from 'reactstrap';

import Style from '../main.scss';

class specifications extends React.Component {

    render() {
        return (
            <div>
                <h1 className="display-5">Specifications</h1>
                <br />
                <Card block outline color="info">
                <Table hover className={Style.table}>
                    <thead>
                    <tr>
                        <th>Basic</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Capacity</td>
                        <td>400 W</td>
                    </tr>
                    <tr>
                        <td>Battery type</td>
                        <td>Lion</td>
                    </tr>
                    <tr>
                        <td>Type of drill</td>
                        <td>Drill, Grind</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>1.5 kg</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>100-600 rpm</td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <th>Components</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Case</td>
                        <td>Yes</td>
                    </tr>
                    </tbody>
                </Table>
                </Card>
             </div>
        );
    }
}

export default specifications;




