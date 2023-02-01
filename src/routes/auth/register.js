const { User } = require('../../models')
const bcrypt = require('bcrypt')
const axios = require('axios');

module.exports = async (req, res) => {
    console.log(req.body)
    // First check to make sure the password and confirmPass are the same
    if (req.body.password !== req.body.confirmPass){
        res.send({error: 'Your passwords do not match'})
    } else {
        try {
            const mutation = `
            mutation ($username: String!, $email: String!, $password: String!){
                register(email: $email, username: $username, password: $password)
            }
            `
            const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
                    {
                        query: mutation,
                        variables: {
                            email: req.body.email,
                            username: req.body.username,
                            password: req.body.password
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

            const jwtToken = data.data.register
            console.log(jwtToken);
            res.redirect('/')
            
        } catch(err) {
            console.log(err)
            res.redirect('/auth/register')
        }
    }
}