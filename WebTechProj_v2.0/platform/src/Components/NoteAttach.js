import React, {Component, useState} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { getUser, createNote, getNoteAttach} from '../Calls';
import { noteAttachRoute } from './ApiRouter';
import { Button, TextField } from '@material-ui/core'

class NoteAttach extends Component {


    constructor(props){
        super(props)

        this.state = {
            rows: []
        };

        this.data = 0;
    }

    async componentDidMount (){
        this.data = await getNoteAttach(this.props.match.params.id);
        if (this.data.hasErrors) {
            alert(this.data.message);
            return;
        }
        
        this.setState({rows: this.data[0]});
        console.log(this.data[0].Attachments[0].AttachmentReff);
        document.querySelector(".frame").innerHTML = this.data[0].Attachments[0].AttachmentReff;
        
    }

    async sendTo(){
        let textField=document.getElementById("tf")
        if(textField.textContent!==""){

            
            let user=await getUser(textField.textContent)
            console.log(user)
            let post=await getNoteAttach(this.props.match.params.id)

            let newPost={

                NoteDate: post.NoteDate,
                NoteText: post.NoteText,
                SubjectId: post.SubjectId,
                Attachments: post.Attachments,
                UserId: user.UserId
            }

            console.log(newPost)
            await createNote(newPost)
           
        }
    }
    
    render() {
        return (
            <div>
                
                
                <div>{this.state.rows.NoteDate}</div>
                <div>{this.state.rows.NoteText}</div>
                <div className="frame"></div>
            </div>

           
        )
    }


    
}
    
    
    

export default NoteAttach;

