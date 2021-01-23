import React, {Component, useState} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {getUser, get, post, put, remove} from '../Calls';
import { noteRoute, noteRouteDelete} from './ApiRouter';
import { Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import './AfisareNotite.css';
import { withStyles } from '@material-ui/core/styles';



class Afisare extends Component {
    
    

    constructor(props){
        super(props)

        this.state = {
            rows: []
        };

        this.deleteNota = this.deleteNota.bind(this);
    }

    handleButtonClick = () => {
        const shareNote = async () => {
            let inputText = document.querySelector(".shareBox input").value;
            console.log(inputText)
            let user = await getUser(inputText);
            console.log(user)
            if(user[0]){
                user=user[0]                              //it gives me an array of users
                console.log(user);
                let userId = user.UserId;
            }
            else{
                alert("Wrong nickname")
            }
        };
        shareNote();
      };

    async componentDidMount (){
        let data = await get(noteRoute);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
        
        this.setState({rows: data});
    }

    async deleteNota(id, index){
        let res = await remove(noteRouteDelete, id);

        if (res.hasErrors){
            alert(res.message);
            return;
        }

        let noteDelete = this.state.rows;
        noteDelete.splice(index, 1);
        this.setState({rows: noteDelete});
    }



    render() {
        return (
            <div>
                <div>
                    <h1>
                        Notes
                    </h1>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            this.props.history.push("/AddNote")
                        }}
                    >
                        Add new Note
                    </Button>
                </div>
                <br />

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="center" size= "small" >Note id</TableCell>
                                <TableCell align="center">Note Text</TableCell>
                                {/* <TableCell align="right">User id</TableCell> */}
                                <TableCell align="center">Subject id</TableCell>
                                <TableCell align="center">Note date</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row, index) => (
                                
                                <TableRow key={row.NoteId}>
                                    <TableCell component="th" scope="row" align="center">
                                        {row.NoteId} 
                                    </TableCell>
                                    <TableCell align="center">{row.NoteText}</TableCell>
                                    {/* <TableCell align="right">{row.UserId}</TableCell> */}
                                    <TableCell align="center">{row.SubjectId}</TableCell>
                                    <TableCell align="center">{row.NoteDate}</TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            <EditIcon color="primary" onClick={(() => { this.props.history.push(`/AddNote/${row.NoteId}`) })} />
                                        </IconButton>
                                        <IconButton onClick={() => this.deleteNota(row.NoteId, index)}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                        <IconButton onClick={()=>{
                                            document.querySelector(".shareBox").style.display = "inherit";
                                        }}>
                                            <ShareIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="shareBox">
                    <h3>Partajeaza aceasta notita</h3>
                    <label>Introdu un nickname: </label>
                    <input></input>
                    <div className="button-group">
                        <button className="btn btn-success" onClick={this.handleButtonClick}>Ok</button>
                        <button className="btn btn-danger" onClick={()=>{
                            document.querySelector(".shareBox").style.display = "none";
                        }}>Cancel</button>
                    </div>

                </div>
            </div>
        )
    }


    
}
    

export default Afisare;

