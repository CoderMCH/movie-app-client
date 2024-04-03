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

    login: (loginData, onLoggedIn) => {
        fetch(url + "/login", { method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(loginData)
        }).then(res => res.json())
        .then(json => {
            if (json.message) throw new Error(json.message);
            
            let data = {
                ...json.user,
                "password": loginData.password,
                "token": json.token
            };
            localStorage.setItem("user", JSON.stringify(data));
            onLoggedIn(null, data);
        }).catch(err => {
            console.error(err);
            onLoggedIn(err, null);
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

    getUserById: (user, onGotUser) => {
        if (!user) return;
        fetch(url + `/user/${user._id}`, {method: "GET", headers: {'Authorization': `Bearer ${user.token}`}}).then(res => {
            return res.json();
        }).then(json => {
            if (json.message) {
                onGotUser(json, null);
            } else {
                onGotUser(null, json);
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
        fetch(url + `/user/${user._id}/${movie.title}`, {method: "POST", headers: {"Authorization": `Bearer ${user.token}`}})
        .then(res => {
            res.json().then(json => {
                onAdded(json.favoriteMovies);
            })
        }).catch(err => {
            console.error(err)
        })
    },

    removeMovieToFavorite: (user, movie, onRemoved) => {
        fetch(url + `/user/${user._id}/${movie.title}`, {method: "DELETE", headers: {"Authorization": `Bearer ${user.token}`}})
        .then(res => {
            res.json().then(json => {
                onRemoved(json.favoriteMovies);
            })
        }).catch(err => {
            console.error(err)
        })
    }
}