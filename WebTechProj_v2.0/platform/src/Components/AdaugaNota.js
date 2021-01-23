import React, { Component } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import ModifyIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import { Grid, TextField, Button } from '@material-ui/core'
import {getUser, get, post, put, remove} from '../Calls';
import { noteRoute, noteRouteDelete} from './ApiRouter';

class AddNote extends Component {
    constructor(props){
        super(props)

        this.state = {
            Notes: {
                NoteText: "",
                UserId: 0,
                SubjectId: 0,
                NoteDate: ""

            }
        }

        this.onChangeNotita = this.onChangeNotita.bind(this);
        this.saveNotita = this.saveNotita.bind(this);
      
    }

    onChangeNotita(e){
        let newNotita = this.state.Notes;
        newNotita[e.target.name] = e.target.value;
        this.setState({Notes: newNotita});
    }

    async saveNotita(){
        let id = this.props.match.params.id;
        if(!id){
            let noteText = document.getElementById("NoteText");
            let userId = document.getElementById("UserId");
            let subId = document.getElementById("SubjectId");
            let noteDate = document.getElementById("NoteDate");
           
    
            let nota ={
                NoteText:  noteText.value,
                UserId: userId.value,
                SubjectId: subId.value,
                NoteDate: noteDate.value
            }
            
            let elem = await post(noteRouteDelete, nota);
            if (elem.hasErrors){
                alert(elem.message);
                return;
            }
            this.props.history.push("/AfisareNotite"); 
            
        }else{
            let elem = await put(noteRouteDelete, id, this.state.Notes);
            if (elem.hasErrors){
                alert(elem.message);
                return;
            } 
            this.props.history.push("/AfisareNotite"); 
        }
            
        

    }

    async componentDidMount(){
        let id = this.props.match.params.id;
        if (!id)
            return;

        let elem = await get(noteRouteDelete, id);
        if (elem.hasErrors){
            alert(elem.message);
            return;
        } 
        
        this.setState({Notes: elem});
    }


    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={8} sm={8}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="NoteText"
                            name="NoteText"
                            label="Text"
                            fullWidth
                            value={this.state.Notes.NoteText}
                            onChange={e => this.onChangeNotita(e)}
                        />
                    </Grid>
                     <Grid item xs={4} sm={4}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="UserId"
                            name="UserId"
                            label="User id"
                            fullWidth
                            value={this.state.Notes.UserId}
                            onChange={e => this.onChangeNotita(e)}
                        />
                    </Grid> 
                    <Grid item xs={6} sm={4}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="SubjectId"
                            name="SubjectId"
                            label="Subject Id"
                            fullWidth
                            value={this.state.Notes.SubjectId}
                            onChange={e => this.onChangeNotita(e)}
                        />
                    </Grid> 
                    <Grid item xs={4} sm={4}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="NoteDate"
                            name="NoteDate"
                            label="Data notita "
                            fullWidth
                            value={this.state.Notes.NoteDate}
                            onChange={e => this.onChangeNotita(e)}
                        />
                    </Grid>
                </Grid>

                <Button color="primary" variant="outlined" startIcon={<CancelIcon />} onClick={
                    (() => { this.props.history.push("/AfisareNotite") })
                }>
                    Cancel
                </Button>
                <Button onClick={this.saveNotita}  color="primary" variant="outlined" startIcon={<SaveIcon />}>
                    Save
                </Button>
                
            </div>
        )
    }


}

export default AddNote;