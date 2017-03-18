import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

class SteamCMD extends Component {
  render() {
    if (this.props.steamcmdExists) {
      return(
        <div>
          <Input name="steamcmdLocalLocation" id="steamcmdLocalLocation"
            value={this.props.steamcmdLocation} readOnly></Input>
          <br />
          <Button color="primary" onClick={this.props.handleButtonClick}>Change SteamCMD location</Button>
        </div>
      )
    } else {
      return(
        <div>
          <Input name="steamcmdLocalLocation" id="steamcmdLocalLocation"
            value="No steamcmd location" readOnly></Input>
          <br />
          <Button color="primary" onClick={this.props.handleButtonClick}>Browse for steamcmd</Button>
        </div>
      )
    }
  }
}

export default class SettingsPage extends Component {
  constructor(props) {
    super(props)

    const remote = require('electron').remote
    const cSettings = remote.getGlobal('lib').configSettings
    let exists
    let steamcmdLoc
    if (cSettings.get('steamcmdLoc', '') === undefined) {
      exists = false
      steamcmdLoc = ''
    } else {
      exists = true
      steamcmdLoc = cSettings.get('steamcmdLoc')
    }
    this.state = {steamcmdPath: steamcmdLoc, steamcmdLocExists: exists}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
  }
  componentWillUpdate(nextProps, nextState) {

  }
  handleSubmit() {
    // Saving steamcmd location to config
    const remote = require('electron').remote
    const cSettings = remote.getGlobal('lib').configSettings
    // console.log(cSettings)
    cSettings.set('steamcmdLoc', this.state.steamcmdPath)
    console.log("Saving steamcmdLoc: ", cSettings.get('steamcmdLoc', ''))
    alert("Settings saved...")
  }
  handleExit() {
    const remote = require('electron').remote
    var window = remote.getCurrentWindow()
    window.close()
  }

  handleButtonClick(e) {
    this.fileUpload.click()
  }

  handleFileInput(e) {
    e.persist()
    var fileObj = this.fileUpload.files[0]
    const remote = require('electron').remote
    const fs = remote.require('fs')
    console.log(fileObj)

    if (fs.existsSync(fileObj.path)) {
      this.setState({steamcmdPath: fileObj.path})
    } else {
      this.fileUpload.files = []
      alert("steamcmd.exe or steamcmd source cannot be found")
      console.log("steamcmd.exe or steamcmd source cannot be found")
    }
  }

  render() {
    return (
      <div>
        <h1 style={{"textAlign": "center"}}>Settings</h1>
        <div id="SettingsPage" className="container">
          <br />

            <FormGroup row className="container">
              <Label for="steamcmdLocalLocation">SteamCMD Location:</Label>
              <Col>
                <SteamCMD steamcmdExists={this.state.steamcmdLocExists}
                  steamcmdLocation={this.state.steamcmdPath}
                  handleButtonClick={this.handleButtonClick} />
                <input id="fileInputID" type="file" ref={(ref) => this.fileUpload = ref}
                  onChange={this.handleFileInput} style={{display: 'none'}}/>
              </Col>
            </FormGroup>
            <br />
            <br />
            <FormGroup className="row justify-content-between container">
              <Button color="success" type="submit" onClick={this.handleSubmit}
                className="col-4" value="Submit">Save</Button>
              <Button color="alert" type="submit" onClick={this.handleExit}
                className="col-4" value="Submit">Exit</Button>
            </FormGroup>
        </div>
      </div>
    )
  }
}