import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle: ''
    }

    componentDidMount() {
        this.getQueryParams();
    }
    
    componentDidUpdate(){
        this.getQueryParams();
    }
    
    getQueryParams(){
        // console.log(this.props)
        // load query params
        const query = new URLSearchParams(this.props.location.search);
        // loop thru and extract params
        for (let param of query.entries()) {
            // check to see if new course is loaded to prevent infinite loops
            if(this.state.courseTitle !== param[1]){
                this.setState({ courseTitle: param[1] });
            }
        }
    }

    render (props) {

        return (
            <div>
                <h1>{this.state.courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;