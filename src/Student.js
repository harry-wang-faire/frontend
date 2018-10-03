import React, { Component } from 'react';
import './Student.css';
import {Collapse} from 'react-collapse';
import ReactDOM from 'react-dom';
import {Tag} from 'antd';

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
            tags : [],
        }
        this.showGrade = this.showGrade.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
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
    handleKeypress(e){
        if (e.key === 'Enter'){

            var val = e.target.value;
            e.target.value = '';
            console.log(val);
            let tags = this.state.tags.slice(0);
            tags.push(val);
            this.setState({
               tags: tags
            });
            console.log(this.props);
            this.props.addTags(this.props.value,tags);
        }
    }

    renderTags(){
        if (this.props.value.tags === undefined) return;
        var tags = [];
        for (let i = 0; i < this.props.value.tags.length; i++){
            tags.push(<Tag color="#DEDDDE" className="tag">{this.props.value.tags[i]}</Tag>)
        }
        return tags;
    }

    getTags(){
        var input = <input className="taglabel" onKeyPress={this.handleKeypress} placeholder="Add a tag"/>
        return input;
    }
    render(){
        console.log(this.state.tags);
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
                        <div className="tags">
                            {this.renderTags()}
                        </div>
                        {this.getTags()}
                    </Collapse>

                </span>

                    <button className={sign} onClick={this.showGrade}></button>



            </div>
        );
    }
}

export default Student;