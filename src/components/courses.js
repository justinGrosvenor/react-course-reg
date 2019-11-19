import React, { Component} from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { Badge } from "@material-ui/core";
import { unmountComponentAtNode } from 'react-dom';
const courses = require('../courses.json');


class Courses extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            courses: courses,
            registered: [0,0,0,0]
        };
    }

    onDismiss(node) {
        unmountComponentAtNode(node);
        document.body.removeChild(node);
    }

    incrementRegistered = index => {
        this.setState(state => {
          const registered = this.state.registered.map((count, id) => {
            if (id === index) {
              return count + 1; 
            } else {
              return count;
            }
          });
          return {
            registered,
          };
        });
    };
    
    
    render() {
        return (
          <div>
            <ul>
                {this.state.courses.courses.map(course =>
                <li key={course.id}>
                    <h4>{course.id}. {course.name}</h4>
                    <h4>Registered: <Badge>{this.state.registered[course.id - 1]}</Badge></h4>
                    <GridContainer justify="flex-start">
                        <GridItem xs={12} sm={12} md={8}>
                            <Button key={course.id} onClick={() => this.incrementRegistered(course.id -1 )} color="primary" round>
                                Add
                            </Button>
                            <Button key={course.name} onClick={() => this.onDismiss.bind(course.id) } color="primary" round>
                                Delete
                            </Button>
                        </GridItem>
                    </GridContainer>
                </li>
                )}
            </ul>
              <h4>Total Registrations: {this.state.registered.reduce((a, b) => a + b, 0)}</h4>
          </div>
        )
    };
}
export default Courses;

