import React from 'react';
import { Table } from 'reactstrap';

import Style from '../main.scss';

class priceTable extends React.Component {
    
    render() {
        return (
            <Table size="sm" className={Style.table}>
                <thead>
                <tr>
                    <th>Germany</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Shop 1</td>
                    <td>5000</td>
                </tr>
                <tr>
                    <td>Shop 2</td>
                    <td>5500</td>
                </tr>
                <tr>
                    <td>Shop 3</td>
                    <td>5300</td>
                </tr>
                </tbody>
                <thead>
                <tr>
                    <th>Russia</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Shop 1</td>
                    <td>4300</td>
                </tr>
                </tbody>
            </Table>
            
        );
    }
}

export default priceTable;
