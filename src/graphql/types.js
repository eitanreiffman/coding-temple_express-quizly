// Import built-in graphql types
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLInt, GraphQLList } = require('graphql');
// Import User Model
const { User, Quiz, Question } = require('../models')

const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'User Type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString },
            quizzes: {
                type: new GraphQLList(QuizType),
                resolve(parent, args){
                    return Quiz.find( { userId: parent.id } )
                }
            }
        })
    }
)

const QuizType = new GraphQLObjectType(
    {
        name: 'Quiz',
        description: 'Quiz Type',
        fields: () => ({
            id: { type: GraphQLID },
            slug: { type: GraphQLString },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            userId: { type: GraphQLID },
            user: {
                type: UserType,
                resolve(parent, args){
                    return User.findById(parent.userId)
                }
            }
        })
    }
)

const QuestionInputType = new GraphQLInputObjectType(
    {
        name: 'QuestionInput',
        description: 'Question Input Type',
        fields: () => ({
            title: { type: GraphQLString },
            order: { type: GraphQLInt },
            correctAnswer: { type: GraphQLString }
        })
    }
)

// Create a Question Type for queries
const QuestionType = new GraphQLObjectType(
    {
        name: 'Question',
        description: 'Question Type',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            correctAnswer: { type: GraphQLString },
            order: { type: GraphQLInt },
            quizId: { type: GraphQLID },
            quiz: {
                type: QuizType,
                resolve(parent, args){
                    return Quiz.findById(parent.quizId)
                }
            },
            questions: {
                type: new GraphQLList(QuestionType),
                resolve(parent, args){
                    return Question.find( { quizId: parent.id } )
                }
            }
        })
    }
)

module.exports = {
    UserType,
    QuizType,
    QuestionInputType
}