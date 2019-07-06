import React from "react"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { Tabs, Tab } from "@material-ui/core";


export default class NewFunctionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab:0
    }
  }

  handleTabChange(event,tab) {
    this.setState({tab})
  }

  render() {

    return (
      <div>
        <Tabs value={this.state.tab} onChange={this.handleTabChange.bind(this)}>
          <Tab label={'From Store'} />
          <Tab label={'Custom'} />
        </Tabs>
        {this.renderTabContent()}
      </div>
    )
  }

  renderTabContent() {
    console.log(this.state)
    if(this.state.tab==0) 
      return this.renderStore()

    if(this.state.tab==1) 
      return this.renderCustom()
  }

  //MAybe break these out into seperate Components?
  renderStore() {
    return "Store"
  }

  renderCustom() {
    return 'Custom'
  }
}