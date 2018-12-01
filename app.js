import React from 'react'
import reactDOM from 'react-dom'
import { Autocomplete, TextInput } from 'evergreen-ui';
import ReactModal from 'react-modal';
//import styled from 'styled-components'
let drugs = require('./drugsList.json')
let changeItem;
let addingDrug = [];
let arr=[];

class List extends React.Component {
    constructor() {
        super()
        this.state = {
            durgList: drugs,
            modalstate: false,
            addDrug: [],
            name: '',
            age: '',
            Prescriptions: []


        }
    }
    statusModal() {
       // console.log(this.state.modalstate)
        let modalstatus = !this.state.modalstate
        this.setState({
            modalstate: modalstatus
        })
    }
    addingDrug() {
        
        addingDrug.push(changeItem)
        this.setState({
            addDrug: addingDrug
            
        })
        
    }
    onChangeAddingDrug(){
        this.setState({
            addDrug: event.target.value,
            
        })
    }
    onChangeName(event) {
       // console.log(event.target.value)
        this.setState({
            name: event.target.value
        })
    }
    onChangeAge(event) {
        console.log(event.target.value)
        this.setState({
            age: event.target.value
        })
    }
    render() {
        return (
        <div>
            <header>
                <div>Prescription</div>
                <button id="button1" onClick={() => { this.statusModal() }}>New prescription</button>
                <ReactModal isOpen={this.state.modalstate} >
                    <TextInput type="text" placeholder="Name" onChange={this.onChangeName.bind(this)} value={this.state.name} />
                    <TextInput type="number" placeholder="Age" onChange={this.onChangeAge.bind(this)} value={this.state.age} />
                    <Autocomplete
                        title="Drugs Selction"
                        onChange={changedItem => {
                            changeItem = changedItem
                        }}
                        items={this.state.durgList}
                    >
                        {(props) => {
                            const { getInputProps, getRef, inputValue } = props
                            return (
                                <div>
                                    <TextInput
                                        placeholder="Drugs Selection"
                                        value={inputValue}
                                        innerRef={getRef}
                                        {...getInputProps()}
                                    />
                                    <button onClick={this.addingDrug.bind(this)}>add drug</button>
                                    <p>{this.state.addDrug + ''}</p>
                                </div>)
                        }}
                    </Autocomplete>
                    <button id="save" onClick={() => {

let prescription= {
    addDrug:[this.state.addDrug],
    name:this.state.name,
    age:this.state.age
}
arr.push(prescription)

console.log(this.state.Prescriptions)
this.setState({
    Prescriptions:arr
    
})
                        
                       addingDrug=[];
                        this.statusModal()
                            this.setState({ 
                                //changeItem:'',
                              addDrug: [],
                                name: '',
                                age:''
                            })
                            }
                            }>save</button>
                          
                </ReactModal>
            </header>
            <div >
                    {this.state.Prescriptions.map((item, i) => {
                        return (
                            <div key={i}>
                            <br />
                            <br />
                                name : {item.name}
                                <br />
                                age : {item.age}
                                <br />
                                drugs : {item.addDrug + ''}
                               
                            </div>
                        )
                    })}
                </div>
        </div>)
    }
}
reactDOM.render(<List />, document.getElementById("root"))
