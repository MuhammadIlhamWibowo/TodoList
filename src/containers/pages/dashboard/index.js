import React, { Component, Fragment } from 'react';
import './dashboard.scss';
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action'
import { connect } from 'react-redux';

class Dashboard extends Component {

    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'Simpan',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid);
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    }

    handleSaveNote = () => {
        const { title, content, textButton, noteId } = this.state;
        const { saveNote, updateNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if (textButton === 'Simpan') {
            saveNote(data);
        } else {
            data.noteId = noteId
            updateNotes(data);
        }
    }

    updateNote = (note) => {
        console.log('note data:', note)

        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'Perbarui',
            noteId: note.id
        });
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'Simpan'
        })
    }

    deleteNotes = (e, note) => {
        e.stopPropagation();

        const userData = JSON.parse(localStorage.getItem('userData'));
        const { deleteNotes } = this.props;
        const data = {
            userId: userData.uid,
            noteId: note.id
        };

        console.log('note id : ', note.id)
        console.log('user id : ', userData.uid)

        deleteNotes(data);
    }

    render() {
        const { title, content, textButton } = this.state;
        const { notes } = this.props;
        const { updateNote, cancelUpdate, deleteNotes } = this;

        return (
            <div className="container">
                <div className="input-form">
                    <input className="input-title" placeholder="title" onChange={(e) => this.onInputChange(e, 'title')} type="text" value={title} />
                    <textarea className="input-content" placeholder="content" onChange={(e) => this.onInputChange(e, 'content')} type="content" value={content}></textarea>

                    <div className="action-wrapper">
                        {
                            textButton === 'Perbarui' ? (
                                <button className="btn-save cancel" onClick={this.handleSaveNote} onClick={cancelUpdate}>Batal</button>
                            ) : null
                        }
                        <button className="btn-save" onClick={this.handleSaveNote}>{textButton}</button>
                    </div>
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => updateNote(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e) => deleteNotes(e, note)}>X</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNote: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);