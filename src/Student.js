import React, { Component } from 'react';
import './Student.css';

class Student extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            avatar : props.value.pic,
            name :   props.value.firstName.toUpperCase() + ' ' + props.value.lastName.toUpperCase(),
            email : props.value.email,
            company : props.value.company,
            skill : props.value.skill,
            average : this.calculateAverage(props.value.grades),
        }
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

    render(){
        return (
            <div className="Student">
<div className="photo">
                 <img className='avatar' src={this.state.avatar} />
</div>
                <div className="information">
                <b className='name'>  {this.state.name} </b>
                <p className='email'> Email: {this.state.email} </p>
                <p className='company'> Company: {this.state.company} </p>
                <p className='skill'> Skill: {this.state.skill} </p>
                <p className='average'> Average: {this.state.average} </p>
                </div>

            </div>
        );
    }
}

export default Student;