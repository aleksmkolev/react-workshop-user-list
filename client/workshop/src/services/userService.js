const baseUrl = 'http://localhost:3030/jsonstore/users'

export default {
    getAll: async () => {
        const response = await fetch(baseUrl)
        const result = await response.json()
        const users = Object.values(result)
        return users
    },
    async getOne(userId){
        const response = await fetch(`${baseUrl}/${userId}`)
        const user = await response.json()
        return user
    },
    async create(userData){
        // Format the data before sending to server
        const postData = transformUserData(userData)
        const response = await fetch(baseUrl, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        const result = await response.json()
        return result
    },
    async delete(userId){
        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'DELETE'
        })
        const result = await response.json()
        return result
    },
    async update(userId, userData){
        const postData = transformUserData(userData)
        postData._id = userId

        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'

                
            },  
            body: JSON.stringify(postData)
        })
        const result = await response.json()
        return result
    }

}

function transformUserData(userData){
    const postData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        imageUrl: userData.imageUrl,
        address: userData.address,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    return postData
}
     