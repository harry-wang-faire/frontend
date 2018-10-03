import React,{ Component } from 'react';
import Student from './Student';
import './StudentPage.css';
class  StudentPage extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            students: [],
            onloading: true,
            namevalue: '',
            namefilter: false,
            filterstudents: [],
        };
        this.filterByName = this.filterByName.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
    }

    renderStudents(){
        let rows = [];
        if (!this.state.namefilter) {
            for (let i = 0; i < this.state.students.length; i++) {
                rows.push(<Student key={this.state.students[i].firstName} value={this.state.students[i]}/>);
            }
        }else{
            console.log(this.state.filterstudents);
            for (let j = 0; j < this.state.filterstudents.length; j++) {
                console.log(this.state.filterstudents[j]);
                rows.push(<Student key={this.state.filterstudents[j].firstName} value={this.state.filterstudents[j]}/>);
            }
        }
        console.log(rows);
        return rows;
    }

    fetchData(){
        fetch('https://www.hatchways.io/api/assessment/students')
            .then(response => response.json())
            .then(response => {
            //console.log(response);
            this.setState({
                onloading: false,
                students: response.students,
            });
            //console.log(this.state.students);
        }).catch(function (err) {
            console.log(err);
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    filterByName(){
        console.log(this.state.namevalue);
         if (this.state.namevalue === ''){
            this.setState({
                namefilter: false,
            });
        }else{
             let name = this.state.namevalue.toLowerCase();
             var filteredStudents = [];
             for (let i = 0; i < this.state.students.length; i++){
                 let firstName = this.state.students[i].firstName.toLowerCase().substring(0,name.length);
                 let lastName = this.state.students[i].lastName.toLowerCase().substring(0,name.length);
                 if (firstName.indexOf(name) !== -1 || lastName.indexOf(name) !== -1){
                     console.log(name);
                     console.log(firstName);
                     console.log(lastName);
                     filteredStudents.push(this.state.students[i]);
                 }
                 console.log(filteredStudents);
                 if (filteredStudents.length >= 0){
                     this.setState({
                         namefilter: true,
                         filterstudents: filteredStudents,
                     });
                 }

             }
         }

    }

    changeValue(event){
        console.log(event);
        this.state.namevalue = event.target.value;
        this.filterByName();
    }
    changeValuetags(event){
        console.log(event);
        this.state.namevalue = event.target.value;
        this.filterByName();
    }

    render(){
        //console.log(this.state);
        if (this.state.onloading){
             return (
                <div>
                    {console.log('loading....')}
                </div>
            );
        }else {
            return (
                <div className='StudentPage'>
                    <div className='nameSearchBar'>
                        <input id='nameBar' value={this.state.namevalue} placeholder="Search by name" onChange={this.changeValue}/>
                    </div>
                    <div className='tagSearchBar'>
                        <input id='tagBar' value={this.state.namevalue} placeholder="Search by tags" onChange={this.changeValuetags}/>
                    </div>

                    <div className='studentList'>
                    {this.renderStudents()}
                    </div>
                </div>
            );
        }
    }
}

export default StudentPage;