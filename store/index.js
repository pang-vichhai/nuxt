import mutations from "./mutations"
import getters from "./getters"
export  const state = () =>({
    course : 'Master NuxtJs course'
})

export const actions = {
    nuxtServerInit({commit},{req,app:{$cookies}}){
        if(req.headers.cookie){
            if($cookies.get('token')){
                commit('auth/setLoggedIn',true)
            }
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}