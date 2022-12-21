

export const state = () => ({
    city : 'London'
})

export const mutations = {
    setCity (state,payload) {
        state.city = payload
    }
}