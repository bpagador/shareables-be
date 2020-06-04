const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
// const Shareable = require('../lib/models/Shareable');



describe('app routes', () => {
    const mongo = new MongoMemoryServer();
    beforeAll(() => {
        return mongo.getUri()
            .then(uri => mongoose.connect(uri, {

                useUnifiedTopology: true,
                useNewUrlParser: true
            }));
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a new shareable image url', () => {
        return request(app)
            .post('/shareables')
            .send({
                url: 'http://pictureTHIS.com',
                description: 'the best thing I have EVER seen',
            })

            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    url: 'http://pictureTHIS.com',
                    description: 'the best thing I have EVER seen',
                    likes: 0,
                    __v: 0
                });
            });
    });

    
});
