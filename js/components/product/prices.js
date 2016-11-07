import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row} from 'reactstrap';
import classnames from 'classnames';

import PriceTable from './priceTable';

class prices extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
            <h1 className="display-5">Prices</h1>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} >
                            New
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }} >
                            Used
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }} >
                            Rent
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <br />
                            <PriceTable />
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <br />
                            <PriceTable />
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <br />
                            <PriceTable />
                        </Row>
                    </TabPane>
                </TabContent>
                <Button size="lg" color="secondary">Add store free</Button>
            </div>

        );
    }
}

export default prices;
