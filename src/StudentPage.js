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
            filterstudents: [],
            tagvalue: '',
        };
        this.filterByName = this.filterByName.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.changeValuetags = this.changeValuetags.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
        this.addTags = this.addTags.bind(this);
    }

    renderStudents(){
        return this.filterByName().map((student) => <Student key={student.firstName} addTags={this.addTags} value={student}/>)
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


    filterByName() {
        console.log(this.state.namevalue);
        if (this.state.namevalue === '' && this.state.tagvalue === ''){
            return this.state.students;
        } else if (this.state.tagvalue === ''){
            let name = this.state.namevalue.toLowerCase();
            var filteredStudents = [];
            for (let i = 0; i < this.state.students.length; i++){
                let firstName = this.state.students[i].firstName.toLowerCase().substring(0,name.length);
                let lastName = this.state.students[i].lastName.toLowerCase().substring(0,name.length);
                if (firstName.indexOf(name) !== -1 || lastName.indexOf(name) !== -1){
                    filteredStudents.push(this.state.students[i]);
                }
            }
            return filteredStudents;
        }else{
            let arr = [];
            for (let i = 0; i < this.state.students.length; i++){

                console.log(this.state.students[i]);
                if (this.state.students[i].tags === undefined) this.state.students[i].tags = [];
                if (this.state.students[i].tags.includes(this.state.tagvalue)){
                    arr.push(this.state.students[i]);
                }

            }
            return arr;
        }

    }

    addTags(student,n) {
        var temp = this.state.students[this.state.students.indexOf(student)];
        temp.tags = n.slice();
        var arrcopy = this.state.students.slice();
        arrcopy[this.state.students.indexOf(student)] = temp;

        this.setState({
            students: arrcopy,
        });
    }

    changeValue(event){
        console.log(event);
        this.setState({
            namevalue: event.target.value,
        });
    }
    changeValuetags(event){
        console.log(event);
        this.setState({
            tagvalue: event.target.value,
        });
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
                        <input id='tagBar' value={this.state.tagvalue} placeholder="Search by tags" onChange={this.changeValuetags}/>
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