import firebase, { database } from '../../firebase'

export const actionUsername = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({
            type: 'CHANGE_USER',
            value: 'Muhammad Ilham'
        })
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(result => {

                dispatch({ type: 'CHANGE_LOADING', value: false })
                resolve(true)

            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })

                reject(false)
            })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(result => {

                const userData = {
                    email: result.user.email,
                    uid: result.user.uid,
                    isEmailVerified: result.user.emailVerified,
                    refreshToken: result.user.refreshToken
                }

                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: true })
                dispatch({ type: 'CHANGE_USER', value: userData })

                resolve(userData)
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_ISLOGIN', value: false })

                reject(false)
            })
    })
}

export const addDataToAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        database.ref('notes/' + data.userId).push({
            title: data.title,
            date: data.date,
            content: data.content
        })
            .then(result => {
                dispatch({ type: 'CHANGE_LOADING', value: false })

                console.log('data saved: ', result)

                resolve(true)
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })

                reject(false)
            })
    })
}

export const getDataFromAPI = (userId) => (dispatch) => {
    const noteRef = database.ref('notes/' + userId)
    return new Promise((resolve, reject) => {
        noteRef.on('value', function (snapshot) {
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            });

            dispatch({ type: 'SET_NOTES', value: data });
            resolve(snapshot.val());
        })
    })
}

export const updateDataAPI = (data) => (dispatch) => {
    const noteRef = database.ref(`notes/${data.userId}/${data.noteId}`)
    return new Promise((resolve, reject) => {
        noteRef.set({
            title: data.title,
            date: data.date,
            content: data.content
        }, (err) => {
            if (err) {
                reject(false)
            } else {
                resolve(true)
            }
        });
    })
}

export const deleteDataAPI = (data) => (dispatch) => {

    const noteRef = database.ref(`notes/${data.userId}/${data.noteId}`)
    return new Promise((resolve, reject) => {
        noteRef.remove();
    })
}