import { useParams } from "react-router";

const url = "https://mch-flix-app-813b2fce5e48.herokuapp.com";

export const API = {
    getMoviesList: (user, onGetMovies) => {
        if (!user) return;
        fetch(url + "/movies", {method: "GET", headers: { 'Authorization': `Bearer ${user.token}` }})
            .then((response) => response.json())
            .then((data) => {
                onGetMovies(data);
            }).catch(err => {
                console.error(err);
            })
    },

    // not tested
    login: (loginData, onLoggedIn) => {
        fetch(url + "/user", { method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(loginData)
        }).then(res => {
            res.json().then(json => {
                if (json.message) {
                    onLoggedIn(json.message, null);
                } else {
                    onLoggedIn(null, json);
                }
            })
        }).catch(err => {
            console.error(err);
        })
    },

    register: (registerData, onRegister) => {
        fetch(url + "/user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(registerData) }).then(res => {
            if (res.ok) {
                res.json().then(user => {
                    onRegister(null, user.username);
                })
            } else {
                res.text().then(text => {
                    onRegister(text, null);
                })
            }
        }).catch(fetchErr => {
            console.error(fetchErr);
        })
    },

    getUserById: (user) => {
        if (!user) return;
        fetch(url + `/user/${user._id}`, {method: "GET", headers: {'Authorization': `Bearer ${user.token}`}}).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            if (json.message) {
                alert(json.message);
            } else {
                alert(json.username);
            }
        }).catch(err => {
            console.error(err);
        })
    },

    deregister: (user, onDeregister) => {
        fetch(url + "/user", {method: "DELETE",
            headers: {"Content-type": "application/json", "Authorization": `Bearer ${user.token}`},
            body: JSON.stringify({"id": user._id})}
        ).then(res => {
            res.text().then(text => {
                onDeregister(text);
            })
        }).catch(err =>{
            console.error(err);
        })
    },

    updateUserData: (user, newData, onUpdate) => {
        fetch(url + `/user/${user._id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json", "Authorization": `Bearer ${user.token}` },
            body: JSON.stringify(newData)
            }).then(res => {
                if (res.ok) {
                    res.json().then(userData => {
                        onUpdate(null, userData);
                    })
                } else {
                    res.text().then(updateErr => {
                        onUpdate(updateErr, null);
                    })
                }
            }).catch(err => {
                console.error(err);
            })
    },

    addMovieToFavorite: (user, movie, onAdded) => {
        fetch(url + `/user/${user._id}/${movie.title}`, {method: "POST", headers: {"Authorization": `Bearer ${user.token}`}}).then(res => {
            onAdded();
        }).catch(err => {
            console.error(err)
        })
    },

    removeMovieToFavorite: (user, movie, onRemove) => {
        fetch(url + `/user/${user._id}/${movie.title}`, {method: "DELETE", headers: {"Authorization": `Bearer ${user.token}`}}).then(res => {
            onRemove();
        }).catch(err => {
            console.error(err)
        })
    }
}