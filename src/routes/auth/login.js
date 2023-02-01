const axios = require('axios');

module.exports = async (req, res) => {
    try{
        const mutation = `
            mutation ($username: String!, $password: String!){
                login(
                    username: $username
                    password: $password
                )
            }
        `
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
                {
                    query: mutation,
                    variables: {
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

        const jwtToken = data.data.login;

        res.cookie('jwtToken', jwtToken, { httpOnly: true });

        res.redirect('/');

    } catch(err) {
        console.log(err);
        res.redirect('/auth/login')
    }
}