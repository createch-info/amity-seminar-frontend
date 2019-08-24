export default {
    logout(){
        return new Promise((resolve) => {
        localStorage.removeItem('am_auth');
        localStorage.removeItem('am_auth');
        localStorage.clear();
        resolve();
    });
    },
    storeToken(res){
        return new Promise((resolve) => {
            localStorage.clear();
            localStorage.removeItem('am_auth');
            localStorage.setItem('am_auth', JSON.stringify(res));
            resolve(res);
        });
    },
    getToken(){
        let data = JSON.parse(localStorage.getItem('am_auth'));
        if(!data){
           return false;
        }else{
            return data.access_token;
        }
    },
    isAuthenticated(){
        let data = this.getToken();
        if(data){
            return true;
        }
        return false;
    }
}