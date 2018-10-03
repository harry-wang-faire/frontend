import React, { Component } from 'react';
import './Student.css';
import {Collapse} from 'react-collapse';
import ReactDOM from 'react-dom';

class Student extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            avatar : props.value.pic,
            name :   props.value.firstName.toUpperCase() + ' ' + props.value.lastName.toUpperCase(),
            email : props.value.email,
            company : props.value.company,
            skill : props.value.skill,
            grade : props.value.grades,
            average : this.calculateAverage(props.value.grades),
            isOpened : false,
        }
        this.showGrade = this.showGrade.bind(this);
    }

    showGrade(event) {
        this.setState({
            isOpened: this.state.isOpened?false:true,
        });
    }

     calculateAverage(grades){
        let res = 0;
        for (let i = 0; i < grades.length; i++){
            res += parseInt(grades[i]);
            //console.log(res);
        }
        //console.log(res);
        var ave = res/grades.length;
        return ave + '%';
    }
    getScores(){
        let row = [];
        for (let i = 0; i < this.state.grade.length; i++){
            row.push(<p>{"Test" + i + ":     " + this.state.grade[i] + "%"}</p>);
        }
        return row;
    }
    getTags(){
        var input = <input className="tags" placeholder="Add a tag"/>
        return input;
    }
    render(){
        let sign = !this.state.isOpened ? "collapse" : "active";
        return (
            <div className="Student">

            <span className="photo">
                 <img className='avatar' src={this.state.avatar} />
            </span>
                <span className="information">
                <b className='name'>  {this.state.name} </b>
                <p className='email'> Email: {this.state.email} </p>
                <p className='company'> Company: {this.state.company} </p>
                <p className='skill'> Skill: {this.state.skill} </p>
                <p className='average'> Average: {this.state.average} </p>
                    <Collapse isOpened={this.state.isOpened}>
                        {this.getScores()}
                        {this.getTags()}
                    </Collapse>

                </span>

                    <button className={sign} onClick={this.showGrade}></button>



            </div>
        );
    }
}

export default Student;